const express = require('express');

const {
	getAdminDashboard,
	createAdminUser,
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

router.get('/dashboard', authMiddleware, authorizeAdmin, getAdminDashboard);
router.post('/users/admin', authMiddleware, authorizeAdmin, createAdminUser);
router.get('/content', authMiddleware, authorizeAdmin, getAdminSiteContent);
router.put('/content', authMiddleware, authorizeAdmin, updateAdminSiteContent);

module.exports = router;
