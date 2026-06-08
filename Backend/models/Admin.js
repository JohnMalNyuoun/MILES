const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		resetCode: {
			type: String,
			default: null,
		},
		resetCodeExpires: {
			type: Date,
			default: null,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);