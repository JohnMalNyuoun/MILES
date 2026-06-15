const express = require('express');

const {
	getBlogs,
	getBlogById,
	createBlog,
	updateBlog,
	deleteBlog,
} = require('../controllers/blogController');
const {
	authMiddleware,
	authorizeAdmin,
} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.post('/', authMiddleware, authorizeAdmin, createBlog);
router.put('/:id', authMiddleware, authorizeAdmin, updateBlog);
router.delete('/:id', authMiddleware, authorizeAdmin, deleteBlog);

module.exports = router;
