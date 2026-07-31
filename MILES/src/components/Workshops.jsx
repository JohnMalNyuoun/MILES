import React, { useEffect, useMemo, useState } from 'react';

const buildFacebookEmbedUrl = (postUrl) => `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(postUrl)}&show_text=true&width=500`;

const formatDisplayDate = (value) => {
  if (!value) {
    return '';
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

function Workshops() {
  const [recentWorkshops, setRecentWorkshops] = useState([]);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [workshopPosts, setWorkshopPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
        const response = await fetch(`${apiBaseUrl}/api/workshops`);

        if (!response.ok) {
          throw new Error('Failed to fetch workshops');
        }

        const data = await response.json();
        setCurrentSchedule(data.currentSchedule || null);
        setRecentWorkshops(Array.isArray(data.recentSchedules) ? data.recentSchedules : []);

        const postsResponse = await fetch(`${apiBaseUrl}/api/workshop-posts`);
        if (postsResponse.ok) {
          const postData = await postsResponse.json();
          setWorkshopPosts(Array.isArray(postData) ? postData : []);
        } else {
          setWorkshopPosts([]);
        }
      } catch (fetchError) {
        setError('Unable to load workshop activities right now.');
        setCurrentSchedule(null);
        setRecentWorkshops([]);
        setWorkshopPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadWorkshops();
  }, []);

  const latestWorkshop = useMemo(() => {
    return recentWorkshops[0] || currentSchedule;
  }, [currentSchedule, recentWorkshops]);

  if (loading) {
    return (
      <div className="page workshops-page">
        <h1>Workshop Activities</h1>
        <p className="workshop-empty-state">Loading recent community workshops...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page workshops-page">
        <h1>Workshop Activities</h1>
        <p className="workshop-empty-state">{error}</p>
      </div>
    );
  }

  return (
    <div className="page workshops-page">
      <h1>Workshop Activities</h1>
      <p>
        Visitors can now see the latest MILES workshop with the community, including the venue,
        topic, facilitator, and recent follow-up activities.
      </p>

      <section className="workshop-hero-card">
        <div className="workshop-stat-pill">Latest Community Workshop</div>
        <h2>{latestWorkshop?.nextSessionTopic || latestWorkshop?.title || 'No workshop title recorded yet'}</h2>
        <p>
          {latestWorkshop?.notes || 'The latest workshop summary will appear here after it is recorded from the admin dashboard.'}
        </p>

        <div className="workshop-highlight-grid">
          <article className="workshop-activity-card">
            <h3>Session Details</h3>
            <ul className="workshop-meta-list">
              {latestWorkshop?.nextSessionDate ? <li><strong>Date:</strong> {latestWorkshop.nextSessionDate}</li> : null}
              {latestWorkshop?.nextSessionLocation ? <li><strong>Location:</strong> {latestWorkshop.nextSessionLocation}</li> : null}
              {latestWorkshop?.nextSessionFacilitator || latestWorkshop?.coordinator ? (
                <li><strong>Facilitator:</strong> {latestWorkshop?.nextSessionFacilitator || latestWorkshop?.coordinator}</li>
              ) : null}
            </ul>
          </article>

          <article className="workshop-activity-card">
            <h3>Community Focus</h3>
            <p>
              {latestWorkshop?.activities?.[0]?.details || 'Workshop focus details will appear here once the latest record includes activity notes.'}
            </p>
          </article>
        </div>

        <div className="workshop-details-grid">
          <article className="workshop-activity-card">
            <h3>Workshop Summary</h3>
            <p>{latestWorkshop?.workshopSummary || 'A longer workshop summary will appear here when the admin saves it.'}</p>
          </article>
          <article className="workshop-activity-card">
            <h3>Target Audience</h3>
            <p>{latestWorkshop?.targetAudience || 'Target audience details are not recorded yet.'}</p>
          </article>
          <article className="workshop-activity-card">
            <h3>Key Outcomes</h3>
            <p>{latestWorkshop?.keyOutcomes || 'Key outcomes will appear here after the workshop is saved.'}</p>
          </article>
          <article className="workshop-activity-card">
            <h3>Follow-Up Actions</h3>
            <p>{latestWorkshop?.followUpActions || 'Follow-up actions will appear here after the workshop is saved.'}</p>
          </article>
        </div>
      </section>

      <section className="section">
        <h2>Activities Track</h2>
        <div className="workshop-posts-grid">
          {workshopPosts.map((post, index) => (
            <article key={post._id || post.postUrl || post.url || `post-${index}`} className="workshop-post-card">
              <div className="workshop-post-header">
                <div>
                  <p className="workshop-post-label">Facebook Post</p>
                  <h3>{post.title || 'Workshop update from the field'}</h3>
                </div>
                <span className="workshop-post-date">
                  Date: {formatDisplayDate(post.workshopDate || post.postedDate || latestWorkshop?.nextSessionDate || latestWorkshop?.updatedAt)}
                </span>
              </div>
              <p className="workshop-post-summary">
                {post.summary || post.details || 'This post is tracked in the workshop activity section so the community can see it together with the recorded workshop date.'}
              </p>
              <div className="workshop-post-embed">
                <iframe
                  title={post.title || `Workshop post ${index + 1}`}
                  src={buildFacebookEmbedUrl(post.postUrl || post.url)}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Recent Workshop Records</h2>
        <div className="workshop-record-grid">
          {recentWorkshops.length > 0 ? recentWorkshops.map((workshop, index) => (
            <article key={workshop._id || `workshop-${index}`} className="workshop-record-card">
              <h3>{workshop.nextSessionTopic || workshop.title || 'Workshop record'}</h3>
              <p>{workshop.notes || 'No workshop notes recorded for this session yet.'}</p>
              <ul className="workshop-meta-list">
                {workshop.nextSessionDate ? <li><strong>Date:</strong> {workshop.nextSessionDate}</li> : null}
                {workshop.nextSessionLocation ? <li><strong>Location:</strong> {workshop.nextSessionLocation}</li> : null}
                {workshop.nextSessionFacilitator || workshop.coordinator ? (
                  <li><strong>Facilitator:</strong> {workshop.nextSessionFacilitator || workshop.coordinator}</li>
                ) : null}
              </ul>
            </article>
          )) : (
            <p className="workshop-empty-state">No workshop records have been published yet.</p>
          )}
        </div>
      </section>

      <section className="section">
        <h2>Last Workshop Activities</h2>
        <div className="workshop-activities-grid">
          {(latestWorkshop?.activities || []).length > 0 ? latestWorkshop.activities.map((activity, index) => (
            <article key={`${activity.title || 'activity'}-${index}`} className="workshop-activity-card">
              <h3>{activity.title || 'Workshop activity'}</h3>
              <p>{activity.details || 'No activity details recorded yet.'}</p>
              <ul>
                <li><strong>Status:</strong> {activity.status || 'Recorded'}</li>
                {activity.date || latestWorkshop?.nextSessionDate ? (
                  <li><strong>Date:</strong> {activity.date || latestWorkshop.nextSessionDate}</li>
                ) : null}
                {activity.location || latestWorkshop?.nextSessionLocation ? (
                  <li><strong>Location:</strong> {activity.location || latestWorkshop.nextSessionLocation}</li>
                ) : null}
              </ul>
            </article>
          )) : (
            <p className="workshop-empty-state">No activity breakdown has been recorded for the latest workshop yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Workshops;