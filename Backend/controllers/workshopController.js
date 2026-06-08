const path = require('path');
const { randomUUID } = require('crypto');

const {
	loadCollection,
	saveCollection,
	sortByLatest,
} = require('../utils/localDataStore');

const workshopDataFilePath = path.join(__dirname, '..', 'data', 'workshops.json');

const defaultWorkshopSchedule = {
	_id: randomUUID(),
	title: 'Workshop Schedule Tracker',
	coordinator: 'MILES Program Team',
	nextSessionDate: '',
	nextSessionTopic: '',
	nextSessionLocation: '',
	nextSessionFacilitator: '',
	notes: '',
	workshopSummary: '',
	targetAudience: '',
	keyOutcomes: '',
	followUpActions: '',
	activities: [
		{
			title: 'Peer mentorship circle',
			date: '',
			location: 'Scorpion Center',
			status: 'Recorded',
			details: 'Create a safe sharing space for mothers returning to school.',
		},
		{
			title: 'School re-enrollment follow-up',
			date: '',
			location: 'Kakuma schools',
			status: 'Recorded',
			details: 'Coordinate with schools and families to remove attendance barriers.',
		},
	],
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
};

const mergeWorkshopSchedule = (schedule = {}) => ({
	...defaultWorkshopSchedule,
	...schedule,
	_id: schedule._id || randomUUID(),
	activities: Array.isArray(schedule.activities) && schedule.activities.length > 0
		? schedule.activities
		: defaultWorkshopSchedule.activities,
	workshopSummary: schedule.workshopSummary || '',
	targetAudience: schedule.targetAudience || '',
	keyOutcomes: schedule.keyOutcomes || '',
	followUpActions: schedule.followUpActions || '',
	createdAt: schedule.createdAt || new Date().toISOString(),
	updatedAt: schedule.updatedAt || new Date().toISOString(),
});

const getWorkshopSchedule = async (req, res, next) => {
	try {
		const schedules = sortByLatest(
			(await loadCollection(workshopDataFilePath, [defaultWorkshopSchedule])).map(
				mergeWorkshopSchedule
			)
		);
		const record = schedules[0];
		const recentSchedules = schedules.slice(0, 6);

		res.status(200).json({
			currentSchedule: {
				...mergeWorkshopSchedule(record),
				updatedAt: record.updatedAt,
			},
			recentSchedules: recentSchedules.map((schedule) => ({
				...mergeWorkshopSchedule(schedule),
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
		const existingSchedules = (await loadCollection(workshopDataFilePath, [defaultWorkshopSchedule])).map(
			mergeWorkshopSchedule
		);
		const now = new Date().toISOString();
		const record = mergeWorkshopSchedule({
			...nextSchedule,
			_id: randomUUID(),
			createdAt: now,
			updatedAt: now,
		});

		existingSchedules.push(record);
		await saveCollection(workshopDataFilePath, existingSchedules);

		const recentSchedules = sortByLatest(existingSchedules).slice(0, 6);

		res.status(200).json({
			message: 'Workshop schedule recorded successfully',
			schedule: {
				...mergeWorkshopSchedule(record),
				updatedAt: record.updatedAt,
			},
			recentSchedules: recentSchedules.map((schedule) => ({
				...mergeWorkshopSchedule(schedule),
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