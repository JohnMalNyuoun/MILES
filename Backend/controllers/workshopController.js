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

const getWorkshopSchedule = async (req, res, next) => {
	try {
		let record = await WorkshopSchedule.findOne().sort({ updatedAt: -1 });
		if (!record) {
			record = await WorkshopSchedule.create(defaultWorkshopSchedule);
		}

		const recentSchedules = await WorkshopSchedule.find()
			.sort({ updatedAt: -1 })
			.limit(6);

		res.status(200).json({
			currentSchedule: {
				...mergeWorkshopSchedule(record.toObject()),
				updatedAt: record.updatedAt,
			},
			recentSchedules: recentSchedules.map((schedule) => ({
				...mergeWorkshopSchedule(schedule.toObject()),
				updatedAt: schedule.updatedAt,
			})),
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
		const record = await WorkshopSchedule.create(nextSchedule);
		const recentSchedules = await WorkshopSchedule.find()
			.sort({ updatedAt: -1 })
			.limit(6);

		res.status(200).json({
			message: 'Workshop schedule recorded successfully',
			schedule: {
				...mergeWorkshopSchedule(record.toObject()),
				updatedAt: record.updatedAt,
			},
			recentSchedules: recentSchedules.map((schedule) => ({
				...mergeWorkshopSchedule(schedule.toObject()),
				updatedAt: schedule.updatedAt,
			})),
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