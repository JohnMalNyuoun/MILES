const express = require('express');

const {
	getAdminDashboard,
	createAdminUser,
} = require('../controllers/adminController');
const {
	authMiddleware,
	authorizeAdmin,
} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/dashboard', authMiddleware, authorizeAdmin, getAdminDashboard);
router.post('/users/admin', authMiddleware, authorizeAdmin, createAdminUser);

module.exports = router;
