const express = require('express');

const {
	getAdminDashboard,
	createAdminUser,
	registerAdmin,
	getPendingActions,
	rejectAction,
	processApproval,
} = require('../controllers/adminController');
const {
	getAdminSiteContent,
	updateAdminSiteContent,
} = require('../controllers/contentController');
const {
	authMiddleware,
	authorizeAdmin,
} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/process-approval', authMiddleware, authorizeAdmin, processApproval);
router.post('/reject-action', authMiddleware, authorizeAdmin, rejectAction);
router.get('/pending-actions', authMiddleware, authorizeAdmin, getPendingActions);
router.get('/dashboard', authMiddleware, authorizeAdmin, getAdminDashboard);
router.post('/users/admin', authMiddleware, authorizeAdmin, createAdminUser);
router.get('/content', authMiddleware, authorizeAdmin, getAdminSiteContent);
router.put('/content', authMiddleware, authorizeAdmin, updateAdminSiteContent);

module.exports = router;
