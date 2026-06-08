const express = require('express');

const {
  subscribe,
  sendUpdateToSubscriber,
  sendBulkUpdateToSubscribers,
  getAllSubscribers,
} = require('../controllers/subscriberController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', subscribe);
router.post('/:id/message', authMiddleware, sendUpdateToSubscriber);
router.post('/bulk/message', authMiddleware, sendBulkUpdateToSubscribers);
router.get('/', authMiddleware, getAllSubscribers);

module.exports = router;
