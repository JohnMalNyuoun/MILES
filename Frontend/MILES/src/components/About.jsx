import React from 'react';
import defaultSiteContent from '../content/defaultSiteContent';

function About({ siteContent = defaultSiteContent }) {
  const aboutContent = siteContent.about || defaultSiteContent.about;

  return (
    <div className="page">
      <h1>{aboutContent.title}</h1>
      <section className="section">
        <p>{aboutContent.introOne}</p>
        <p>{aboutContent.introTwo}</p>
      </section>
      <section className="section">
        <h2>{aboutContent.missionTitle}</h2>
        <p>{aboutContent.missionText}</p>
        <ul>{(aboutContent.missionPoints || []).map((point) => <li key={point}>{point}</li>)}</ul>
      </section>
    </div>
  );
}

export default About;
