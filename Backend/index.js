const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');
const teamRoutes = require('./routes/teamRoutes');
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contentRoutes = require('./routes/contentRoutes');
const workshopRoutes = require('./routes/workshopRoutes');
const workshopPostRoutes = require('./routes/workshopPostRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const frontendDistPath = path.join(__dirname, '..', 'Frontend', 'MILES', 'dist');
const frontendIndexPath = path.join(frontendDistPath, 'index.html');

connectDB();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
	const startTime = Date.now();
	res.on('finish', () => {
		const duration = Date.now() - startTime;
		console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
	});
	next();
});

app.use('/api/team', teamRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/workshops', workshopRoutes);
app.use('/api/workshop-posts', workshopPostRoutes);

app.use(express.static(frontendDistPath));

app.use(errorHandler);

app.get(/^(?!\/api).*/, (req, res) => {
	return res.sendFile(frontendIndexPath);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
