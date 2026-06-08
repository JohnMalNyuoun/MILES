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

router.get('/', (req, res) => {
	res.status(200).json({
		message: 'Admin API is running',
		routes: {
			register: 'POST /api/admin/register',
			dashboard: 'GET /api/admin/dashboard (auth required)',
			createAdminUser: 'POST /api/admin/users/admin (auth required)',
			pendingActions: 'GET /api/admin/pending-actions (auth required)',
			processApproval: 'POST /api/admin/process-approval (auth required)',
			rejectAction: 'POST /api/admin/reject-action (auth required)',
			contentGet: 'GET /api/admin/content (auth required)',
			contentUpdate: 'PUT /api/admin/content (auth required)',
		},
	});
});

router.post('/register', registerAdmin);
router.post('/process-approval', authMiddleware, authorizeAdmin, processApproval);
router.post('/reject-action', authMiddleware, authorizeAdmin, rejectAction);
router.get('/pending-actions', authMiddleware, authorizeAdmin, getPendingActions);
router.get('/dashboard', authMiddleware, authorizeAdmin, getAdminDashboard);
router.post('/users/admin', authMiddleware, authorizeAdmin, createAdminUser);
router.get('/content', authMiddleware, authorizeAdmin, getAdminSiteContent);
router.put('/content', authMiddleware, authorizeAdmin, updateAdminSiteContent);

module.exports = router;
