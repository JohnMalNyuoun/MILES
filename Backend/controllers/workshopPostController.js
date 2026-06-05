const WorkshopPost = require('../models/WorkshopPost');

const defaultWorkshopPosts = [
	{
		title: 'Previous Facebook Post',
		postUrl: 'https://www.facebook.com/61585890535950/posts/122127226833196351/?app=fbl',
		workshopDate: '',
		postedDate: '',
		summary: 'A featured workshop update that remains visible in the feed.',
		details: '',
	},
	{
		title: 'New Facebook Post',
		postUrl: 'https://www.facebook.com/61585890535950/posts/122109311871196351/?app=fbl',
		workshopDate: '',
		postedDate: '',
		summary: 'Another community update shown alongside the earlier post.',
		details: '',
	},
];

const getWorkshopPosts = async (req, res, next) => {
	try {
		let posts = await WorkshopPost.find().sort({ createdAt: -1 });

		if (posts.length === 0) {
			posts = await WorkshopPost.insertMany(defaultWorkshopPosts);
			posts = posts.sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt));
		}

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

		const record = await WorkshopPost.create({
			title: payload.title || '',
			postUrl: payload.postUrl,
			workshopDate: payload.workshopDate || '',
			postedDate: payload.postedDate || '',
			summary: payload.summary || '',
			details: payload.details || '',
		});

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

			const post = await WorkshopPost.findByIdAndUpdate(
				req.params.id,
				{
					title: payload.title || '',
					postUrl: payload.postUrl,
					workshopDate: payload.workshopDate || '',
					postedDate: payload.postedDate || '',
					summary: payload.summary || '',
					details: payload.details || '',
				},
				{ new: true, runValidators: true }
			);

			if (!post) {
				return res.status(404).json({ message: 'Workshop post not found' });
			}

			res.status(200).json({
				message: 'Workshop post updated successfully',
				post,
			});
		} catch (error) {
			next(error);
		}
	};

const deleteWorkshopPost = async (req, res, next) => {
	try {
		const post = await WorkshopPost.findByIdAndDelete(req.params.id);

		if (!post) {
			return res.status(404).json({ message: 'Workshop post not found' });
		}

		res.status(200).json({
			message: 'Workshop post deleted successfully',
			postId: post._id,
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