const path = require('path');
const { randomUUID } = require('crypto');

const {
	loadCollection,
	saveCollection,
	sortByLatest,
} = require('../utils/localDataStore');

const blogDataFilePath = path.join(__dirname, '..', 'data', 'blogs.json');

const FOUNDER_STORY_ID = 'static-founder-story-miles';
const BIRTH_OF_MILES_ID = 'static-birth-of-miles-kakuma';

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
	{
		_id: BIRTH_OF_MILES_ID,
		title: 'The Birth of MILES: Turning Shared Vision into Community Impact in Kakuma',
		excerpt:
			'MILES was co-founded with strong leadership from Nyajuok William, Bhan Thou, Abraham Leek, Nyathak Duol, and Nyaluit Mabil to support young mothers returning to school after early marriage in Kakuma.',
		content:
			'Every great journey begins with a single step, but the story of MILES (Mothers in Learning Empowerment Support) began with a shared conviction. Looking at our community in Kakuma, we saw an urgent, undeniable hurdle: young mothers who had dropped out of school due to early marriage, and vulnerable youth who possessed immense potential but lacked the structured guidance needed to navigate their educational and personal journeys.\n\nWe knew that talent is universal, but mentorship and opportunity are not. That is why MILES was born.\n\nFrom a Vision to a Movement\n\nMILES did not just appear overnight. It came to being through deep conversations, strategic planning, and a passionate commitment to social impact. Founded alongside Nyajuok William, the project was built on a simple yet powerful premise: if we can facilitate school re-enrollment for young mothers, mentor them to achieve long-term educational retention, and actively monitor their progress through daily living, we can rewrite the future of entire families.\n\nWhat started as a passionate idea quickly evolved into a structured reality. We formalized our mission, drafted a compliance-ready constitution, and built a dedicated governance team. With leaders like Bhan Thou, Abraham Leek, Nyathak Duol, and Nyaluit Mabil stepping into key roles, the foundation was officially laid.\n\nWhat We Stand For: Our Core Mission\n\nAt its heart, MILES is a sanctuary for mentorship and monitoring. We believe that sustainable change does not come from quick fixes; it comes from consistent, long-term guidance. We walk alongside our beneficiaries, protecting their right to education, offering personal development frameworks, and fostering a growth mindset.\n\nWhile our primary heartbeat is mentorship, we refuse to ignore the tangible barriers our youth face. As our funding and partnerships grow, our vision has expanded to provide critical material aid like uniforms and school supplies to ensure that no student is forced out of the classroom due to a lack of basic necessities.\n\nExpanding Horizons: Digital Literacy\n\nAs we listened to the needs of our community, we realized that empowerment in the modern world requires modern tools. To complement our core mission, we launched our Digital Literacy and Computer Skills Training program.\n\nOperated as a distinct, specialized initiative so it never distracts from our foundational mentorship sessions, this program equips local youth in Kakuma with essential digital communication, internet navigation, and computing skills. We are not just helping youth stay in school; we are preparing them to thrive in a digital economy.\n\nThe Journey Ahead\n\nMILES is no longer just a project on paper; it is a living, breathing movement. Every milestone we reach, from structured administrative dashboards to active student re-enrollment interventions, is a testament to what happens when a community unites for a common cause.\n\nWe are just getting started, and the miles ahead look brighter than ever.',
		author: 'Nyajuok William, Bhan Thou, Abraham Leek, Nyathak Duol, Nyaluit Mabil',
		coverImage: 'group.jpeg',
		tags: [
			'Nyajuok William',
			'Bhan Thou',
			'Abraham Leek',
			'Nyathak Duol',
			'Nyaluit Mabil',
			'Kakuma',
			'School Re-enrollment',
			'Early Marriage',
			'Mentorship',
		],
		published: true,
		isStatic: true,
		displayStyle: 'flat',
		createdAt: '2026-06-20T00:00:00.000Z',
		updatedAt: '2026-06-20T00:00:00.000Z',
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
	displayStyle: record.displayStyle === 'flat' ? 'flat' : 'default',
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
