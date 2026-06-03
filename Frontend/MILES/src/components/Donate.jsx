import React from 'react';

function Donate() {
  return (
    <div className="page">
      <h1>Donate to MILES</h1>

      <section className="section donate-section">
        <p>
          MILES believes that education, mentorship, and community protection can change the future
          of a young mother and her child. Your support helps us strengthen school re-enrollment,
          academic retention, community mentorship, and practical care systems for vulnerable mothers
          in Kakuma.
        </p>

        <div className="donate-grid">
          <article className="donate-card">
            <h3>Support Education</h3>
            <p>
              Donations help with uniforms, textbooks, writing materials, sanitary supplies, and
              school re-entry support for girls and young mothers.
            </p>
          </article>

          <article className="donate-card">
            <h3>Strengthen Mentorship</h3>
            <p>
              Your contribution supports mentorship sessions on peer pressure, menstrual hygiene,
              early pregnancy prevention, and the role of brothers as allies.
            </p>
          </article>

          <article className="donate-card">
            <h3>Build Community Care</h3>
            <p>
              MILES coordinates shared childcare support, community advocacy, and local protection
              networks so young mothers can remain in school and thrive.
            </p>
          </article>
        </div>

        <div className="donate-highlight">
          <p>
            According to MILES, lasting change comes from collective action. Every donation becomes
            part of a community response that supports re-enrollment, retention, leadership, and
            dignity for young mothers, girls, and families.
          </p>
        </div>

        <p>
          Whether you support educational intervention, community representation, resource
          coordination, or mentorship, your donation helps turn structural barriers into practical
          pathways for growth.
        </p>

        <div className="donate-actions">
          <a className="hero-btn" href="mailto:milesproject@gmail.com?subject=Donate%20to%20MILES">
            Start a Donation Conversation
          </a>
          <a
            className="hero-btn"
            href="https://www.google.com/maps/search/?api=1&query=Kakuma+Refugee+Camp+Scorpion+Center"
            target="_blank"
            rel="noreferrer"
          >
            Visit MILES
          </a>
        </div>
      </section>
    </div>
  );
}

export default Donate;