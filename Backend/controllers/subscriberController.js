const path = require('path');
const { randomUUID } = require('crypto');

const { loadCollection, saveCollection, sortByLatest } = require('../utils/localDataStore');

const subscriberDataFilePath = path.join(__dirname, '..', 'data', 'subscribers.json');
const subscriberUpdatesFilePath = path.join(__dirname, '..', 'data', 'subscriberUpdates.json');

const normalizeSubscriberRecord = (record = {}) => ({
  _id: record._id || randomUUID(),
  email: String(record.email || '').trim().toLowerCase(),
  source: record.source || 'website-home-newsletter',
  createdAt: record.createdAt || new Date().toISOString(),
  updatedAt: record.updatedAt || new Date().toISOString(),
});

const normalizeSubscriberUpdate = (update = {}) => ({
  _id: update._id || randomUUID(),
  subscriberId: update.subscriberId || '',
  email: String(update.email || '').trim().toLowerCase(),
  message: String(update.message || ''),
  sentAt: update.sentAt || new Date().toISOString(),
});

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim().toLowerCase());

const subscribe = async (req, res, next) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }

    const subscribers = (await loadCollection(subscriberDataFilePath, [])).map(
      normalizeSubscriberRecord
    );

    const existingIndex = subscribers.findIndex((subscriber) => subscriber.email === email);

    if (existingIndex >= 0) {
      subscribers[existingIndex] = normalizeSubscriberRecord({
        ...subscribers[existingIndex],
        updatedAt: new Date().toISOString(),
      });
    } else {
      subscribers.push(
        normalizeSubscriberRecord({
          _id: randomUUID(),
          email,
          source: 'website-home-newsletter',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      );
    }

    await saveCollection(subscriberDataFilePath, subscribers);

    return res.status(201).json({
      message: 'Subscription received successfully.',
      subscriberCount: subscribers.length,
      recentSubscribers: sortByLatest(subscribers).slice(0, 5),
    });
  } catch (error) {
    next(error);
  }
};

const sendUpdateToSubscriber = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, message } = req.body || {};

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address.' });
    }

    if (!message || String(message).trim().length === 0) {
      return res.status(400).json({ message: 'Message cannot be empty.' });
    }

    const subscribers = (await loadCollection(subscriberDataFilePath, [])).map(
      normalizeSubscriberRecord
    );

    const subscriber = subscribers.find((s) => s._id === id || s.email === email);
    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found.' });
    }

    const updates = (await loadCollection(subscriberUpdatesFilePath, [])).map(
      normalizeSubscriberUpdate
    );

    updates.push(
      normalizeSubscriberUpdate({
        _id: randomUUID(),
        subscriberId: subscriber._id,
        email: subscriber.email,
        message: String(message).trim(),
        sentAt: new Date().toISOString(),
      })
    );

    await saveCollection(subscriberUpdatesFilePath, updates);

    return res.status(200).json({
      message: `Update sent successfully to ${subscriber.email}`,
      updateId: updates[updates.length - 1]._id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  subscribe,
  sendUpdateToSubscriber,
  subscriberDataFilePath,
  normalizeSubscriberRecord,
};
