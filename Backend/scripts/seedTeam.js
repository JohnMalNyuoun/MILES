const dotenv = require('dotenv');

const connectDB = require('../config/db');
const Team = require('../models/Team');

dotenv.config();

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

const seedTeam = async () => {
	try {
		await connectDB();

		for (const member of teamMembers) {
			await Team.findOneAndUpdate(
				{ name: member.name },
				{ $set: member },
				{ upsert: true, new: true, setDefaultsOnInsert: true }
			);
		}

		console.log(`Team seed complete. Upserted ${teamMembers.length} members.`);
	} catch (error) {
		console.error('Team seed failed:', error.message);
		process.exitCode = 1;
	} finally {
		await Team.db.close();
	}
};

seedTeam();