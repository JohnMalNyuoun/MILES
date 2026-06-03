const express = require('express');

const {
	getTeams,
	getTeamById,
	createTeam,
	updateTeam,
	deleteTeam,
} = require('../controllers/teamController');
const {
	authMiddleware,
	authorizeAdmin,
} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getTeams);
router.get('/:id', getTeamById);
router.post('/', authMiddleware, authorizeAdmin, createTeam);
router.put('/:id', authMiddleware, authorizeAdmin, updateTeam);
router.delete('/:id', authMiddleware, authorizeAdmin, deleteTeam);

module.exports = router;