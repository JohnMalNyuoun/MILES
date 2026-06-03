const Team = require('../models/Team');

const getTeams = async (req, res, next) => {
	try {
		const teams = await Team.find().sort({ createdAt: -1 });
		res.status(200).json(teams);
	} catch (error) {
		next(error);
	}
};

const getTeamById = async (req, res, next) => {
	try {
		const team = await Team.findById(req.params.id);

		if (!team) {
			return res.status(404).json({ message: 'Team not found' });
		}

		res.status(200).json(team);
	} catch (error) {
		next(error);
	}
};

const createTeam = async (req, res, next) => {
	try {
		if (!req.body?.name || !req.body?.role) {
			return res.status(400).json({ message: 'Name and role are required' });
		}

		const team = await Team.create({
			...req.body,
			isMotherProfile: req.body.isMotherProfile !== false,
		});

		res.status(201).json({
			message: 'Young mother case saved to the database successfully',
			team,
		});
	} catch (error) {
		next(error);
	}
};

const updateTeam = async (req, res, next) => {
	try {
		const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!team) {
			return res.status(404).json({ message: 'Team not found' });
		}

		res.status(200).json({
			message: 'Young mother case updated in the database successfully',
			team,
		});
	} catch (error) {
		next(error);
	}
};

const deleteTeam = async (req, res, next) => {
	try {
		const team = await Team.findByIdAndDelete(req.params.id);

		if (!team) {
			return res.status(404).json({ message: 'Team not found' });
		}

		res.status(200).json({ message: 'Team deleted successfully' });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getTeams,
	getTeamById,
	createTeam,
	updateTeam,
	deleteTeam,
};