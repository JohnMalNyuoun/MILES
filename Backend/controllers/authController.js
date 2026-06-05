const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

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

		const user = await User.findOne({ username: username.trim() });
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign(
			{ id: user._id, username: user.username, email: user.email, role: 'admin' },
			process.env.JWT_SECRET || 'development-secret',
			{ expiresIn: '1d' }
		);

		res.status(200).json({
			message: 'Login successful',
			token,
			user: {
				id: user._id,
				name: user.name,
				username: user.username,
				email: user.email,
				role: 'admin',
			},
		});
	} catch (error) {
		next(error);
	}
};

const forgotPassword = async (req, res, next) => {
	try {
		const { username, email, newPassword } = req.body;

		if (!username || !email || !newPassword) {
			return res
				.status(400)
				.json({ message: 'Username, email, and new password are required' });
		}

		const user = await User.findOne({ username: username.trim() });
		if (!user) {
			return res.status(404).json({ message: 'Account not found for provided details' });
		}

		const normalizedEmail = email.trim().toLowerCase();
		if ((user.email || '').trim().toLowerCase() !== normalizedEmail) {
			return res.status(400).json({ message: 'Account not found for provided details' });
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);
		user.password = hashedPassword;
		await user.save();

		return res.status(200).json({ message: 'Password reset successful. You can now sign in.' });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	register,
	login,
	forgotPassword,
};