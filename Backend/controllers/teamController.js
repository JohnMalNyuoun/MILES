const path = require('path');
const { randomUUID } = require('crypto');

const {
	loadCollection,
	saveCollection,
	sortByLatest,
} = require('../utils/localDataStore');

const teamDataFilePath = path.join(__dirname, '..', 'data', 'team.json');

const defaultTeamMembers = [
	{
		_id: randomUUID(),
		name: 'Nyajuok William',
		role: 'Founder',
		image: 'Nyajuok.jpeg',
		bio: 'Nyajuok is a passionate advocate for education and empowerment. After joining Hundred Youth Ambassadors, he has been dedicated to creating social impact projects that address the needs of underserved communities.',
		isMotherProfile: false,
		featured: true,
		videoUrl: '',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: randomUUID(),
		name: 'Bhan Thou',
		role: 'Co-Founder',
		image: 'Bhan.jpeg',
		bio: 'Bhan joined the GRE (Gender Responsive Education) club led by Madam Caro, who works with JRS in Kakuma. Inspired by her mentorship, Bhan was motivated to join this team and dedicate herself to empowering communities through education.',
		isMotherProfile: false,
		featured: true,
		videoUrl: '',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: randomUUID(),
		name: 'Abraham Leek',
		role: 'Secretary',
		image: 'abraham.jpeg',
		bio: 'Abraham is an inspired individual who participated in both the Hundred Youth Ambassadors program and the GRE (Gender Responsive Education) club. He serves as the team secretary, bringing dedication and passion to everything he does.',
		isMotherProfile: false,
		videoUrl: '',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: randomUUID(),
		name: 'John Mal',
		role: 'Project Coordinator',
		image: 'John.jpeg',
		bio: 'John is the Project Coordinator, inspired by the stories and incidents he witnessed in the community. His firsthand experiences drive his commitment to creating meaningful change and coordinating impactful projects for those in need.',
		isMotherProfile: false,
		featured: true,
		videoUrl: '',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: randomUUID(),
		name: 'Nyaluit Mabil',
		role: 'Young Mothers Representative',
		image: 'Nyaluit.jpeg',
		bio: 'Nyaluit is an inspired individual driven by the stories and experiences in her community. As the Young Mothers Representative, she is dedicated to advocating for young mothers and ensuring their voices are heard in the pursuit of empowerment and education.',
		isMotherProfile: false,
		featured: true,
		videoUrl: '',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: randomUUID(),
		name: 'Nyathak Duop',
		role: 'Treasurer',
		image: '',
		bio: "Nyathak is an inspired individual who serves as the team Treasurer, bringing dedication and integrity to managing the team's resources. Her commitment ensures transparency and accountability in all financial matters.",
		isMotherProfile: false,
		videoUrl: '',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: randomUUID(),
		name: 'Ikram Ali',
		role: 'Girls Representative',
		image: '',
		bio: "Ikram is an inspired individual who serves as the Girls Representative, responsible for managing the team's communication strategies and outreach efforts. Her dedication to effective communication helps amplify the team's impact and reach.",
		isMotherProfile: false,
		videoUrl: '',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: randomUUID(),
		name: 'Jean Claude',
		role: 'Community Mobiliser',
		image: '',
		bio: 'Jean Claude serves as the Community Mobiliser, building grassroots networks across Kakuma and ensuring that MILES outreach reaches the families who need it most.',
		isMotherProfile: false,
		featured: false,
		videoUrl: '',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

const normalizeTeamRecord = (record) => ({
	_id: record._id || randomUUID(),
	name: (record.name || '').trim(),
	role: (record.role || '').trim(),
	bio: record.bio || '',
	image: record.image || '',
	videoUrl: record.videoUrl || '',
	isMotherProfile: record.isMotherProfile === true,
	featured: record.featured === true,
	createdAt: record.createdAt || new Date().toISOString(),
	updatedAt: record.updatedAt || new Date().toISOString(),
});

const getTeams = async (req, res, next) => {
	try {
		const { profile, featured } = req.query;
		const teams = sortByLatest(
			(await loadCollection(teamDataFilePath, defaultTeamMembers)).map(normalizeTeamRecord)
		);

		let filteredTeams = teams.filter((member) => {
			if (profile === 'mothers') return member.isMotherProfile === true;
			if (profile === 'team') return member.isMotherProfile !== true;
			return true;
		});

		if (featured === 'true') {
			filteredTeams = filteredTeams.filter((member) => member.featured === true);
		}

		res.status(200).json(filteredTeams);
	} catch (error) {
		next(error);
	}
};

const getTeamById = async (req, res, next) => {
	try {
		const teams = (await loadCollection(teamDataFilePath, defaultTeamMembers)).map(
			normalizeTeamRecord
		);
		const team = teams.find((member) => member._id === req.params.id);

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
		const now = new Date().toISOString();
		const teams = (await loadCollection(teamDataFilePath, defaultTeamMembers)).map(
			normalizeTeamRecord
		);

		const team = normalizeTeamRecord({
			_id: randomUUID(),
			...req.body,
			createdAt: now,
			updatedAt: now,
		});

		teams.push(team);
		await saveCollection(teamDataFilePath, teams);

		res.status(201).json({
			message: 'Team member saved in backend successfully',
			team,
		});
	} catch (error) {
		next(error);
	}
};

const updateTeam = async (req, res, next) => {
	try {
		const teams = (await loadCollection(teamDataFilePath, defaultTeamMembers)).map(
			normalizeTeamRecord
		);
		const teamIndex = teams.findIndex((member) => member._id === req.params.id);

		if (teamIndex === -1) {
			return res.status(404).json({ message: 'Team not found' });
		}

		const existing = teams[teamIndex];
		const updatedTeam = normalizeTeamRecord({
			...existing,
			...req.body,
			_id: existing._id,
			createdAt: existing.createdAt,
			updatedAt: new Date().toISOString(),
		});

		if (!updatedTeam.name || !updatedTeam.role) {
			return res.status(400).json({ message: 'Name and role are required' });
		}

		teams[teamIndex] = updatedTeam;
		await saveCollection(teamDataFilePath, teams);

		res.status(200).json({
			message: 'Team member updated in backend successfully',
			team: updatedTeam,
		});
	} catch (error) {
		next(error);
	}
};

const deleteTeam = async (req, res, next) => {
	try {
		const teams = (await loadCollection(teamDataFilePath, defaultTeamMembers)).map(
			normalizeTeamRecord
		);
		const teamIndex = teams.findIndex((member) => member._id === req.params.id);

		if (teamIndex === -1) {
			return res.status(404).json({ message: 'Team not found' });
		}

		teams.splice(teamIndex, 1);
		await saveCollection(teamDataFilePath, teams);

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