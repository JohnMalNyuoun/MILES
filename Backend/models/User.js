const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
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
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		resetCodeHash: {
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

module.exports = mongoose.model('User', userSchema);