import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const programCards = [
  {
    number: 'Program 1',
    title: 'Ambassadors Program - Peer-led mentorship',
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

const toProgramId = (programNumber) => `program-${programNumber.replace('Program ', '').trim()}`;

const viewToProgramNumber = {
  'program-1': 'Program 1',
  'program-2': 'Program 2',
  'program-3': 'Program 3',
  'program-4': 'Program 4',
  daretech: 'Program 3',
};

const normalizeProgramView = (view) => (view && viewToProgramNumber[view] ? view : 'program-1');

const programViewLinks = [
  { view: 'program-1', label: 'Ambassadors Program' },
  { view: 'program-2', label: 'Scholarship Program' },
  { view: 'program-3', label: 'DareTECH' },
  { view: 'program-4', label: 'Community Involvement' },
];

function NMStoryBlock() {
  return (
    <section className="what-we-do-program-story" id="nm-story" aria-label="A story from Kakuma">
      <h4>A story from Kakuma</h4>
      <h5>N.M story</h5>
      <p>
        N.M is 17. When she became pregnant, a community belief - that a pregnant girl should not
        continue her studies - became, in practice, the end of her education. Not because a law
        required it. Not because she lacked the will. Because there was no framework in place to
        say otherwise.
      </p>
      <p>
        What stood between N.M and her return to school was small: a uniform, school supplies, and
        a $30 registration fee. In April 2026, she came to a MILES Ambassador session, found the
        confidence to share what she had been through, and got exactly that support. Today, she is
        back in class. Her story is shared here with her informed consent.
      </p>
    </section>
  );
}

function WhatWeDo() {
  const [searchParams] = useSearchParams();
  const requestedView = normalizeProgramView(searchParams.get('view'));
  const [programView, setProgramView] = useState(requestedView);
  const selectedProgramNumber = viewToProgramNumber[programView];
  const selectedProgram = programCards.find((program) => program.number === selectedProgramNumber) || null;

  useEffect(() => {
    setProgramView(requestedView);
  }, [requestedView]);

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

        <section className="what-we-do-programs">
          <h2>Our programs</h2>
          <div className="what-we-do-inline-nav" aria-label="Choose a program">
            {programViewLinks.map((item) => (
              <Link
                key={item.view}
                to={`/what-we-do?view=${item.view}`}
                className={`what-we-do-inline-link${programView === item.view ? ' active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          {selectedProgram ? (
            <article
              id={toProgramId(selectedProgram.number)}
              className="what-we-do-program-card"
            >
              <span className="what-we-do-program-number">{selectedProgram.number}</span>
              <h3>{selectedProgram.title}</h3>
              <p>{selectedProgram.body}</p>
              <p className="what-we-do-program-metric">{selectedProgram.metric}</p>
              {selectedProgram.number === 'Program 1' ? <NMStoryBlock /> : null}
            </article>
          ) : null}
        </section>

      </div>
    </div>
  );
}

export default WhatWeDo;