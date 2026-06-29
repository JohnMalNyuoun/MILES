import React from 'react';

const programCards = [
  {
    number: 'Program 1',
    title: 'MILES Ambassador Program - Peer-led mentorship',
    body: 'Girls and young mothers are trained as community advocates by women from within Kakuma who have navigated the same walls, not outside experts. Through mentorship, life skills, leadership, and reproductive health education, participants graduate as MILES Ambassadors and return to their communities to advocate for girls still facing the same struggles. Ambassadors who have dropped out of school have a direct pathway into the Scholarship Program.',
    metric: '20 participants per pilot cohort - 4 sessions',
  },
  {
    number: 'Program 2',
    title: 'Scholarship for School Dropouts - Getting back into class',
    body: 'We remove the financial barriers that stop young mothers from returning to school: fees, uniforms, materials, transport. Support is matched to need - full scholarships, partial scholarships, or education support grants for materials and sanitary supplies. The goal is the same in every case: remove the barrier so she can do what she was always going to do.',
    metric: '10 new girls supported per month - 60 annually',
  },
  {
    number: 'Program 3',
    title: 'DareTECH - Digital literacy for girls and young mothers',
    body: 'Refugee entrepreneurs in Kakuma show real creativity and business instinct, but the market inside the camp is small. DareTECH takes participants from basic computer literacy through to real, paid digital marketing and sales skills. They work with real businesses on real campaigns from day one. By the end, they can market a product, manage a brand\'s online presence, and earn independently - skills that do not depend on a market inside Kakuma at all.',
    metric: '20 youth per cohort - Digital Literacy pilot',
  },
  {
    number: 'Program 4',
    title: 'Community Involvement - Changing the attitudes around girls',
    body: 'A girl staying in school depends on the community around her. This program works with local leaders, parents, elders, boys, and men, not just girls, through mass awareness sessions on gender equality, gender-based violence, and early marriage and pregnancy. It is the part of our strategy that changes what everyone else believes is acceptable.',
    metric: '2 sessions per year - 45 community members per session',
  },
];

function WhatWeDo() {
  return (
    <div className="what-we-do-shell">
      <div className="page what-we-do-page what-we-do-full-page">
        <h1>What We Do</h1>

        <h2 className="what-we-do-tagline">
          We help girls stay in school, build confidence, and earn independently - on their own terms.
        </h2>
        <p>
          MILES works alongside young mothers and girls in Kakuma Refugee Camp. We run four
          connected programs that together address the full cycle of early pregnancy: preventing
          it, recovering from it, and building economic independence so it does not happen again.
        </p>

        <section className="what-we-do-stats" aria-label="Impact numbers">
          <article className="what-we-do-stat-card">
            <h3>45</h3>
            <p>Participants trained as ambassadors, April 2026</p>
          </article>
          <article className="what-we-do-stat-card">
            <h3>215+</h3>
            <p>Beneficiaries reached across all four programs</p>
          </article>
          <article className="what-we-do-stat-card">
            <h3>60</h3>
            <p>Girls supported back into school annually</p>
          </article>
        </section>

        <section className="what-we-do-story">
          <h2>A story from Kakuma</h2>
          <h3>Nyethak&apos;s story</h3>
          <p>
            Nyethak Manyang is 17. When she became pregnant, a community belief - that a pregnant
            girl should not continue her studies - became, in practice, the end of her education.
            Not because a law required it. Not because she lacked the will. Because there was no
            framework in place to say otherwise.
          </p>
          <p>
            What stood between Nyethak and her return to school was small: a uniform, school
            supplies, and a $30 registration fee. In April 2026, she came to a MILES Ambassador
            session, found the confidence to share what she had been through, and got exactly that
            support. Today, she is back in class. Her story is shared here with her informed
            consent.
          </p>
        </section>

        <section className="what-we-do-programs">
          <h2>Our programs</h2>
          <p>
            These four programs form one strategy. The Ambassador Program prevents new cases of
            early pregnancy. The Scholarship Program recovers girls who have dropped out. DareTECH
            builds independent income. Community Involvement shifts the attitudes that make any of
            this necessary in the first place.
          </p>

          <div className="what-we-do-program-grid">
            {programCards.map((program) => (
              <article key={program.number} className="what-we-do-program-card">
                <span className="what-we-do-program-number">{program.number}</span>
                <h3>{program.title}</h3>
                <p>{program.body}</p>
                <p className="what-we-do-program-metric">{program.metric}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="what-we-do-partner">
          <h2>Partner with MILES</h2>
          <p>
            Contact Nyajuok Deng, Founder -
            {' '}
            <a href="mailto:dengnyajok7@gmail.com">dengnyajok7@gmail.com</a>
            {' '}
            -
            {' '}
            <a href="tel:+254746646602">+254 746 646 602</a>
          </p>
          <p>
            <a href="/" className="what-we-do-visit-link">Visit our website</a>
          </p>
        </section>
      </div>
    </div>
  );
}

export default WhatWeDo;