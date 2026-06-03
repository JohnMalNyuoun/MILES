import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import defaultSiteContent from '../content/defaultSiteContent';

function Home({ siteContent = defaultSiteContent }) {
  const homeContent = siteContent.home || defaultSiteContent.home;
  const [teamMembers, setTeamMembers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadPublicDashboardData = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
        const [teamResponse, projectsResponse] = await Promise.all([
          fetch(`${apiBaseUrl}/api/team`),
          fetch(`${apiBaseUrl}/api/projects`),
        ]);

        if (!teamResponse.ok || !projectsResponse.ok) {
          return;
        }

        const [teamData, projectsData] = await Promise.all([
          teamResponse.json(),
          projectsResponse.json(),
        ]);

        setTeamMembers(Array.isArray(teamData) ? teamData : []);
        setProjects(Array.isArray(projectsData) ? projectsData : []);
      } catch (error) {
        setTeamMembers([]);
        setProjects([]);
      }
    };

    loadPublicDashboardData();
  }, []);

  const workshopCount = useMemo(() => {
    const keywordMatches = projects.filter((project) =>
      `${project.title || ''} ${project.description || ''}`.toLowerCase().match(/workshop|mentorship/)
    );

    return keywordMatches.length > 0 ? keywordMatches.length : projects.length;
  }, [projects]);

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

      <section className="section public-dashboard-section">
        <h2>Community Dashboard</h2>
        <p>
          Public visibility for MILES progress. This section shares key updates with all users.
        </p>

        <div className="public-dashboard-stats">
          <article className="public-dashboard-card">
            <h3>Mothers Supported</h3>
            <p>{teamMembers.length}</p>
          </article>
          <article className="public-dashboard-card">
            <h3>Recent Mentorship</h3>
            <p>{projects.length} Active Records</p>
          </article>
          <article className="public-dashboard-card">
            <h3>Workshops</h3>
            <p>{workshopCount} Hosted</p>
          </article>
        </div>

        <div className="public-dashboard-grid">
          <article className="public-dashboard-panel">
            <h3>Our Core Focus</h3>
            <div className="public-focus-tags">
              <span>Early Pregnancy Prevention</span>
              <span>Combating Negative Peer Pressure</span>
            </div>
          </article>

          <article className="public-dashboard-panel">
            <h3>Team Overview</h3>
            <ul>
              <li><strong>Nyajuok William</strong> - Founder</li>
              <li><strong>John Mal Nyuon</strong> - Program Coordinator</li>
              <li><strong>Nyaluit Mabil</strong> - Young Mothers Representative</li>
            </ul>
          </article>

          <article className="public-dashboard-panel">
            <h3>Latest Community Milestone</h3>
            <p className="public-milestone-text">
              Successfully hosted a dynamic mentorship workshop bringing together 45 young mothers,
              girls, and boys altogether to address youth advocacy and brotherly allyship.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Home;
