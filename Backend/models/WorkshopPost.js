const mongoose = require('mongoose');

const workshopPostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			default: '',
			trim: true,
		},
		postUrl: {
			type: String,
			required: true,
			trim: true,
		},
		workshopDate: {
			type: String,
			default: '',
			trim: true,
		},
		postedDate: {
			type: String,
			default: '',
			trim: true,
		},
		summary: {
			type: String,
			default: '',
		},
		details: {
			type: String,
			default: '',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('WorkshopPost', workshopPostSchema);