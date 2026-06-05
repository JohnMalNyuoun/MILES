const express = require('express');
const { body, validationResult } = require('express-validator');

const { register, login, forgotPassword } = require('../controllers/authController');
const { registerAdmin } = require('../controllers/adminController');

const router = express.Router();

const registerNewAdminValidation = [
	body('name').notEmpty().withMessage('name must not be empty.'),
	body('username')
		.trim()
		.notEmpty()
		.withMessage('username must not be empty.'),
	body('email')
		.isEmail()
		.withMessage('email must be a valid email format.')
		.normalizeEmail(),
	body('password')
		.isLength({ min: 6 })
		.withMessage('password must have a minimum length of 6 characters.'),
	body('organizationSecretKey')
		.notEmpty()
		.withMessage('organizationSecretKey must not be empty.'),
];

const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array().map((error) => error.msg),
		});
	}

	next();
};

router.post('/register', register);
router.post('/login', login);
router.post(
	'/forgot-password',
	[
		body('username').trim().notEmpty().withMessage('username is required.'),
		body('email')
			.trim()
			.isEmail()
			.withMessage('email must be a valid email format.')
			.normalizeEmail(),
		body('newPassword')
			.isLength({ min: 6 })
			.withMessage('newPassword must have a minimum length of 6 characters.'),
	],
	handleValidationErrors,
	forgotPassword
);
router.post('/register-new-admin', registerNewAdminValidation, handleValidationErrors, registerAdmin);

module.exports = router;