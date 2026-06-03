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
            <h3>Quick Actions</h3>
            <div className="public-dashboard-links">
              <Link to="/learn" className="hero-btn">Learn More</Link>
              <Link to="/team" className="hero-btn">Meet Team</Link>
              <Link to="/projects" className="hero-btn">Explore Projects</Link>
            </div>
          </article>

          <article className="public-dashboard-panel">
            <h3>Team Overview</h3>
            <ul>
              {teamMembers.slice(0, 3).map((member) => (
                <li key={member._id || `${member.name}-${member.role}`}>
                  <strong>{member.name}</strong> - {member.role}
                </li>
              ))}
            </ul>
          </article>

          <article className="public-dashboard-panel">
            <h3>Settings</h3>
            <p>
              Users can switch between light and dark mode using the theme button in the top navigation bar.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Home;
