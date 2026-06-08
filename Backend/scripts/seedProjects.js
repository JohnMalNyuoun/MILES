const path = require('path');
const { randomUUID } = require('crypto');

const { loadCollection, saveCollection } = require('../utils/localDataStore');

const projectDataFilePath = path.join(__dirname, '..', 'data', 'projects.json');

const projects = [
	{
		title: 'Girls Back-to-School Mentorship Drive',
		description: 'A mentorship and school reintegration initiative that supports girls returning to class through counseling, supplies, and peer mentors.',
		techStack: ['Community Outreach', 'Mentorship'],
		featured: true,
	},
	{
		title: 'Young Mothers Learning Circle',
		description: 'A weekend learning circle designed for young mothers to continue education with flexible schedules and childcare support.',
		techStack: ['Education Support', 'Workshops'],
		featured: true,
	},
	{
		title: 'Community Awareness Sessions',
		description: 'Monthly community sessions focused on the value of girls education, leadership, and safe learning environments.',
		techStack: ['Community Engagement', 'Advocacy'],
		featured: false,
	},
];

const normalizeProject = (project = {}) => ({
	_id: project._id || randomUUID(),
	title: (project.title || '').trim(),
	description: project.description || '',
	techStack: Array.isArray(project.techStack) ? project.techStack : [],
	featured: project.featured === true,
	image: project.image || '',
	liveUrl: project.liveUrl || '',
	repoUrl: project.repoUrl || '',
	createdAt: project.createdAt || new Date().toISOString(),
	updatedAt: project.updatedAt || new Date().toISOString(),
});

const seedProjects = async () => {
	try {
		const existing = (await loadCollection(projectDataFilePath, [])).map(normalizeProject);

		for (const seed of projects) {
			const index = existing.findIndex((project) => project.title === seed.title);
			if (index >= 0) {
				existing[index] = normalizeProject({
					...existing[index],
					...seed,
					_id: existing[index]._id,
					createdAt: existing[index].createdAt,
					updatedAt: new Date().toISOString(),
				});
			} else {
				existing.push(
					normalizeProject({
						...seed,
						_id: randomUUID(),
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString(),
					})
				);
			}
		}

		await saveCollection(projectDataFilePath, existing);

		console.log(`Projects seed complete in backend JSON. Upserted ${projects.length} projects.`);
	} catch (error) {
		console.error('Projects seed failed:', error.message);
		process.exitCode = 1;
	}
};

seedProjects();