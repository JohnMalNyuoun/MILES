const dotenv = require('dotenv');

const connectDB = require('../config/db');
const Project = require('../models/Project');

dotenv.config();

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

const seedProjects = async () => {
	try {
		await connectDB();

		for (const project of projects) {
			await Project.findOneAndUpdate(
				{ title: project.title },
				{ $set: project },
				{ upsert: true, new: true, setDefaultsOnInsert: true }
			);
		}

		console.log(`Projects seed complete. Upserted ${projects.length} projects.`);
	} catch (error) {
		console.error('Projects seed failed:', error.message);
		process.exitCode = 1;
	} finally {
		await Project.db.close();
	}
};

seedProjects();