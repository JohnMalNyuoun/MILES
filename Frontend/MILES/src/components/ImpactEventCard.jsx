import React from 'react';

function ImpactEventCard({ event }) {
  return (
    <article className="impact-card">
      <div className="impact-card-header">
        <h3>{event.title}</h3>
        <span className="impact-total">{event.totalParticipants} Participants</span>
      </div>

      <p className="impact-description">{event.description}</p>

      <p className="impact-focus">
        <strong>Focus:</strong> {event.topicFocus}
      </p>

      {event.sessionSummary && (
        <p className="impact-focus">
          <strong>Session Plan:</strong> {event.sessionSummary}
        </p>
      )}

      <div className="impact-breakdown">
        <span>Young Mothers: {event.participants.youngMothers}</span>
        <span>Girls: {event.participants.girls}</span>
        <span>Boys: {event.participants.boys}</span>
      </div>

      {event.topics?.length > 0 && (
        <div>
          <h4 className="impact-subtitle">Topics Covered</h4>
          <ul className="impact-list">
            {event.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </div>
      )}

      {event.benefits?.length > 0 && (
        <div>
          <h4 className="impact-subtitle">Key Benefits for Youth</h4>
          <ul className="impact-list">
            {event.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}

      {event.photos?.length > 0 && (
        <div className="impact-gallery">
          {event.photos.map((photo) => (
            <figure key={photo.src} className="impact-photo-card">
              <img src={photo.src} alt={photo.alt} className="impact-photo" />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}

      {event.visitor && (
        <div className="impact-visitor">
          <img src={event.visitor.image} alt={event.visitor.alt} className="impact-visitor-photo" />
          <div>
            <h4 className="impact-subtitle">Special Visitor</h4>
            <p>{event.visitor.description}</p>
          </div>
        </div>
      )}

      <div className="impact-meta">
        <span>Mentors: {event.mentorCount}</span>
        <span>Location: {event.location}</span>
      </div>
    </article>
  );
}

export default ImpactEventCard;