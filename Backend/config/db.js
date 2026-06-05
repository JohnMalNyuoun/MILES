const mongoose = require('mongoose');

const connectDB = async () => {
	const mongoUri = process.env.MONGODB_URI;
	const mongoDbName = process.env.MONGODB_DB_NAME;

	if (!mongoUri) {
		console.warn('MONGODB_URI is not set. Skipping database connection.');
		return;
	}

	try {
		const connectionOptions = mongoDbName ? { dbName: mongoDbName } : {};
		await mongoose.connect(mongoUri, connectionOptions);
		console.log(`MongoDB connected (db: ${mongoose.connection.name})`);
	} catch (error) {
		console.error('MongoDB connection failed:', error.message);
	}
};

module.exports = connectDB;