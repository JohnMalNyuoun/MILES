const path = require('path');
const { randomUUID } = require('crypto');

const {
	loadCollection,
	saveCollection,
	sortByLatest,
} = require('../utils/localDataStore');

const workshopPostDataFilePath = path.join(__dirname, '..', 'data', 'workshopPosts.json');

const defaultWorkshopPosts = [
	{
		_id: randomUUID(),
		title: 'Previous Facebook Post',
		postUrl: 'https://www.facebook.com/61585890535950/posts/122127226833196351/?app=fbl',
		workshopDate: '',
		postedDate: '',
		summary: 'A featured workshop update that remains visible in the feed.',
		details: '',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: randomUUID(),
		title: 'New Facebook Post',
		postUrl: 'https://www.facebook.com/61585890535950/posts/122109311871196351/?app=fbl',
		workshopDate: '',
		postedDate: '',
		summary: 'Another community update shown alongside the earlier post.',
		details: '',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

const normalizeWorkshopPostRecord = (record = {}) => ({
	_id: record._id || randomUUID(),
	title: (record.title || '').trim(),
	postUrl: (record.postUrl || '').trim(),
	workshopDate: (record.workshopDate || '').trim(),
	postedDate: (record.postedDate || '').trim(),
	summary: record.summary || '',
	details: record.details || '',
	createdAt: record.createdAt || new Date().toISOString(),
	updatedAt: record.updatedAt || new Date().toISOString(),
});

const loadWorkshopPosts = async () =>
	(await loadCollection(workshopPostDataFilePath, defaultWorkshopPosts)).map(
		normalizeWorkshopPostRecord
	);

const getWorkshopPosts = async (req, res, next) => {
	try {
		const posts = sortByLatest(await loadWorkshopPosts());
		res.status(200).json(posts);
	} catch (error) {
		next(error);
	}
};

const createWorkshopPost = async (req, res, next) => {
	try {
		const payload = req.body;

		if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
			return res.status(400).json({ message: 'Workshop post payload must be an object' });
		}

		if (!payload.postUrl) {
			return res.status(400).json({ message: 'Workshop post URL is required' });
		}

		const posts = await loadWorkshopPosts();
		const now = new Date().toISOString();
		const record = normalizeWorkshopPostRecord({
			_id: randomUUID(),
			...payload,
			createdAt: now,
			updatedAt: now,
		});

		posts.push(record);
		await saveCollection(workshopPostDataFilePath, posts);

		res.status(201).json({
			message: 'Workshop post recorded successfully',
			post: record,
		});
	} catch (error) {
		next(error);
	}
};

const updateWorkshopPost = async (req, res, next) => {
	try {
		const payload = req.body;

		if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
			return res.status(400).json({ message: 'Workshop post payload must be an object' });
		}

		if (!payload.postUrl) {
			return res.status(400).json({ message: 'Workshop post URL is required' });
		}

		const posts = await loadWorkshopPosts();
		const postIndex = posts.findIndex((item) => item._id === req.params.id);

		if (postIndex === -1) {
			return res.status(404).json({ message: 'Workshop post not found' });
		}

		const existing = posts[postIndex];
		const updated = normalizeWorkshopPostRecord({
			...existing,
			...payload,
			_id: existing._id,
			createdAt: existing.createdAt,
			updatedAt: new Date().toISOString(),
		});

		posts[postIndex] = updated;
		await saveCollection(workshopPostDataFilePath, posts);

		res.status(200).json({
			message: 'Workshop post updated successfully',
			post: updated,
		});
	} catch (error) {
		next(error);
	}
};

const deleteWorkshopPost = async (req, res, next) => {
	try {
		const posts = await loadWorkshopPosts();
		const postIndex = posts.findIndex((item) => item._id === req.params.id);

		if (postIndex === -1) {
			return res.status(404).json({ message: 'Workshop post not found' });
		}

		const [removed] = posts.splice(postIndex, 1);
		await saveCollection(workshopPostDataFilePath, posts);

		res.status(200).json({
			message: 'Workshop post deleted successfully',
			postId: removed._id,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getWorkshopPosts,
	createWorkshopPost,
	updateWorkshopPost,
	deleteWorkshopPost,
};
