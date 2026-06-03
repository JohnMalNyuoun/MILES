const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			default: '',
		},
		techStack: {
			type: [String],
			default: [],
		},
		liveUrl: {
			type: String,
			default: '',
		},
		repoUrl: {
			type: String,
			default: '',
		},
		featured: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);