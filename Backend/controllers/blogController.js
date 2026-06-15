const path = require('path');
const { randomUUID } = require('crypto');

const {
	loadCollection,
	saveCollection,
	sortByLatest,
} = require('../utils/localDataStore');

const blogDataFilePath = path.join(__dirname, '..', 'data', 'blogs.json');

const FOUNDER_STORY_ID = 'static-founder-story-miles';

const staticBlogs = [
	{
		_id: FOUNDER_STORY_ID,
		title: 'The Story Behind MILES: Why a Second Chance Changes Everything',
		excerpt:
			'Every great mission starts with a moment of realization. For MILES, that moment traces back to four childhood friends and the hurdles they faced \u2014 and the second chance every girl deserves.',
		content:
			"Every great mission starts with a moment of realization. For MILES (Mothers in Learning, Empowerment and Support), that moment traces back to my own days in primary school.\n\nGrowing up, I had a close circle of four friends. We were young, full of potential, and navigating our lower primary classes together. But one by one, everything changed. It started when one of my friends became pregnant in Class 4, and over time, the other three followed.\n\nAt that age, we didn\u2019t fully understand why or how this was happening. Looking back, the root cause was simple yet devastating: a profound lack of reproductive health information, coupled with limited support for girls\u2019 education.\n\nThe Lifelong Impact of a Single Hurdle\n\nWatching what happened next deeply affected me. After becoming pregnant, two of my friends tried to find their footing again, but the hurdles were immense. They struggled constantly with childcare responsibilities, heavy financial burdens, intense social stigma, and an overwhelming lack of community support.\n\nAs for my other two friends, we lost contact entirely. To this day, I still do not know where life took them or what opportunities they missed out on.\n\nTheir stories are not isolated incidents. They represent a harsh reality that many young girls and young mothers face every single day. Far too often, when a young girl becomes pregnant, her journey is cut short, and she is denied the second chance she deserves to continue her education and reclaim her future.\n\nTurning Pain Into Purpose: The Birth of MILES\n\nI couldn't shake the memory of my friends, or the knowledge that thousands of girls are still facing the exact same path alone. That is what inspired me to create MILES.\n\nMILES was born from a desire to ensure that no girl or young mother has to walk this road without an anchor. Our mission is built on real, lived experiences. We are here to:\n\n\u2022 Provide Mentorship and Guidance: Equipping young girls with the knowledge they need to make informed decisions about their reproductive health and their futures.\n\u2022 Support Young Mothers: Creating a pathway for young mothers to return to and stay in school, helping them navigate the challenges of continuing their education.\n\u2022 Monitor and Track Progress: Walking alongside these young women step-by-step to ensure they don't fall through the cracks.\n\nLooking Forward\n\nWe cannot change the past, but we have the power to reshape the future. By sharing these real experiences, we hope to encourage girls to stay in school, stand resilient against adversity, and know that a hurdle in life does not mean the end of their education.\n\nThank you for being a part of this journey with us. At MILES, we believe in empowerment, support, and above all, the power of a second chance.\n\nAbout the Author\n\nNyajuok William is the Founder and Chairperson of MILES (Mothers in Learning, Empowerment and Support), an initiative dedicated to mentoring, guiding, and empowering girls and young mothers to pursue their education and build resilient futures.",
		author: 'Nyajuok William',
		authorTitle: 'The Chairperson',
		authorBio:
			'Nyajuok William is the Founder and Chairperson of MILES \u2014 Mothers in Learning, Empowerment and Support. A youth advocate from Kakuma Refugee Camp, she walks alongside girls and young mothers, turning lived experience into mentorship, school re-entry support, and community advocacy that protects the dignity of every learner.',
		coverImage: '/NyajuitFounder.png',
		tags: ['Founder Story', 'Second Chance', 'Mentorship'],
		published: true,
		isStatic: true,
		createdAt: '2026-06-15T00:00:00.000Z',
		updatedAt: '2026-06-15T00:00:00.000Z',
	},
];

const defaultBlogs = [];

const normalizeBlogRecord = (record) => ({
	_id: record._id || randomUUID(),
	title: (record.title || '').trim(),
	excerpt: (record.excerpt || '').trim(),
	content: record.content || '',
	author: (record.author || '').trim(),
	authorTitle: (record.authorTitle || '').trim(),
	authorBio: record.authorBio || '',
	coverImage: record.coverImage || '',
	tags: Array.isArray(record.tags)
		? record.tags.map((item) => String(item).trim()).filter(Boolean)
		: [],
	published: record.published !== false,
	isStatic: record.isStatic === true,
	createdAt: record.createdAt || new Date().toISOString(),
	updatedAt: record.updatedAt || new Date().toISOString(),
});

const loadStoredBlogs = async () =>
	(await loadCollection(blogDataFilePath, defaultBlogs)).map(normalizeBlogRecord);

const loadAllBlogs = async () => {
	const stored = await loadStoredBlogs();
	const staticPosts = staticBlogs.map(normalizeBlogRecord);
	return [...staticPosts, ...stored];
};

const isStaticId = (id) => staticBlogs.some((blog) => blog._id === id);

const getBlogs = async (req, res, next) => {
	try {
		const includeDrafts = String(req.query.includeDrafts || '').toLowerCase() === 'true';
		const all = sortByLatest(await loadAllBlogs());
		const blogs = includeDrafts ? all : all.filter((blog) => blog.published);
		res.status(200).json(blogs);
	} catch (error) {
		next(error);
	}
};

const getBlogById = async (req, res, next) => {
	try {
		const blogs = await loadAllBlogs();
		const blog = blogs.find((item) => item._id === req.params.id);

		if (!blog) {
			return res.status(404).json({ message: 'Blog post not found' });
		}

		res.status(200).json(blog);
	} catch (error) {
		next(error);
	}
};

const createBlog = async (req, res, next) => {
	try {
		if (!req.body?.title || !req.body?.content) {
			return res.status(400).json({ message: 'Blog title and content are required' });
		}

		const blogs = await loadStoredBlogs();
		const now = new Date().toISOString();
		const blog = normalizeBlogRecord({
			_id: randomUUID(),
			...req.body,
			isStatic: false,
			createdAt: now,
			updatedAt: now,
		});

		blogs.push(blog);
		await saveCollection(blogDataFilePath, blogs);

		res.status(201).json(blog);
	} catch (error) {
		next(error);
	}
};

const updateBlog = async (req, res, next) => {
	try {
		if (isStaticId(req.params.id)) {
			return res.status(403).json({ message: 'This blog post is built-in and cannot be edited.' });
		}

		const blogs = await loadStoredBlogs();
		const blogIndex = blogs.findIndex((item) => item._id === req.params.id);

		if (blogIndex === -1) {
			return res.status(404).json({ message: 'Blog post not found' });
		}

		const existing = blogs[blogIndex];
		const updatedBlog = normalizeBlogRecord({
			...existing,
			...req.body,
			_id: existing._id,
			isStatic: false,
			createdAt: existing.createdAt,
			updatedAt: new Date().toISOString(),
		});

		if (!updatedBlog.title || !updatedBlog.content) {
			return res.status(400).json({ message: 'Blog title and content are required' });
		}

		blogs[blogIndex] = updatedBlog;
		await saveCollection(blogDataFilePath, blogs);

		res.status(200).json(updatedBlog);
	} catch (error) {
		next(error);
	}
};

const deleteBlog = async (req, res, next) => {
	try {
		if (isStaticId(req.params.id)) {
			return res.status(403).json({ message: 'This blog post is built-in and cannot be deleted.' });
		}

		const blogs = await loadStoredBlogs();
		const blogIndex = blogs.findIndex((item) => item._id === req.params.id);

		if (blogIndex === -1) {
			return res.status(404).json({ message: 'Blog post not found' });
		}

		blogs.splice(blogIndex, 1);
		await saveCollection(blogDataFilePath, blogs);

		res.status(200).json({ message: 'Blog post deleted successfully' });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getBlogs,
	getBlogById,
	createBlog,
	updateBlog,
	deleteBlog,
};
