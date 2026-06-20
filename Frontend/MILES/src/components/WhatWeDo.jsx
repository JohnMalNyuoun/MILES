import React, { useMemo, useState } from 'react';
import Projects from './Projects';
import Workshops from './Workshops';
import DigitalLiteracy from './DigitalLiteracy';

const activityOptions = [
  {
    key: 'projects',
    label: 'Projects',
    description: 'Community projects and ongoing field activities.',
  },
  {
    key: 'mentorship',
    label: 'Mentorship',
    description: 'Workshop sessions, follow-ups, and mentorship records.',
  },
  {
    key: 'digital-literacy',
    label: 'Digital Literacy',
    description: 'Digital skills training and learning pathways for youth.',
  },
];

function WhatWeDo() {
  const [selectedOption, setSelectedOption] = useState('projects');

  const selectedContent = useMemo(() => {
    if (selectedOption === 'mentorship') {
      return <Workshops />;
    }

    if (selectedOption === 'digital-literacy') {
      return <DigitalLiteracy />;
    }

    return <Projects />;
  }, [selectedOption]);

  return (
    <div className="what-we-do-shell">
      <div className="page what-we-do-page">
        <h1>What We Do</h1>
        <p>
          Explore the full range of MILES activities in one place, from community projects and
          mentorship workshops to digital literacy training for youth in Kakuma.
        </p>

        <div className="what-we-do-options" role="tablist" aria-label="What MILES does">
          {activityOptions.map((option) => {
            const isSelected = option.key === selectedOption;

            return (
              <button
                key={option.key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`what-we-do-option${isSelected ? ' active' : ''}`}
                onClick={() => setSelectedOption(option.key)}
              >
                <span className="what-we-do-option-label">{option.label}</span>
                <span className="what-we-do-option-copy">{option.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedContent}
    </div>
  );
}

export default WhatWeDo;