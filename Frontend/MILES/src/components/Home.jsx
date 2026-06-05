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
    <div className="page home-page">
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

      <section className="section public-dashboard-section">
        <h2>Our Pillars of Impact</h2>
        <p>
          Mothers in Learning, Empowerment &amp; Support operates a comprehensive intervention framework to uplift young mothers and girls.
        </p>

        <div className="public-dashboard-grid">
          <article className="public-dashboard-panel">
            <h3>Academic Re-enrollment</h3>
            <p>
              Actively monitoring, mentoring, and establishing pathways for young mothers to return to school and continue their education journeys cleanly.
            </p>
          </article>

          <article className="public-dashboard-panel">
            <h3>Pregnancy Prevention</h3>
            <p>
              Deploying targeted workshops and awareness tracks to safeguard young girls, offering guidance, resources, and continuous reproductive health advocacy.
            </p>
          </article>

          <article className="public-dashboard-panel">
            <h3>Resilience Against Peer Pressure</h3>
            <p>
              Building strong peer-led support structures to combat negative social pressure and empower young women with confidence and leadership tools.
            </p>
          </article>

          <article className="public-dashboard-panel">
            <h3>Community Mentorship</h3>
            <p>
              Providing personalized family monitoring, community networks, and critical intervention advocacy alongside local educational framework partners.
            </p>
          </article>

          <article
            className="public-dashboard-panel public-dashboard-panel-featured"
          >
            <h3>Advocacy &amp; GBV Prevention</h3>
            <p>
              Challenging deep-rooted cultural beliefs and protecting the girl child from dangerous traditional practices. Click to explore our complete protection framework.
            </p>

            <div className="advocacy-inline-grid">
              <section className="advocacy-inline-block">
                <h4>Countering Gender-Based Violence (GBV)</h4>
                <p>
                  Systematically breaking down the silence surrounding physical, psychological, and economic violence against women and girls through safe spaces, reporting advocacy, and survivor support tracks.
                </p>
              </section>

              <section className="advocacy-inline-block">
                <h4>Eradicating Dangerous Traditional Practices</h4>
                <p>
                  Confronting and campaigning against harmful traditional frameworks, including child, early, and forced marriages, and female genital mutilation (FGM), which strip the girl child of her health, dignity, and education.
                </p>
              </section>

              <section className="advocacy-inline-block">
                <h4>Community Shift &amp; Awareness</h4>
                <p>
                  Engaging traditional elders, parents, and youth leaders in structured dialogue workshops to shift community mindsets, replace outdated dogmas with protective support, and keep girls safely enrolled in schools.
                </p>
              </section>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Home;
