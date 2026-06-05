const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const frontendIndexPath = path.join(__dirname, 'Frontend', 'MILES', 'dist', 'index.html');

if (!fs.existsSync(frontendIndexPath)) {
	console.log('Frontend build missing. Building frontend assets...');
	execSync('npm --prefix Frontend/MILES run build', { stdio: 'inherit' });
}

require('./Backend/index.js');