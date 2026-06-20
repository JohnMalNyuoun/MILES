import React from 'react';
import defaultSiteContent from '../content/defaultSiteContent';
import getInvolvedImage from '../assets/Team.jpeg';

function Contact({ siteContent = defaultSiteContent }) {
  const contactContent = siteContent.contact || defaultSiteContent.contact;
  const mapUrl = contactContent.mapUrl;

  return (
    <div className="page">
      <section className="contact-hero">
        <div className="contact-hero-image-wrap">
          <img src={getInvolvedImage} alt="Get Involved" className="contact-hero-image" />
          <h1>Get Involved</h1>
          <p className="contact-hero-message">
            At MILES, we empower vulnerable youth and young mothers in Kakuma by facilitating school
            re-enrollment for those who dropped out due to early marriage&Pregnancy. Through
            consistent mentorship and active daily monitoring, we ensure they have the support needed
            to achieve educational retention. Complementing this foundation, we equip local youth with
            essential tools for the future through our dedicated digital literacy and computer skills
            training.
          </p>
        </div>
      </section>
      <section className="section">
        <h2>Volunteering</h2>
        <p>
          We invite you to learn more about our organization and the impact we&apos;re making. If
          you&apos;re interested, you can join us by becoming a volunteer. We appreciate your support!
        </p>
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
