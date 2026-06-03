import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page">
      <section className="section">
        <h2>Welcome to MILES</h2>
        <p>MILES is dedicated to uplifting mothers and girls by providing access to education, building strong community networks, and fostering mentorship opportunities that create lasting change.</p>
      </section>
      <section className="section features">
        <Link className="feature-link" to="/focus/education">
          <div className="feature-card">
            <h3>Education</h3>
            <p>Access learning resources and programs designed to help mothers continue their education journey.</p>
          </div>
        </Link>
        <Link className="feature-link" to="/focus/community">
          <div className="feature-card">
            <h3>Community</h3>
            <p>Join a supportive network of mothers who share experiences, advice, and encouragement.</p>
          </div>
        </Link>
        <Link className="feature-link" to="/focus/mentorship">
          <div className="feature-card">
            <h3>Mentorship</h3>
            <p>Connect with mentors who guide and inspire you to reach your full potential.</p>
          </div>
        </Link>
          <div>
         <Link className="hero-btn" to="/learn">Learn More</Link>
      </div>
      <div>
         <Link className="hero-btn" to="/team">Meet Our Team</Link>
      </div>
      <div>
        <Link className="hero-btn" to="/projects">Our Projects</Link>
      </div>
      <div>
        <Link className="hero-btn" to="/donate">Donate</Link>
      </div>
      </section>
    </div>
  );
}

export default Home;
