const path = require('path');
const { randomUUID } = require('crypto');

const { loadCollection, saveCollection } = require('../utils/localDataStore');

const teamDataFilePath = path.join(__dirname, '..', 'data', 'team.json');

const teamMembers = [
	{
		name: 'Nyajuok William',
		role: 'Founder',
		image: 'Nyajuok.jpeg',
		bio: 'Nyajuok is a passionate advocate for education and empowerment. After joining Hundred Youth Ambassadors, he has been dedicated to creating social impact projects that address the needs of underserved communities.',
	},
	{
		name: 'Bhan Thou',
		role: 'Co-Founder',
		image: 'Bhan.jpeg',
		bio: 'Bhan joined the GRE (Gender Responsive Education) club led by Madam Caro, who works with JRS in Kakuma. Inspired by her mentorship, Bhan was motivated to join this team and dedicate herself to empowering communities through education.',
	},
	{
		name: 'Abraham Leek',
		role: 'Secretary',
		image: 'abraham.jpeg',
		bio: 'Abraham is an inspired individual who participated in both the Hundred Youth Ambassadors program and the GRE (Gender Responsive Education) club. He serves as the team secretary, bringing dedication and passion to everything he does.',
	},
	{
		name: 'John Mal',
		role: 'Project Coordinator',
		image: 'John.jpeg',
		bio: 'John is the Project Coordinator, inspired by the stories and incidents he witnessed in the community. His firsthand experiences drive his commitment to creating meaningful change and coordinating impactful projects for those in need.',
	},
	{
		name: 'Nyaluit Mabil',
		role: 'Young Mothers Representative',
		image: 'Nyaluit.jpeg',
		bio: 'Nyaluit is an inspired individual driven by the stories and experiences in her community. As the Young Mothers Representative, she is dedicated to advocating for young mothers and ensuring their voices are heard in the pursuit of empowerment and education.',
	},
	{
		name: 'Nyathak Duop',
		role: 'Treasurer',
		image: '',
		bio: "Nyathak is an inspired individual who serves as the team Treasurer, bringing dedication and integrity to managing the team's resources. Her commitment ensures transparency and accountability in all financial matters.",
	},
	{
		name: 'Ikram Ali',
		role: 'Girls Representative',
		image: '',
		bio: "Ikram is an inspired individual who serves as the Girls Representative, responsible for managing the team's communication strategies and outreach efforts. Her dedication to effective communication helps amplify the team's impact and reach.",
	},
];

const normalizeTeam = (member = {}) => ({
	_id: member._id || randomUUID(),
	name: (member.name || '').trim(),
	role: (member.role || '').trim(),
	image: member.image || '',
	bio: member.bio || '',
	videoUrl: member.videoUrl || '',
	isMotherProfile: member.isMotherProfile === true,
	createdAt: member.createdAt || new Date().toISOString(),
	updatedAt: member.updatedAt || new Date().toISOString(),
});

const seedTeam = async () => {
	try {
		const existing = (await loadCollection(teamDataFilePath, [])).map(normalizeTeam);

		for (const seed of teamMembers) {
			const index = existing.findIndex((member) => member.name === seed.name);
			if (index >= 0) {
				existing[index] = normalizeTeam({
					...existing[index],
					...seed,
					_id: existing[index]._id,
					createdAt: existing[index].createdAt,
					updatedAt: new Date().toISOString(),
				});
			} else {
				existing.push(
					normalizeTeam({
						...seed,
						_id: randomUUID(),
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString(),
					})
				);
			}
		}

		await saveCollection(teamDataFilePath, existing);

		console.log(`Team seed complete in backend JSON. Upserted ${teamMembers.length} members.`);
	} catch (error) {
		console.error('Team seed failed:', error.message);
		process.exitCode = 1;
	}
};

seedTeam();