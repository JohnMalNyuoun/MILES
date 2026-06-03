import React, { useEffect, useState } from 'react';
import defaultSiteContent from '../content/defaultSiteContent';

function Learn({ siteContent = defaultSiteContent }) {
  const [teamMembers, setTeamMembers] = useState([]);
  const learnContent = siteContent.learn || defaultSiteContent.learn;

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
        const response = await fetch(`${apiBaseUrl}/api/team`);

        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }

        const data = await response.json();
        setTeamMembers(data);
      } catch (error) {
        setTeamMembers([]);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="page">
      <h1>{learnContent.title}</h1>
      <section className="section">
        <p>
          Welcome to the <strong>Mothers in Learning Empowerment Support (MILES)</strong> Project.
          MILES is a local community empowerment initiative designed to break down economic and
          social barriers for young mothers, providing the resources, skills, and support network
          needed to rebuild their lives and thrive.
        </p>
        <p>
          Our work focuses on <strong>community-led social impact, education, and direct mentorship</strong>.
          Through structured educational pathways and practical support systems, MILES empowers young
          mothers to gain independence, reclaim their education, and secure sustainable futures for
          themselves and their children.
        </p>
      </section>

      <section className="section">
        <h2>Core Focus Areas and Initiatives</h2>

        <h3>1. Educational Re-Enrollment and Academic Advocacy</h3>
        <p>
          Many young mothers face sudden disruption to their academic journeys due to limited
          institutional support or childcare options. MILES acts as a direct liaison with local
          educational institutions and partner organizations, including the <strong>Jesuit Refugee Service (JRS)
          Gender Responsive Education department</strong>, to facilitate re-enrollment and help young mothers
          return to secondary school and complete their education.
        </p>

        <h3>2. Leadership and Community Representation</h3>
        <p>
          Effective advocacy must be led by the community it serves. MILES maintains a dedicated
          <strong> Young Mothers Representative</strong> on its leadership team to ensure lived experiences,
          immediate safety concerns, and academic needs directly shape policy and program design.
        </p>

        <h3>3. Integrated Resource Coordination</h3>
        <p>
          Education requires more than classroom access. MILES coordinates targeted resource requests
          for learning materials, academic provisions, and childcare flexibility, reducing the burden
          of balancing maternal responsibilities with school goals.
        </p>
      </section>

      <section className="section">
        <h2>Leadership and Vision</h2>
        <p>
          The foundations of MILES rely on collaborative leadership working directly on the ground:
        </p>
        <ul>
          {teamMembers.length > 0 ? (
            teamMembers.map((member) => (
              <li key={member._id || `${member.name}-${member.role}`}>
                <strong>{member.role}:</strong> {member.name}
              </li>
            ))
          ) : (
            <li>
              <strong>Team:</strong> Full team details are available on the Team page.
            </li>
          )}
        </ul>
        <p>
          By bridging local talent, humanitarian education services, and community-led mentorship,
          MILES transforms institutional barriers into clear pathways for generational growth.
        </p>
        <p>
          For further clarification and updates, visit our Facebook page:{' '}
          <a
            href="https://www.facebook.com/profile.php?id=61585890535950"
            target="_blank"
            rel="noreferrer"
          >
            MILES Facebook
          </a>
          .
        </p>
      </section>
    </div>
  );
}

export default Learn;
