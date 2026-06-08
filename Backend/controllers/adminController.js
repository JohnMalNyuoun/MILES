const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const path = require('path');
const Admin = require('../models/Admin');
const PendingAction = require('../models/PendingAction');
const User = require('../models/User');
const WorkshopSchedule = require('../models/WorkshopSchedule');
const { loadCollection, sortByLatest } = require('../utils/localDataStore');
const {
	subscriberDataFilePath,
	normalizeSubscriberRecord,
} = require('./subscriberController');
const {
	sendAdminCreatedEmail,
	sendPasswordChangedEmail,
	sendPasswordResetCodeEmail,
} = require('../utils/mailer');

const projectDataFilePath = path.join(__dirname, '..', 'data', 'projects.json');
const teamDataFilePath = path.join(__dirname, '..', 'data', 'team.json');

const normalizeProjectRecord = (record) => ({
	_id: record._id,
	title: record.title || '',
	description: record.description || '',
	image: record.image || '',
	techStack: Array.isArray(record.techStack) ? record.techStack : [],
	liveUrl: record.liveUrl || '',
	repoUrl: record.repoUrl || '',
	featured: record.featured === true,
	createdAt: record.createdAt || '',
	updatedAt: record.updatedAt || '',
});

const normalizeTeamRecord = (record) => ({
	_id: record._id,
	name: record.name || '',
	role: record.role || '',
	bio: record.bio || '',
	image: record.image || '',
	videoUrl: record.videoUrl || '',
	isMotherProfile: record.isMotherProfile === true,
	createdAt: record.createdAt || '',
	updatedAt: record.updatedAt || '',
});

const getAdminDashboard = async (req, res, next) => {
	try {
		const [projects, teamMembers, userCount, recentWorkshops, subscribers] = await Promise.all([
			loadCollection(projectDataFilePath, []),
			loadCollection(teamDataFilePath, []),
			User.countDocuments(),
			WorkshopSchedule.find().sort({ createdAt: -1 }).limit(5),
			loadCollection(subscriberDataFilePath, []),
		]);

		const normalizedProjects = sortByLatest(projects.map(normalizeProjectRecord));
		const normalizedTeam = sortByLatest(teamMembers.map(normalizeTeamRecord)).filter(
			(member) => member.isMotherProfile !== true
		);

		const normalizedSubscribers = sortByLatest(
			subscribers.map(normalizeSubscriberRecord)
		);
		const projectCount = normalizedProjects.length;
		const teamCount = normalizedTeam.length;
		const recentProjects = normalizedProjects.slice(0, 5);
		const recentTeam = normalizedTeam.slice(0, 5);
		const recentSubscribers = normalizedSubscribers.slice(0, 10);

		res.status(200).json({
			stats: {
				projectCount,
				teamCount,
				userCount,
				subscriberCount: normalizedSubscribers.length,
			},
			recentProjects,
			recentTeam,
			recentWorkshops,
			recentSubscribers,
		});
	} catch (error) {
		next(error);
	}
};

const createAdminUser = async (req, res, next) => {
	try {
		const { name, username, email, password } = req.body;

		if (!name || !username || !email || !password) {
			return res
				.status(400)
				.json({ message: 'Name, username, email and password are required' });
		}

		const normalizedUsername = username.trim();
		const normalizedEmail = email.trim().toLowerCase();

		const existingUser = await User.findOne({ username: normalizedUsername });
		if (existingUser) {
			return res.status(400).json({ message: 'Username is already in use' });
		}

		const existingAdmin = await Admin.findOne({ username: normalizedUsername });
		if (existingAdmin) {
			return res.status(400).json({ message: 'Admin profile username already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const adminUser = await User.create({
			name,
			username: normalizedUsername,
			email: normalizedEmail,
			password: hashedPassword,
		});

		const adminProfile = await Admin.create({
			name,
			username: normalizedUsername,
			email: normalizedEmail,
			password: hashedPassword,
			isVerified: true,
		});

		res.status(201).json({
			message: 'Admin account created successfully',
			user: {
				id: adminUser._id,
				name: adminUser.name,
				username: adminUser.username,
				email: adminUser.email,
				role: 'admin',
			},
			adminProfile: {
				id: adminProfile._id,
				username: adminProfile.username,
				email: adminProfile.email,
				isVerified: adminProfile.isVerified,
			},
		});

		// Send email notification (non-blocking)
		sendAdminCreatedEmail({
			adminEmail: normalizedEmail,
			adminName: name,
			adminUsername: normalizedUsername,
		}).catch((emailErr) => {
			console.error('Failed to send admin-created email:', emailErr.message);
		});
	} catch (error) {
		next(error);
	}
};

const registerAdmin = async (req, res, next) => {
	try {
		const adminCount = await Admin.countDocuments();
		if (adminCount >= 2) {
			return res.status(403).json({
				error: 'Registration Locked: The system has reached its maximum authorized limit of 2 administrator profiles.',
			});
		}

		const {
			name,
			username,
			email,
			password,
			organizationSecretKey,
		} = req.body || {};

		if (organizationSecretKey !== process.env.MILES_REGISTRATION_SECRET) {
			return res.status(403).json({
				error: 'Access Denied: Invalid Organization Authorization Key.',
			});
		}

		const requestEmail = (email || '').toLowerCase();
		const officialEmail = (process.env.OFFICIAL_MILES_EMAIL || '').toLowerCase();
		if (requestEmail !== officialEmail) {
			return res.status(403).json({
				error: 'Registration Rejected: This system only accepts the official MILES organizational email handle.',
			});
		}

		const normalizedUsername = (username || '').trim();
		const existingAdmin = await Admin.findOne({ username: normalizedUsername });
		if (existingAdmin) {
			return res.status(400).json({ error: 'Username already exists.' });
		}

		if (!name || !normalizedUsername || !email || !password) {
			return res.status(400).json({
				error: 'Name, username, email, and password are required.',
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const admin = await Admin.create({
			name: name.trim(),
			username: normalizedUsername,
			email: email.trim(),
			password: hashedPassword,
			isVerified: true,
		});

		return res.status(201).json({
			message: 'Admin profile registered successfully.',
			admin: {
				id: admin._id,
				name: admin.name,
				username: admin.username,
				email: admin.email,
				isVerified: admin.isVerified,
			},
		});
	} catch (error) {
		next(error);
	}
};

const getPendingActions = async (req, res, next) => {
	try {
		const actions = await PendingAction.find({ status: 'pending' }).sort({ createdAt: -1 });
		return res.status(200).json(actions);
	} catch (error) {
		next(error);
	}
};

const rejectAction = async (req, res, next) => {
	try {
		const { actionId, currentAdminUsername } = req.body || {};

		if (!actionId || !currentAdminUsername) {
			return res.status(400).json({ error: 'actionId and currentAdminUsername are required.' });
		}

		const pendingAction = await PendingAction.findById(actionId);
		if (!pendingAction) {
			return res.status(404).json({ error: 'Pending action not found.' });
		}

		if (pendingAction.createdBy === currentAdminUsername) {
			return res.status(403).json({
				error: 'You cannot reject your own submission.',
			});
		}

		pendingAction.status = 'rejected';
		await pendingAction.save();

		return res.status(200).json({
			message: 'Action rejected successfully.',
			actionId: pendingAction._id,
			status: pendingAction.status,
		});
	} catch (error) {
		next(error);
	}
};

const processApproval = async (req, res, next) => {
	try {
		const { actionId, currentAdminUsername } = req.body || {};

		if (!actionId || !currentAdminUsername) {
			return res.status(400).json({
				error: 'actionId and currentAdminUsername are required.',
			});
		}

		const pendingAction = await PendingAction.findById(actionId);
		if (!pendingAction) {
			return res.status(404).json({ error: 'Pending action not found.' });
		}

		if (pendingAction.createdBy === currentAdminUsername) {
			return res.status(403).json({
				error: 'You cannot approve your own submission. The other administrator must verify this action.',
			});
		}

		pendingAction.status = 'approved';
		await pendingAction.save();

		const { actionType, targetCollection, proposedData } = pendingAction;
		if (actionType === 'CREATE_POST') {
			let TargetModel;
			try {
				TargetModel = mongoose.model(targetCollection);
			} catch (modelError) {
				return res.status(400).json({
					error: `Invalid target collection: ${targetCollection}`,
				});
			}

			await TargetModel.create(proposedData);
		}

		return res.status(200).json({
			message: 'Approval processed and deployment completed successfully.',
			actionId: pendingAction._id,
			status: pendingAction.status,
		});
	} catch (error) {
		next(error);
	}
};

const changeAdminPassword = async (req, res, next) => {
	try {
		const { currentPassword, newPassword } = req.body || {};

		if (!currentPassword || !newPassword) {
			return res.status(400).json({
				message: 'Current password and new password are required.',
			});
		}

		if (newPassword.length < 6) {
			return res.status(400).json({
				message: 'New password must be at least 6 characters.',
			});
		}

		const adminUser = await User.findById(req.user.id);
		if (!adminUser) {
			return res.status(404).json({ message: 'Admin user not found.' });
		}

		const isMatch = await bcrypt.compare(currentPassword, adminUser.password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Current password is incorrect.' });
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);
		adminUser.password = hashedPassword;
		await adminUser.save();

		// Also update the Admin profile password if it exists
		const adminProfile = await Admin.findOne({ username: adminUser.username });
		if (adminProfile) {
			adminProfile.password = hashedPassword;
			await adminProfile.save();
		}

		res.status(200).json({ message: 'Password changed successfully.' });

		// Send email notification (non-blocking)
		sendPasswordChangedEmail({
			adminEmail: adminUser.email,
			adminName: adminUser.name || adminUser.username,
		}).catch((emailErr) => {
			console.error('Failed to send password-changed email:', emailErr.message);
		});
	} catch (error) {
		next(error);
	}
};

const forgotAdminPassword = async (req, res, next) => {
	try {
		const { email } = req.body || {};

		if (!email) {
			return res.status(400).json({ message: 'Email is required.' });
		}

		const normalizedEmail = email.trim().toLowerCase();
		const admin = await Admin.findOne({
			email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') },
		});

		if (!admin) {
			// Return success even if not found to prevent email enumeration
			return res.status(200).json({
				message: 'If an account with that email exists, a reset code has been sent.',
			});
		}

		// Generate 6-digit reset code
		const resetCode = crypto.randomInt(100000, 999999).toString();
		const resetCodeExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

		admin.resetCode = resetCode;
		admin.resetCodeExpires = resetCodeExpires;
		await admin.save();

		// Send reset code email
		await sendPasswordResetCodeEmail({
			adminEmail: admin.email,
			adminName: admin.name || admin.username,
			resetCode,
		});

		return res.status(200).json({
			message: 'If an account with that email exists, a reset code has been sent.',
		});
	} catch (error) {
		next(error);
	}
};

const resetAdminPassword = async (req, res, next) => {
	try {
		const { email, resetCode, newPassword } = req.body || {};

		if (!email || !resetCode || !newPassword) {
			return res.status(400).json({
				message: 'Email, reset code, and new password are required.',
			});
		}

		if (newPassword.length < 6) {
			return res.status(400).json({
				message: 'New password must be at least 6 characters.',
			});
		}

		const normalizedEmail = email.trim().toLowerCase();
		const admin = await Admin.findOne({
			email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') },
		});

		if (!admin) {
			return res.status(400).json({ message: 'Invalid reset code or email.' });
		}

		if (!admin.resetCode || admin.resetCode !== resetCode) {
			return res.status(400).json({ message: 'Invalid reset code.' });
		}

		if (!admin.resetCodeExpires || admin.resetCodeExpires < new Date()) {
			return res.status(400).json({ message: 'Reset code has expired. Please request a new one.' });
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// Update Admin profile
		admin.password = hashedPassword;
		admin.resetCode = null;
		admin.resetCodeExpires = null;
		await admin.save();

		// Update User model too
		const user = await User.findOne({ email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') } });
		if (user) {
			user.password = hashedPassword;
			await user.save();
		}

		res.status(200).json({ message: 'Password reset successful. You can now log in with your new password.' });

		// Send confirmation email (non-blocking)
		sendPasswordChangedEmail({
			adminEmail: admin.email,
			adminName: admin.name || admin.username,
		}).catch((emailErr) => {
			console.error('Failed to send password-reset-confirmation email:', emailErr.message);
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAdminDashboard,
	createAdminUser,
	registerAdmin,
	getPendingActions,
	rejectAction,
	processApproval,
	changeAdminPassword,
	forgotAdminPassword,
	resetAdminPassword,
};
