import React, { useEffect, useState } from 'react';
import ImpactEventCard from './ImpactEventCard';
import aprilSessionsPre from '../assets/April sessions pre.jpg';
import duringApril from '../assets/During the april.jpg';
import youngMothersPhoto from '../assets/Youngmothers.jpg';
import greVisitPhoto from '../assets/GRE visit.jpg';

const ongoingActivity = {
  title: 'Ongoing Mentorship Activity (Started in April)',
  description:
    'MILES began these mentorship sessions in April for young mothers, girls, and boys, and the activity continues gradually through follow-up discussions and support circles.',
  topicFocus:
    'Mentorship on girl-child challenges and the supportive role of brothers',
  sessionSummary:
    'April launch: 3 sessions with 15 participants per session (45 total). Continuing gradually with ongoing community sessions.',
  totalParticipants: 45,
  participants: {
    youngMothers: 15,
    girls: 20,
    boys: 10,
  },
  topics: [
    'Effects of peer pressure',
    'Menstrual hygiene',
    'Early pregnancies and early marriage',
    'Gender equality among youth',
  ],
  benefits: [
    'Helps youth resist harmful peer influence through stronger confidence and critical thinking.',
    'Improves menstrual hygiene awareness, supporting better health, dignity, and school participation for girls.',
    'Builds awareness on preventing early pregnancies and early marriage, helping protect education goals.',
    'Promotes gender equality attitudes and respectful behavior among girls and boys.',
    'Encourages boys and brothers to actively support girls safety, education, and wellbeing.',
  ],
  photos: [
    {
      src: aprilSessionsPre,
      alt: 'MILES participants before an April mentorship session',
      caption: 'Opening moment from the April mentorship sessions.',
    },
    {
      src: duringApril,
      alt: 'Participants during April mentorship activities',
      caption: 'Group engagement during mentorship discussions.',
    },
    {
      src: youngMothersPhoto,
      alt: 'Young mothers taking part in MILES activities',
      caption: 'Young mothers participating in guided sessions.',
    },
  ],
  visitor: {
    image: greVisitPhoto,
    alt: 'GRE visit by Madam Caro in Kakuma',
    description:
      'We also received visitors from GRE, including Madam Caro from Gender Responsive Education, working with JRS in Kakuma, who strengthened our mentorship collaboration.',
  },
  mentorCount: 6,
  location: 'Scorpion Community Centre, Kakuma Refugee Camp',
};

const buildFacebookEmbedUrl = (postUrl) => `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(postUrl)}&show_text=true&width=500`;

function Projects() {
  const [projects, setProjects] = useState([]);
  const [workshopPosts, setWorkshopPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
        const response = await fetch(`${apiBaseUrl}/api/projects`);

        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const data = await response.json();
        setProjects(data);

        const postsResponse = await fetch(`${apiBaseUrl}/api/workshop-posts`);
        if (postsResponse.ok) {
          const postData = await postsResponse.json();
          setWorkshopPosts(Array.isArray(postData) ? postData : []);
        } else {
          setWorkshopPosts([]);
        }
      } catch (err) {
        setError('Unable to load projects right now.');
        setWorkshopPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="projects-section">
        <h1>Our Projects</h1>
        <p className="projects-subtitle">Loading projects...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="projects-section">
        <h1>Our Projects</h1>
        <p className="projects-subtitle">{error}</p>
      </section>
    );
  }

  return (
    <section className="projects-section">
      <h1>Our Projects</h1>
      <p className="projects-subtitle">Real community work powered by MILES.</p>

      <section className="projects-activity-section">
        <h2 className="projects-activity-title">Ongoing Activity</h2>
        <p className="projects-activity-subtitle">
          This mentorship activity is continuing gradually with recurring sessions and community follow-ups.
        </p>
        <ImpactEventCard event={ongoingActivity} />
      </section>

      <section className="projects-video-section">
        <h2 className="projects-activity-title">Featured Facebook Posts</h2>
        <p className="projects-activity-subtitle">
          View the Facebook posts directly inside the MILES site.
        </p>
        <div className="projects-posts-grid">
          {workshopPosts.map((post, index) => (
            <article key={post._id || post.postUrl || post.url || `post-${index}`} className="projects-post-card">
              <h3>{post.title || 'Workshop update from the field'}</h3>
              <p className="projects-post-summary">
                {post.summary || post.details || 'A community update shared from the workshop feed.'}
              </p>
              <div className="projects-video-embed">
                <iframe
                  title={post.title || `Workshop post ${index + 1}`}
                  src={buildFacebookEmbedUrl(post.postUrl || post.url)}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      {projects.length === 0 ? (
        <p className="projects-subtitle">No projects available yet. Add projects in the backend database.</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project._id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              {project.techStack?.length > 0 && (
                <div className="project-tags">
                  {project.techStack.map((tech) => (
                    <span key={`${project._id}-${tech}`} className="project-tag">{tech}</span>
                  ))}
                </div>
              )}

              <div className="project-links">
                {project.liveUrl && (
                  <a className="project-link" href={project.liveUrl} target="_blank" rel="noreferrer">Live Demo</a>
                )}
                {project.repoUrl && (
                  <a className="project-link" href={project.repoUrl} target="_blank" rel="noreferrer">Source Code</a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Projects;