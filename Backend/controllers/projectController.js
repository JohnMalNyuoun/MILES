const path = require('path');
const { randomUUID } = require('crypto');

const {
	loadCollection,
	saveCollection,
	sortByLatest,
} = require('../utils/localDataStore');

const projectDataFilePath = path.join(__dirname, '..', 'data', 'projects.json');

const defaultProjects = [
	{
		_id: randomUUID(),
		title: 'Girls Back-to-School Mentorship Drive',
		description: 'A mentorship and school reintegration initiative that supports girls returning to class through counseling, supplies, and peer mentors.',
		techStack: ['Community Outreach', 'Mentorship'],
		featured: true,
		image: '',
		liveUrl: '',
		repoUrl: '',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: randomUUID(),
		title: 'Young Mothers Learning Circle',
		description: 'A weekend learning circle designed for young mothers to continue education with flexible schedules and childcare support.',
		techStack: ['Education Support', 'Workshops'],
		featured: true,
		image: '',
		liveUrl: '',
		repoUrl: '',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: randomUUID(),
		title: 'Community Awareness Sessions',
		description: 'Monthly community sessions focused on the value of girls education, leadership, and safe learning environments.',
		techStack: ['Community Engagement', 'Advocacy'],
		featured: false,
		image: '',
		liveUrl: '',
		repoUrl: '',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

const normalizeProjectRecord = (record) => ({
	_id: record._id || randomUUID(),
	title: (record.title || '').trim(),
	description: record.description || '',
	image: record.image || '',
	techStack: Array.isArray(record.techStack)
		? record.techStack.map((item) => String(item).trim()).filter(Boolean)
		: [],
	liveUrl: record.liveUrl || '',
	repoUrl: record.repoUrl || '',
	featured: record.featured === true,
	createdAt: record.createdAt || new Date().toISOString(),
	updatedAt: record.updatedAt || new Date().toISOString(),
});

const getProjects = async (req, res, next) => {
	try {
		const projects = sortByLatest(
			(await loadCollection(projectDataFilePath, defaultProjects)).map(normalizeProjectRecord)
		);
		res.status(200).json(projects);
	} catch (error) {
		next(error);
	}
};

const getProjectById = async (req, res, next) => {
	try {
		const projects = (await loadCollection(projectDataFilePath, defaultProjects)).map(
			normalizeProjectRecord
		);
		const project = projects.find((item) => item._id === req.params.id);

		if (!project) {
			return res.status(404).json({ message: 'Project not found' });
		}

		res.status(200).json(project);
	} catch (error) {
		next(error);
	}
};

const createProject = async (req, res, next) => {
	try {
		if (!req.body?.title || !req.body?.description) {
			return res.status(400).json({ message: 'Title and description are required' });
		}

		const projects = (await loadCollection(projectDataFilePath, defaultProjects)).map(
			normalizeProjectRecord
		);
		const now = new Date().toISOString();
		const project = normalizeProjectRecord({
			_id: randomUUID(),
			...req.body,
			createdAt: now,
			updatedAt: now,
		});

		projects.push(project);
		await saveCollection(projectDataFilePath, projects);

		res.status(201).json(project);
	} catch (error) {
		next(error);
	}
};

const updateProject = async (req, res, next) => {
	try {
		const projects = (await loadCollection(projectDataFilePath, defaultProjects)).map(
			normalizeProjectRecord
		);
		const projectIndex = projects.findIndex((item) => item._id === req.params.id);

		if (projectIndex === -1) {
			return res.status(404).json({ message: 'Project not found' });
		}

		const existing = projects[projectIndex];
		const updatedProject = normalizeProjectRecord({
			...existing,
			...req.body,
			_id: existing._id,
			createdAt: existing.createdAt,
			updatedAt: new Date().toISOString(),
		});

		if (!updatedProject.title || !updatedProject.description) {
			return res.status(400).json({ message: 'Title and description are required' });
		}

		projects[projectIndex] = updatedProject;
		await saveCollection(projectDataFilePath, projects);

		res.status(200).json(updatedProject);
	} catch (error) {
		next(error);
	}
};

const deleteProject = async (req, res, next) => {
	try {
		const projects = (await loadCollection(projectDataFilePath, defaultProjects)).map(
			normalizeProjectRecord
		);
		const projectIndex = projects.findIndex((item) => item._id === req.params.id);

		if (projectIndex === -1) {
			return res.status(404).json({ message: 'Project not found' });
		}

		projects.splice(projectIndex, 1);
		await saveCollection(projectDataFilePath, projects);

		res.status(200).json({ message: 'Project deleted successfully' });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getProjects,
	getProjectById,
	createProject,
	updateProject,
	deleteProject,
};