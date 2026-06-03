import React from 'react';
import defaultSiteContent from '../content/defaultSiteContent';

function Contact({ siteContent = defaultSiteContent }) {
  const contactContent = siteContent.contact || defaultSiteContent.contact;
  const mapUrl = contactContent.mapUrl;

  return (
    <div className="page">
      <h1>{contactContent.title}</h1>
      <section className="section">
        <p>{contactContent.intro}</p>
        <div className="contact-info">
          <p><strong>Email:</strong> <a href={`mailto:${contactContent.email}`}>{contactContent.email}</a></p>

          <p><strong>Phone:</strong> <a href={`tel:${contactContent.phone}`}>{contactContent.phone}</a></p>
          <p><strong>Address:</strong> <a href={mapUrl} target="_blank" rel="noreferrer">{contactContent.address}</a></p>
        </div>
      </section>
    </div>
  );
}

export default Contact;
