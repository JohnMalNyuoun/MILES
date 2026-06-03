const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

const connectDB = require('../config/db');
const User = require('../models/User');

dotenv.config();

const [, , nameArg, emailArg, passwordArg] = process.argv;

const createAdmin = async () => {
	const name = nameArg?.trim();
	const email = emailArg?.trim().toLowerCase();
	const password = passwordArg;

	if (!name || !email || !password) {
		console.error('Usage: node scripts/createAdmin.js "Name" "email@example.com" "password"');
		process.exitCode = 1;
		return;
	}

	try {
		await connectDB();

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			console.error('An account with this email already exists.');
			process.exitCode = 1;
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const adminUser = await User.create({
			name,
			email,
			password: hashedPassword,
			role: 'admin',
		});

		console.log(`Admin created: ${adminUser.email}`);
	} catch (error) {
		console.error('Failed to create admin:', error.message);
		process.exitCode = 1;
	} finally {
		await User.db.close();
	}
};

createAdmin();
