const express = require('express');

const { subscribe, sendUpdateToSubscriber } = require('../controllers/subscriberController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', subscribe);
router.post('/:id/message', authMiddleware, sendUpdateToSubscriber);

module.exports = router;
