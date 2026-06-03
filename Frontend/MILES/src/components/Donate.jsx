import React from 'react';
import defaultSiteContent from '../content/defaultSiteContent';

function Donate({ siteContent = defaultSiteContent }) {
  const donateContent = siteContent.donate || defaultSiteContent.donate;

  return (
    <div className="page">
      <h1>{donateContent.title}</h1>

      <section className="section donate-section">
        <p>{donateContent.intro}</p>

        <div className="donate-grid">
          {(donateContent.cards || []).map((card) => (
            <article className="donate-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>

        <div className="donate-highlight">
          <p>{donateContent.highlight}</p>
        </div>

        <p>{donateContent.closing}</p>

        <div className="donate-actions">
          {(donateContent.actions || []).map((action) => (
            <a
              key={action.label}
              className="hero-btn"
              href={action.url}
              target={action.external ? '_blank' : undefined}
              rel={action.external ? 'noreferrer' : undefined}
            >
              {action.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Donate;