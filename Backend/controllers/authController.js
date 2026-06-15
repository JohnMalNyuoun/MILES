const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../models/User');
const Admin = require('../models/Admin');
const {
	sendPasswordResetCodeEmail,
	sendPasswordChangedEmail,
} = require('../utils/mailer');

const RESET_CODE_TTL_MINUTES = 15;

const escapeRegex = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const findAccountByUsername = async (username) => {
	const trimmed = String(username || '').trim();
	if (!trimmed) return null;
	const usernameRegex = new RegExp(`^${escapeRegex(trimmed)}$`, 'i');

	const adminAccount = await Admin.findOne({ username: usernameRegex });
	if (adminAccount) {
		return { account: adminAccount, source: 'admin' };
	}

	const userAccount = await User.findOne({ username: usernameRegex });
	if (userAccount) {
		return { account: userAccount, source: 'user' };
	}

	return null;
};

const setResetCode = async (account, source, hashedCode, expiresAt) => {
	if (source === 'admin') {
		account.resetCode = hashedCode;
	} else {
		account.resetCodeHash = hashedCode;
	}
	account.resetCodeExpires = expiresAt;
	await account.save();
};

const getStoredHash = (account, source) =>
	source === 'admin' ? account.resetCode : account.resetCodeHash;

const clearResetCode = async (account, source) => {
	if (source === 'admin') {
		account.resetCode = null;
	} else {
		account.resetCodeHash = null;
	}
	account.resetCodeExpires = null;
	await account.save();
};

const maskEmail = (email = '') => {
	const [local, domain] = String(email).split('@');
	if (!local || !domain) return '';
	const visible = local.slice(0, Math.min(2, local.length));
	return `${visible}${'*'.repeat(Math.max(local.length - visible.length, 1))}@${domain}`;
};

const register = async (req, res, next) => {
	try {
		const { name, username, email, password, role, adminSecret } = req.body;

		if (!name || !username || !email || !password) {
			return res
				.status(400)
				.json({ message: 'Name, username, email and password are required' });
		}

		let userRole = 'user';
		if (role === 'admin') {
			const expectedAdminSecret =
				process.env.MILES_REGISTRATION_SECRET || process.env.ADMIN_REGISTRATION_SECRET;
			if (!expectedAdminSecret || adminSecret !== expectedAdminSecret) {
				return res.status(403).json({
					message: 'Invalid admin registration secret',
				});
			}
			userRole = 'admin';
		}

		const existingUser = await User.findOne({ username: username.trim() });
		if (existingUser) {
			return res.status(400).json({ message: 'Username is already in use' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			name,
			username: username.trim(),
			email,
			password: hashedPassword,
		});

		res.status(201).json({
			message: 'User registered successfully',
			user: {
				id: user._id,
				name: user.name,
				username: user.username,
				email: user.email,
				role: userRole,
			},
		});
	} catch (error) {
		next(error);
	}
};

const login = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			return res.status(400).json({ message: 'Username and password are required' });
		}

		const lookup = await findAccountByUsername(username);
		if (!lookup) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const { account } = lookup;
		const isMatch = await bcrypt.compare(password, account.password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign(
			{ id: account._id, username: account.username, email: account.email, role: 'admin' },
			process.env.JWT_SECRET || 'development-secret',
			{ expiresIn: '1d' }
		);

		res.status(200).json({
			message: 'Login successful',
			token,
			user: {
				id: account._id,
				name: account.name,
				username: account.username,
				email: account.email,
				role: 'admin',
			},
		});
	} catch (error) {
		next(error);
	}
};

const requestPasswordReset = async (req, res, next) => {
	try {
		const { username } = req.body || {};

		if (!username) {
			return res.status(400).json({ message: 'Username is required.' });
		}

		const lookup = await findAccountByUsername(username);

		const genericResponse = {
			message: 'If an account exists, a verification code has been sent to its email.',
		};

		if (!lookup) {
			return res.status(200).json(genericResponse);
		}

		const { account, source } = lookup;
		const code = String(crypto.randomInt(0, 1_000_000)).padStart(6, '0');
		const hashedCode = await bcrypt.hash(code, 10);
		const expiresAt = new Date(Date.now() + RESET_CODE_TTL_MINUTES * 60 * 1000);

		await setResetCode(account, source, hashedCode, expiresAt);

		try {
			await sendPasswordResetCodeEmail({
				adminEmail: account.email,
				adminName: account.name,
				resetCode: code,
				expiresInMinutes: RESET_CODE_TTL_MINUTES,
			});
		} catch (mailError) {
			console.error('Failed to send reset code email:', mailError.message);
			if (mailError.code === 'MAILER_NOT_CONFIGURED') {
				return res.status(500).json({
					message:
						'Email service is not configured on the server. Contact the MILES technical lead.',
				});
			}
			return res.status(500).json({
				message: 'Unable to send reset code email. Please try again shortly.',
			});
		}

		return res.status(200).json({
			...genericResponse,
			maskedEmail: maskEmail(account.email),
			expiresInMinutes: RESET_CODE_TTL_MINUTES,
		});
	} catch (error) {
		next(error);
	}
};

const verifyPasswordReset = async (req, res, next) => {
	try {
		const { username, code, newPassword } = req.body || {};

		if (!username || !code || !newPassword) {
			return res
				.status(400)
				.json({ message: 'Username, code, and new password are required.' });
		}

		if (String(newPassword).length < 6) {
			return res.status(400).json({ message: 'New password must be at least 6 characters.' });
		}

		const lookup = await findAccountByUsername(username);
		if (!lookup) {
			return res.status(400).json({ message: 'Invalid code or it may have expired.' });
		}

		const { account, source } = lookup;
		const storedHash = getStoredHash(account, source);
		if (!storedHash || !account.resetCodeExpires) {
			return res.status(400).json({ message: 'Invalid code or it may have expired.' });
		}

		if (new Date(account.resetCodeExpires).getTime() < Date.now()) {
			await clearResetCode(account, source);
			return res.status(400).json({ message: 'Code has expired. Please request a new one.' });
		}

		const isCodeValid = await bcrypt.compare(String(code).trim(), storedHash);
		if (!isCodeValid) {
			return res
				.status(400)
				.json({ message: 'Invalid code. Please check your email and try again.' });
		}

		account.password = await bcrypt.hash(newPassword, 10);
		await clearResetCode(account, source);

		try {
			await sendPasswordChangedEmail({
				adminEmail: account.email,
				adminName: account.name,
			});
		} catch (mailError) {
			console.warn('Password reset notification email failed:', mailError.message);
		}

		return res
			.status(200)
			.json({ message: 'Password reset successful. You can now sign in.' });
	} catch (error) {
		next(error);
	}
};

const forgotPassword = requestPasswordReset;

module.exports = {
	register,
	login,
	forgotPassword,
	requestPasswordReset,
	verifyPasswordReset,
};