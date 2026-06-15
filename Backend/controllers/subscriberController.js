const path = require('path');
const { randomUUID } = require('crypto');

const { loadCollection, saveCollection, sortByLatest } = require('../utils/localDataStore');
const {
  sendSubscriberWelcomeEmail,
  sendSubscriberInvitationEmail,
  isMailerConfigured,
} = require('../utils/mailer');

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
    const isNewSubscriber = existingIndex < 0;

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

    if (isNewSubscriber && isMailerConfigured()) {
      sendSubscriberWelcomeEmail({ to: email }).catch((mailError) => {
        console.error(`Welcome email to ${email} failed:`, mailError.message);
      });
    }

    return res.status(201).json({
      message: 'Subscription received successfully.',
      subscriberCount: subscribers.length,
      recentSubscribers: sortByLatest(subscribers).slice(0, 5),
      emailSent: isNewSubscriber && isMailerConfigured(),
    });
  } catch (error) {
    next(error);
  }
};

const sendUpdateToSubscriber = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, message, subject, programTitle, programDate, programLocation } = req.body || {};

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

    let emailDelivered = false;
    let emailError = null;
    if (isMailerConfigured()) {
      try {
        await sendSubscriberInvitationEmail({
          to: subscriber.email,
          subject,
          message,
          programTitle,
          programDate,
          programLocation,
        });
        emailDelivered = true;
      } catch (err) {
        emailError = err.message;
        console.error(`Update email to ${subscriber.email} failed:`, err.message);
      }
    }

    return res.status(200).json({
      message: emailDelivered
        ? `Update sent and emailed to ${subscriber.email}`
        : `Update saved for ${subscriber.email} (email not sent${emailError ? `: ${emailError}` : ': mailer not configured'})`,
      updateId: updates[updates.length - 1]._id,
      emailDelivered,
    });
  } catch (error) {
    next(error);
  }
};

const sendBulkUpdateToSubscribers = async (req, res, next) => {
  try {
    const { message, subscriberIds, emails, subject, programTitle, programDate, programLocation } =
      req.body || {};

    if (!message || String(message).trim().length === 0) {
      return res.status(400).json({ message: 'Message cannot be empty.' });
    }

    if (
      (!subscriberIds || subscriberIds.length === 0) &&
      (!emails || emails.length === 0)
    ) {
      return res.status(400).json({ message: 'Please provide subscriber IDs or emails.' });
    }

    const subscribers = (await loadCollection(subscriberDataFilePath, [])).map(
      normalizeSubscriberRecord
    );

    let targetSubscribers = [];

    if (subscriberIds && subscriberIds.length > 0) {
      targetSubscribers = subscribers.filter((s) => subscriberIds.includes(s._id));
    } else if (emails && emails.length > 0) {
      const emailsLower = emails.map((e) => String(e).trim().toLowerCase());
      targetSubscribers = subscribers.filter((s) =>
        emailsLower.includes(s.email)
      );
    }

    if (targetSubscribers.length === 0) {
      return res.status(404).json({ message: 'No matching subscribers found.' });
    }

    const updates = (await loadCollection(subscriberUpdatesFilePath, [])).map(
      normalizeSubscriberUpdate
    );

    targetSubscribers.forEach((subscriber) => {
      updates.push(
        normalizeSubscriberUpdate({
          _id: randomUUID(),
          subscriberId: subscriber._id,
          email: subscriber.email,
          message: String(message).trim(),
          sentAt: new Date().toISOString(),
        })
      );
    });

    await saveCollection(subscriberUpdatesFilePath, updates);

    const deliveryResults = { delivered: [], failed: [] };
    if (isMailerConfigured()) {
      await Promise.all(
        targetSubscribers.map(async (subscriber) => {
          try {
            await sendSubscriberInvitationEmail({
              to: subscriber.email,
              subject,
              message,
              programTitle,
              programDate,
              programLocation,
            });
            deliveryResults.delivered.push(subscriber.email);
          } catch (mailError) {
            console.error(`Bulk email to ${subscriber.email} failed:`, mailError.message);
            deliveryResults.failed.push({ email: subscriber.email, error: mailError.message });
          }
        })
      );
    } else {
      deliveryResults.failed = targetSubscribers.map((s) => ({
        email: s.email,
        error: 'mailer not configured',
      }));
    }

    return res.status(200).json({
      message: `Update saved for ${targetSubscribers.length} subscriber(s); emails sent to ${deliveryResults.delivered.length}.`,
      recipientCount: targetSubscribers.length,
      recipients: targetSubscribers.map((s) => s.email),
      delivered: deliveryResults.delivered,
      failed: deliveryResults.failed,
    });
  } catch (error) {
    next(error);
  }
};

const getAllSubscribers = async (req, res, next) => {
  try {
    const subscribers = (await loadCollection(subscriberDataFilePath, [])).map(
      normalizeSubscriberRecord
    );

    const sorted = sortByLatest(subscribers);

    return res.status(200).json({
      message: 'Subscribers retrieved successfully.',
      subscriberCount: sorted.length,
      subscribers: sorted,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  subscribe,
  sendUpdateToSubscriber,
  sendBulkUpdateToSubscribers,
  getAllSubscribers,
  subscriberDataFilePath,
  normalizeSubscriberRecord,
};
