const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const connectDB = require('./config/db');
const teamRoutes = require('./routes/teamRoutes');
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contentRoutes = require('./routes/contentRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const frontendDistPath = path.join(__dirname, '..', 'Frontend', 'MILES', 'dist');
const frontendIndexPath = path.join(frontendDistPath, 'index.html');

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	if (fs.existsSync(frontendIndexPath)) {
		return res.sendFile(frontendIndexPath);
	}

	res.send('MILES backend is running!');
});

app.use('/api/team', teamRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/content', contentRoutes);

app.use(express.static(frontendDistPath));

app.use((req, res, next) => {
	if (req.method === 'GET' && !req.path.startsWith('/api') && fs.existsSync(frontendIndexPath)) {
		return res.sendFile(frontendIndexPath);
	}

	next();
});

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
