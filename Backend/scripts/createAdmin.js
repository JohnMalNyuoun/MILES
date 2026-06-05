const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

const connectDB = require('../config/db');
const User = require('../models/User');

dotenv.config();

const [, , nameArg, usernameArg, emailArg, passwordArg] = process.argv;

const createAdmin = async () => {
	const name = nameArg?.trim();
	const username = usernameArg?.trim();
	const email = emailArg?.trim().toLowerCase();
	const password = passwordArg;

	if (!name || !username || !email || !password) {
		console.error(
			'Usage: node scripts/createAdmin.js "Name" "username" "email@example.com" "password"'
		);
		process.exitCode = 1;
		return;
	}

	try {
		await connectDB();

		const existingUser = await User.findOne({ username });
		if (existingUser) {
			console.error('An account with this username already exists.');
			process.exitCode = 1;
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const adminUser = await User.create({
			name,
			username,
			email,
			password: hashedPassword,
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
