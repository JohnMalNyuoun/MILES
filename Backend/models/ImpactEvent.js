const mongoose = require('mongoose');

const participantBreakdownSchema = new mongoose.Schema(
	{
		youngMothers: { type: Number, required: true, min: 0 },
		girls: { type: Number, required: true, min: 0 },
		boys: { type: Number, required: true, min: 0 },
	},
	{ _id: false }
);

const impactEventSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		topicFocus: {
			type: String,
			default:
				'Mentorship on girl-child challenges and the supportive role of brothers',
			trim: true,
		},
		totalParticipants: {
			type: Number,
			required: true,
			default: 45,
			min: 0,
		},
		participants: {
			type: participantBreakdownSchema,
			required: true,
			default: {
				youngMothers: 15,
				girls: 20,
				boys: 10,
			},
		},
		eventDate: {
			type: Date,
			default: Date.now,
		},
		location: {
			type: String,
			default: 'Community Learning Center',
			trim: true,
		},
		mentorCount: {
			type: Number,
			default: 0,
			min: 0,
		},
	},
	{ timestamps: true }
);

impactEventSchema.pre('validate', function ensureParticipantTotal(next) {
	const { youngMothers = 0, girls = 0, boys = 0 } = this.participants || {};
	this.totalParticipants = youngMothers + girls + boys;
	next();
});

module.exports = mongoose.model('ImpactEvent', impactEventSchema);