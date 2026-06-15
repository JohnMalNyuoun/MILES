import React from 'react';
import { Link } from 'react-router-dom';

const modules = [
  {
    code: '01',
    title: 'Digital Foundations',
    covers: 'Basic computer operation, typing, and managing files.',
    outcome: 'Overcoming the fear of technology and getting comfortable with hardware.',
  },
  {
    code: '02',
    title: 'Connected & Safe',
    covers: 'Navigating the internet, using email, and practicing online safety and privacy.',
    outcome: 'Ability to search for information safely and communicate professionally.',
  },
  {
    code: '03',
    title: 'Tools for Growth',
    covers: 'Introduction to word processing, spreadsheets, and basic digital presentation tools.',
    outcome: 'Practical skills for schoolwork, business management, or future employment.',
  },
];

const approachPoints = [
  {
    title: 'Safe Environment',
    body: 'A supportive space where no question is too basic and every learner is met where they are.',
  },
  {
    title: 'Peer-to-Peer Mentorship',
    body: 'Guided learning where individuals progress at their own pace with direct, hands-on support.',
  },
  {
    title: 'Progress Tracking',
    body: 'Regular check-ins to monitor how comfortably participants are adopting new digital tools.',
  },
];

const kakumaReasons = [
  {
    title: 'A generation born into displacement',
    body: 'Most youth in Kakuma have grown up inside the camp with limited exposure to computers, smartphones, or the internet. Without digital skills, they are locked out of the modern economy before they ever get a chance to compete in it.',
  },
  {
    title: 'School alone is not enough',
    body: 'Classrooms here are overcrowded and under-resourced, and the national curriculum offers very little practical ICT training. Digital literacy fills that gap so learners can research, type assignments, and prepare for exams and scholarships on their own.',
  },
  {
    title: 'Online work is the new opportunity',
    body: 'Remote jobs, online freelancing, digital trade, and refugee-friendly platforms are some of the few income paths available inside the camp. None of them are reachable without basic computer, email, and internet skills.',
  },
  {
    title: 'Safety and dignity online',
    body: 'Young people, especially young women and mothers, are increasingly targeted by online scams, misinformation, and exploitation. Teaching safe internet use protects them and gives them confidence to participate online on their own terms.',
  },
  {
    title: 'A bridge to resettlement and higher education',
    body: 'Resettlement interviews, university applications, and scholarship portals (DAFI, WUSC, online universities) are all digital. Digital literacy is often the difference between a youth accessing those doors and missing them entirely.',
  },
  {
    title: 'Breaking the cycle for the next generation',
    body: 'When a young mother learns to use a computer, her children grow up around someone who already knows. Digital skills do not stay with one person &mdash; they spread through families and the wider Kakuma community.',
  },
];

function DigitalLiteracy() {
  return (
    <div className="page digital-literacy-page">
      <header className="digital-hero">
        <span className="digital-hero-eyebrow">Programme</span>
        <h1 className="digital-hero-title">Empowerment Through Digital Literacy</h1>
        <p className="digital-hero-subtitle">
          Bridging the gap by equipping young women and community members with the essential
          digital skills needed to thrive in a modern world.
        </p>
      </header>

      <section className="section">
        <h2>The Core Pillars</h2>
        <p>
          Our curriculum is broken into three focused modules so learners build confidence
          step-by-step &mdash; from switching on a computer to using it as a tool for school,
          business, and everyday independence.
        </p>

        <div className="digital-module-grid">
          {modules.map((module) => (
            <article key={module.code} className="digital-module-card">
              <span className="digital-module-code">{module.code}</span>
              <h3 className="digital-module-title">{module.title}</h3>
              <div className="digital-module-row">
                <span className="digital-module-label">What it covers</span>
                <p>{module.covers}</p>
              </div>
              <div className="digital-module-row">
                <span className="digital-module-label">Target outcome</span>
                <p>{module.outcome}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Our Approach: Mentorship &amp; Monitoring</h2>
        <p>
          Our strength is guidance, not just handing out resources. Every session is structured
          around how people actually learn new technology &mdash; together, patiently, and with
          someone to ask.
        </p>

        <div className="digital-approach-grid">
          {approachPoints.map((point) => (
            <div key={point.title} className="digital-approach-card">
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section digital-kakuma-section">
        <span className="digital-kakuma-eyebrow">The Reality in Kakuma</span>
        <h2>Why Digital Literacy for Youth in Kakuma?</h2>
        <p>
          Kakuma Refugee Camp is home to hundreds of thousands of young people whose futures are
          being shaped under exceptional pressure &mdash; limited resources, restricted movement,
          and a job market that has gone almost entirely online. Digital literacy is no longer a
          bonus skill here; it is a lifeline.
        </p>

        <div className="digital-kakuma-grid">
          {kakumaReasons.map((reason, index) => (
            <article key={reason.title} className="digital-kakuma-card">
              <span className="digital-kakuma-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{reason.title}</h3>
              <p>{reason.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Why It Matters</h2>
        <blockquote className="digital-quote">
          &ldquo;Learning how to navigate the internet and use basic software isn&rsquo;t just about
          computers &mdash; it&rsquo;s about independence, access to educational opportunities, and
          building a resilient future.&rdquo;
        </blockquote>
      </section>

      <section className="section digital-cta-section">
        <h2>Get Involved</h2>
        <div className="digital-cta-grid">
          <div className="digital-cta-card">
            <h3>For Participants</h3>
            <p>Want to join our next digital literacy session? Get in touch with our team to save a spot.</p>
            <Link to="/contact" className="digital-cta-button">Reserve a Spot</Link>
          </div>
          <div className="digital-cta-card">
            <h3>For Partners &amp; Volunteers</h3>
            <p>Interested in facilitating a session or supporting our digital literacy initiative? Contact us today.</p>
            <Link to="/contact" className="digital-cta-button digital-cta-button-outline">Partner With Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DigitalLiteracy;
