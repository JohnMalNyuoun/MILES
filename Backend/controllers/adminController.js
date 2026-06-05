const bcrypt = require('bcryptjs');
const Project = require('../models/Project');
const Team = require('../models/Team');
const User = require('../models/User');
const WorkshopSchedule = require('../models/WorkshopSchedule');

const teamProfileFilter = {};

const getAdminDashboard = async (req, res, next) => {
	try {
		const [projectCount, teamCount, userCount, recentProjects, recentTeam, recentWorkshops] =
			await Promise.all([
				Project.countDocuments(),
				Team.countDocuments(teamProfileFilter),
				User.countDocuments(),
				Project.find().sort({ createdAt: -1 }).limit(5),
				Team.find(teamProfileFilter).sort({ createdAt: -1 }).limit(5),
				WorkshopSchedule.find().sort({ createdAt: -1 }).limit(5),
			]);

		res.status(200).json({
			stats: {
				projectCount,
				teamCount,
				userCount,
			},
			recentProjects,
			recentTeam,
			recentWorkshops,
		});
	} catch (error) {
		next(error);
	}
};

const createAdminUser = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res
				.status(400)
				.json({ message: 'Name, email and password are required' });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const adminUser = await User.create({
			name,
			email,
			password: hashedPassword,
			role: 'admin',
		});

		res.status(201).json({
			message: 'Admin account created successfully',
			user: {
				id: adminUser._id,
				name: adminUser.name,
				email: adminUser.email,
				role: adminUser.role,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAdminDashboard,
	createAdminUser,
};
