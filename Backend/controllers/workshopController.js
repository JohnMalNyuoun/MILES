const WorkshopSchedule = require('../models/WorkshopSchedule');

const defaultWorkshopSchedule = {
	title: 'Workshop Schedule Tracker',
	coordinator: 'MILES Program Team',
	nextSessionDate: '',
	nextSessionTopic: '',
	nextSessionLocation: '',
	nextSessionFacilitator: '',
	notes: '',
	activities: [
		{
			title: 'Peer mentorship circle',
			date: '',
			location: 'Scorpion Center',
			status: 'Planned',
			details: 'Create a safe sharing space for mothers returning to school.',
		},
		{
			title: 'School re-enrollment follow-up',
			date: '',
			location: 'Kakuma schools',
			status: 'Planned',
			details: 'Coordinate with schools and families to remove attendance barriers.',
		},
	],
};

const mergeWorkshopSchedule = (schedule = {}) => ({
	...defaultWorkshopSchedule,
	...schedule,
	activities: Array.isArray(schedule.activities) && schedule.activities.length > 0
		? schedule.activities
		: defaultWorkshopSchedule.activities,
});

const getOrCreateWorkshopSchedule = async () => {
	let record = await WorkshopSchedule.findOne({ key: 'main' });

	if (!record) {
		record = await WorkshopSchedule.create({
			key: 'main',
			...defaultWorkshopSchedule,
		});
	}

	return record;
};

const getWorkshopSchedule = async (req, res, next) => {
	try {
		const record = await getOrCreateWorkshopSchedule();
		res.status(200).json({
			...mergeWorkshopSchedule(record.toObject()),
			updatedAt: record.updatedAt,
		});
	} catch (error) {
		next(error);
	}
};

const updateWorkshopSchedule = async (req, res, next) => {
	try {
		const payload = req.body;

		if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
			return res.status(400).json({ message: 'Workshop payload must be an object' });
		}

		const nextSchedule = mergeWorkshopSchedule(payload);
		const record = await WorkshopSchedule.findOneAndUpdate(
			{ key: 'main' },
			{ key: 'main', ...nextSchedule },
			{ new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
		);

		res.status(200).json({
			message: 'Workshop schedule updated successfully',
			schedule: mergeWorkshopSchedule(record.toObject()),
			updatedAt: record.updatedAt,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	defaultWorkshopSchedule,
	getWorkshopSchedule,
	updateWorkshopSchedule,
};