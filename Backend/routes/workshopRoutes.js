const express = require('express');

const {
	getWorkshopSchedule,
	updateWorkshopSchedule,
} = require('../controllers/workshopController');
const {
	authMiddleware,
	authorizeAdmin,
} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getWorkshopSchedule);
router.put('/', authMiddleware, authorizeAdmin, updateWorkshopSchedule);

module.exports = router;