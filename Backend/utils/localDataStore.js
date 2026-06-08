const fs = require('fs/promises');
const path = require('path');

const ensureDataFile = async (filePath, defaultData = []) => {
	await fs.mkdir(path.dirname(filePath), { recursive: true });

	try {
		await fs.access(filePath);
	} catch (error) {
		await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
	}
};

const loadCollection = async (filePath, defaultData = []) => {
	await ensureDataFile(filePath, defaultData);

	const rawContent = await fs.readFile(filePath, 'utf-8');
	if (!rawContent.trim()) {
		return Array.isArray(defaultData) ? [...defaultData] : [];
	}

	const parsed = JSON.parse(rawContent);
	if (!Array.isArray(parsed)) {
		return Array.isArray(defaultData) ? [...defaultData] : [];
	}

	return parsed;
};

const saveCollection = async (filePath, collection) => {
	await ensureDataFile(filePath, []);
	await fs.writeFile(filePath, JSON.stringify(collection, null, 2), 'utf-8');
};

const sortByLatest = (records) =>
	[...records].sort(
		(a, b) =>
			new Date(b.updatedAt || b.createdAt || 0).getTime() -
			new Date(a.updatedAt || a.createdAt || 0).getTime()
	);

module.exports = {
	loadCollection,
	saveCollection,
	sortByLatest,
};