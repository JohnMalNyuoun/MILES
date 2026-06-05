const mongoose = require('mongoose');

const workshopActivitySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			default: '',
			trim: true,
		},
		date: {
			type: String,
			default: '',
			trim: true,
		},
		location: {
			type: String,
			default: '',
			trim: true,
		},
		status: {
			type: String,
			default: 'Planned',
			trim: true,
		},
		details: {
			type: String,
			default: '',
		},
	},
	{ _id: false }
);

const workshopScheduleSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			default: 'Workshop Schedule Tracker',
			trim: true,
		},
		coordinator: {
			type: String,
			default: 'MILES Program Team',
			trim: true,
		},
		nextSessionDate: {
			type: String,
			default: '',
			trim: true,
		},
		nextSessionTopic: {
			type: String,
			default: '',
			trim: true,
		},
		nextSessionLocation: {
			type: String,
			default: '',
			trim: true,
		},
		nextSessionFacilitator: {
			type: String,
			default: '',
			trim: true,
		},
		notes: {
			type: String,
			default: '',
		},
		workshopSummary: {
			type: String,
			default: '',
		},
		targetAudience: {
			type: String,
			default: '',
			trim: true,
		},
		keyOutcomes: {
			type: String,
			default: '',
		},
		followUpActions: {
			type: String,
			default: '',
		},
		activities: {
			type: [workshopActivitySchema],
			default: [],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('WorkshopSchedule', workshopScheduleSchema);