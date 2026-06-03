import React from 'react';
import { Link } from 'react-router-dom';
import defaultSiteContent from '../content/defaultSiteContent';

function Home({ siteContent = defaultSiteContent }) {
  const homeContent = siteContent.home || defaultSiteContent.home;

  const renderLink = (item, className, children) => {
    if (!item?.path) {
      return children;
    }

    if (item.path.startsWith('/')) {
      return (
        <Link className={className} to={item.path}>
          {children}
        </Link>
      );
    }

    return (
      <a className={className} href={item.path} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  };

  return (
    <div className="page">
      <section className="section">
        <h2>{homeContent.welcomeTitle}</h2>
        <p>{homeContent.welcomeText}</p>
      </section>
      <section className="section features">
        {(homeContent.featureCards || []).map((card, index) => (
          <React.Fragment key={`${card.title}-${index}`}>
            {renderLink(
              card,
              'feature-link',
              <div className="feature-card">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            )}
          </React.Fragment>
        ))}

        {(homeContent.quickButtons || []).map((button, index) => (
          <div key={`${button.label}-${index}`}>
            {renderLink(button, 'hero-btn', button.label)}
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;
