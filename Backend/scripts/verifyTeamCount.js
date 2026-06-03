const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Team = require('../models/Team');

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const count = await Team.countDocuments();
    const names = await Team.find({}, { name: 1, _id: 0 }).sort({ name: 1 });

    console.log(`Team documents: ${count}`);
    console.log('Members:');
    names.forEach((member) => console.log(`- ${member.name}`));
  } catch (error) {
    console.error('Verification failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

run();
