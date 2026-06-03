const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const register = async (req, res, next) => {
	try {
		const { name, email, password, role, adminSecret } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({ message: 'Name, email and password are required' });
		}

		let userRole = 'user';
		if (role === 'admin') {
			const expectedAdminSecret = process.env.ADMIN_REGISTRATION_SECRET;
			if (!expectedAdminSecret || adminSecret !== expectedAdminSecret) {
				return res.status(403).json({
					message: 'Invalid admin registration secret',
				});
			}
			userRole = 'admin';
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
			role: userRole,
		});

		res.status(201).json({
			message: 'User registered successfully',
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		next(error);
	}
};

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: 'Email and password are required' });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign(
			{ id: user._id, email: user.email, role: user.role },
			process.env.JWT_SECRET || 'development-secret',
			{ expiresIn: '1d' }
		);

		res.status(200).json({
			message: 'Login successful',
			token,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	register,
	login,
};