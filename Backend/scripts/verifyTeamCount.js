const path = require('path');

const { loadCollection } = require('../utils/localDataStore');

const teamDataFilePath = path.join(__dirname, '..', 'data', 'team.json');

const run = async () => {
  try {
    const members = await loadCollection(teamDataFilePath, []);
    const names = members
      .map((member) => ({ name: member.name || '' }))
      .sort((a, b) => a.name.localeCompare(b.name));
    const count = names.length;

    console.log(`Team records in backend JSON: ${count}`);
    console.log('Members:');
    names.forEach((member) => console.log(`- ${member.name}`));
  } catch (error) {
    console.error('Verification failed:', error.message);
    process.exitCode = 1;
  }
};

run();
