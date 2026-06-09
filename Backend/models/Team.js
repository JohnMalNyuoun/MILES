const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		role: {
			type: String,
			required: true,
			trim: true,
		},
		bio: {
			type: String,
			default: '',
		},
		isMotherProfile: {
			type: Boolean,
			default: false,
		},
		featured: {
			type: Boolean,
			default: false,
		},
		returnToSchool: {
			type: Boolean,
			default: false,
		},
		schoolName: {
			type: String,
			default: '',
			trim: true,
		},
		educationLevel: {
			type: String,
			default: '',
			trim: true,
		},
		dropoutCause: {
			type: String,
			default: '',
		},
		supportSummary: {
			type: String,
			default: '',
		},
		currentChallenges: {
			type: String,
			default: '',
		},
		caseStatus: {
			type: String,
			default: '',
			trim: true,
		},
		guardianContact: {
			type: String,
			default: '',
			trim: true,
		},
		image: {
			type: String,
			default: '',
		},
		videoUrl: {
			type: String,
			default: '',
			trim: true,
		},
		workshopFocus: {
			type: String,
			default: '',
		},
		links: {
			github: String,
			linkedin: String,
			twitter: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Team', teamSchema);