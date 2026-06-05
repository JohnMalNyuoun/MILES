const mongoose = require('mongoose');

const pendingActionSchema = new mongoose.Schema({
	actionType: {
		type: String,
		required: true,
		enum: ['CREATE_POST', 'EDIT_POST', 'DELETE_ITEM', 'MODERATE_COMMENT'],
	},
	targetCollection: {
		type: String,
		required: true,
	},
	targetId: {
		type: mongoose.Schema.Types.ObjectId,
		default: null,
	},
	proposedData: {
		type: Object,
		required: true,
	},
	createdBy: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: ['pending', 'approved', 'rejected'],
		default: 'pending',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('PendingAction', pendingActionSchema);
