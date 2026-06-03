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
		image: {
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