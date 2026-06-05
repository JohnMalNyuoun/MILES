const express = require('express');

const {
	getWorkshopPosts,
	createWorkshopPost,
	updateWorkshopPost,
	deleteWorkshopPost,
} = require('../controllers/workshopPostController');
const {
	authMiddleware,
	authorizeAdmin,
} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getWorkshopPosts);
router.post('/', authMiddleware, authorizeAdmin, createWorkshopPost);
router.put('/:id', authMiddleware, authorizeAdmin, updateWorkshopPost);
router.delete('/:id', authMiddleware, authorizeAdmin, deleteWorkshopPost);

module.exports = router;