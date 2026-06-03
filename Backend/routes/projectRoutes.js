const express = require('express');

const {
	getProjects,
	getProjectById,
	createProject,
	updateProject,
	deleteProject,
} = require('../controllers/projectController');
const {
	authMiddleware,
	authorizeAdmin,
} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', authMiddleware, authorizeAdmin, createProject);
router.put('/:id', authMiddleware, authorizeAdmin, updateProject);
router.delete('/:id', authMiddleware, authorizeAdmin, deleteProject);

module.exports = router;