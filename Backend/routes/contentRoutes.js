const express = require('express');
const { getPublicSiteContent } = require('../controllers/contentController');

const router = express.Router();

router.get('/', getPublicSiteContent);

module.exports = router;