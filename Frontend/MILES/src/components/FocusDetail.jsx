import React from 'react';
import { Link, useParams } from 'react-router-dom';

const content = {
  education: {
    title: 'MILES Project: Educational Intervention Framework',
    intro:
      'The Mothers in Learning Empowerment Support (MILES) Project treats education not just as an academic milestone, but as a critical mechanism for breaking generational poverty and restoring agency to young mothers.',
    summary:
      'When young women become mothers, they often face societal stigma, economic pressure, and limited childcare support, which can force them out of school. MILES responds through a three-phase educational framework: Identification, Institutional Re-integration, and Sustainable Retention.',
    sections: [
      {
        heading: '1. Case Identification and Active Enrollment',
        points: [
          'Community-Led Scouting: Using localized networks to identify vulnerable young mothers who want to return to school but face structural or financial barriers.',
          'Case Assessment: Evaluating each young mother\'s barriers, such as unpaid school fees, childcare gaps, or family resistance.',
          'Targeted Counseling: Providing mentorship that rebuilds confidence and helps young mothers see school return as realistic and achievable.',
        ],
      },
      {
        heading: '2. Institutional Advocacy and Structural Partnerships',
        points: [
          'Direct Institutional Liaison: Partnering with Jesuit Refugee Service (JRS), especially the Gender Responsive Education department, to report cases and support scholastic resources.',
          'School Integration Support: Working with local schools, including Vision Secondary School, to coordinate re-enrollment and student file transfer support.',
          'Policy and Schedule Accommodation: Advocating for flexible school approaches so nursing mothers and students handling infant health needs are not unfairly penalized academically.',
        ],
      },
      {
        heading: '3. Holistic Resource Coordination',
        points: [
          'Academic Provisions: Managing support requests for uniforms, textbooks, sanitary supplies, and writing materials.',
          'Childcare and Family Support: Building community awareness and shared care structures so young mothers can attend classes consistently.',
          'Mentorship and Social Alignment: Running workshops, including sessions with 45 young mothers, girls, and boys, to strengthen support for girls education at home and in the community.',
        ],
      },
      {
        heading: '4. Governance and Student Representation',
        points: [
          'Young Mothers Representative: A dedicated leadership role that ensures students\' lived experiences directly shape project strategy and advocacy responses in real time.',
        ],
      },
    ],
    closing:
      'Through this complete intervention loop, MILES helps transition young mothers from institutional displacement into active, supported, and thriving students.',
  },
  community: {
    title: 'MILES Community Collective Responsibility Framework',
    intro:
      'According to the core philosophy of MILES, a girl child or a young mother cannot succeed in isolation. Her challenges are often created or worsened by the surrounding community, so the community must also become the source of the solution.',
    summary:
      'MILES moves away from individual blame and toward a collective responsibility model where the community acts as both a protective shield and an economic support engine for young mothers and girls.',
    sections: [
      {
        heading: '1. The Role of the Community (The Foundation)',
        points: [
          'Destigmatization and Emotional Safety: Community members, elders, and peers must normalize school re-entry for young mothers and protect them from shame, harassment, and social exclusion.',
          'Shared Childcare Infrastructure: Families and neighbors need safe childcare networks during school hours so young mothers can remain in class consistently.',
          'Male Allyship and Household Support: Men and boys should help redistribute domestic workloads, protect girls from harassment, and treat girls education as equal to boys education.',
        ],
      },
      {
        heading: '2. Solving It Collectively: The MILES Framework',
        points: [
          'MILES coordinates collective action by synchronizing families, youth, schools, and institutions so support is not fragmented but strategic and sustained.',
        ],
      },
      {
        heading: 'A. Integrated Youth Allyship (Recent Milestone)',
        points: [
          'Through joint mentorship sessions with 45 young mothers, girls, and boys, MILES teaches boys and young men their structural role as active allies at home and in school.',
          'Collective Solution: Young men are equipped to act as protective brothers who defend girls right to education and challenge harassment in their communities.',
        ],
      },
      {
        heading: 'B. Strategic Institutional Partnerships',
        points: [
          'MILES links grassroots case data with institutional support systems such as Jesuit Refugee Service (JRS) Gender Responsive Education and partners like Madam Caro.',
          'Collective Solution: Verified community case reporting helps channel uniforms, books, sanitary supplies, and educational support to the most vulnerable students efficiently.',
        ],
      },
      {
        heading: 'C. Direct Representation in Governance',
        points: [
          'MILES keeps a dedicated Young Mothers Representative, such as Nyaluit Mabil, in leadership alongside founder Nyajuok William and the project coordinator.',
          'Collective Solution: Strategies are built with young mothers, not for young mothers, ensuring real-time response to emerging community barriers.',
        ],
      },
      {
        heading: 'Summary of the Collective Goal',
        points: [
          'From isolated stigma to collective celebration: a young mother returns to class with community support.',
          'From school dropout due to childcare gaps to shared family and neighborhood support that protects her study hours.',
          'From boys being detached from girls issues to young men becoming protective brothers and allies in their sisters educational journeys.',
        ],
      },
    ],
    closing:
      'By turning individual struggles into coordinated community action, MILES works to dismantle structural barriers and secure long-term educational success for young mothers and girls.',
  },
  mentorship: {
    title: 'Mentorship Program Details',
    intro:
      'MILES mentorship sessions provide practical life guidance around education, protection, wellbeing, and confidence for young mothers and youth.',
    points: [
      'Mentorship on peer pressure, menstrual hygiene, and early pregnancy prevention.',
      'Guidance for boys and brothers on positive support roles for girls.',
      'Gradual follow-up sessions to sustain long-term behavior change.',
    ],
  },
};

function FocusDetail() {
  const { topic } = useParams();
  const selected = content[topic] || content.education;

  return (
    <div className="page">
      <h1>{selected.title}</h1>
      <section className="section focus-detail">
        <p>{selected.intro}</p>

        {selected.summary && <p>{selected.summary}</p>}

        {selected.sections?.map((section) => (
          <div key={section.heading}>
            <h3>{section.heading}</h3>
            <ul>
              {section.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}

        {selected.points?.length > 0 && (
          <ul>
            {selected.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        )}

        {selected.closing && <p>{selected.closing}</p>}

        <Link className="hero-btn" to="/">Back to Home</Link>
      </section>
    </div>
  );
}

export default FocusDetail;