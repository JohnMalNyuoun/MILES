const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Authorization token is required' });
	}

	const token = authHeader.split(' ')[1];

	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET || 'development-secret'
		);
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ message: 'Invalid token' });
	}
};

const authorizeRole = (...roles) => {
	return (req, res, next) => {
		if (!req.user) {
			return res.status(401).json({ message: 'Authentication required' });
		}

		if (!roles.includes(req.user.role)) {
			return res.status(403).json({ message: 'You are not allowed to perform this action' });
		}

		next();
	};
};

const authorizeAdmin = authorizeRole('admin');

module.exports = {
	authMiddleware,
	authorizeRole,
	authorizeAdmin,
};