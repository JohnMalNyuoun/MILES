import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import defaultSiteContent from '../content/defaultSiteContent';

const getApiBaseUrl = () => import.meta.env.VITE_API_BASE_URL || '';

const SECTION_CARDS = [
  {
    key: 'create-admin',
    title: 'Create Admin Account',
    description: 'Add another admin user with full dashboard access.',
    badge: 'AD',
  },
  {
    key: 'create-project',
    title: 'Add Project',
    description: 'Create and publish a new project record.',
    badge: 'PR',
  },
  {
    key: 'create-team',
    title: 'Add Team Member',
    description: 'Register a new member profile for the team page.',
    badge: 'TM',
  },
  {
    key: 'manage-projects',
    title: 'Manage Projects',
    description: 'Edit or delete existing project entries.',
    badge: 'MP',
  },
  {
    key: 'manage-team',
    title: 'Manage Team Members',
    description: 'Edit or remove existing team member profiles.',
    badge: 'MT',
  },
  {
    key: 'manage-content',
    title: 'Manage Website Content',
    description: 'Update cards, texts, and buttons across the website.',
    badge: 'WC',
  },
];

function AdminDashboard() {
  const apiBaseUrl = useMemo(() => getApiBaseUrl(), []);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const allowedSections = useMemo(
    () => SECTION_CARDS.map((section) => section.key),
    []
  );
  const activeSectionParam = searchParams.get('section');
  const activeSection = allowedSections.includes(activeSectionParam)
    ? activeSectionParam
    : '';
  const [token] = useState(localStorage.getItem('adminToken') || '');
  const [user] = useState(() => {
    const persistedUser = localStorage.getItem('adminUser');
    return persistedUser ? JSON.parse(persistedUser) : null;
  });
  const [dashboard, setDashboard] = useState(null);
  const [projects, setProjects] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    techStack: '',
    liveUrl: '',
    repoUrl: '',
  });
  const [teamForm, setTeamForm] = useState({
    name: '',
    role: '',
    bio: '',
    image: '',
  });
  const [adminForm, setAdminForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [editingProjectId, setEditingProjectId] = useState('');
  const [editingProjectForm, setEditingProjectForm] = useState({
    title: '',
    description: '',
    techStack: '',
    liveUrl: '',
    repoUrl: '',
  });
  const [editingTeamId, setEditingTeamId] = useState('');
  const [editingTeamForm, setEditingTeamForm] = useState({
    name: '',
    role: '',
    bio: '',
    image: '',
  });
  const [siteContentText, setSiteContentText] = useState(
    JSON.stringify(defaultSiteContent, null, 2)
  );
  const [siteContentUpdatedAt, setSiteContentUpdatedAt] = useState('');

  const isAdmin = user?.role === 'admin';

  const authHeaders = useMemo(
    () => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
    [token]
  );

  const clearStatus = () => {
    setMessage('');
    setError('');
  };

  const fetchPublicLists = async () => {
    const [projectsResponse, teamResponse] = await Promise.all([
      fetch(`${apiBaseUrl}/api/projects`),
      fetch(`${apiBaseUrl}/api/team`),
    ]);

    if (!projectsResponse.ok || !teamResponse.ok) {
      throw new Error('Unable to fetch records');
    }

    const [projectData, teamData] = await Promise.all([
      projectsResponse.json(),
      teamResponse.json(),
    ]);

    setProjects(projectData);
    setTeam(teamData);
  };

  const fetchDashboard = async () => {
    if (!token) return;

    const response = await fetch(`${apiBaseUrl}/api/admin/dashboard`, {
      headers: authHeaders,
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error('Your session is not authorized for admin actions.');
      }
      throw new Error('Failed to load dashboard data.');
    }

    const data = await response.json();
    setDashboard(data);
  };

  const fetchAdminSiteContent = async () => {
    if (!token) return;

    const response = await fetch(`${apiBaseUrl}/api/admin/content`, {
      headers: authHeaders,
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error('Your session is not authorized for content actions.');
      }
      throw new Error('Failed to load website content.');
    }

    const data = await response.json();
    setSiteContentText(JSON.stringify(data.content || defaultSiteContent, null, 2));
    setSiteContentUpdatedAt(data.updatedAt || '');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin-login', { replace: true });
  };

  const beginProjectEdit = (project) => {
    setEditingProjectId(project._id);
    setEditingProjectForm({
      title: project.title || '',
      description: project.description || '',
      techStack: (project.techStack || []).join(', '),
      liveUrl: project.liveUrl || '',
      repoUrl: project.repoUrl || '',
    });
  };

  const beginTeamEdit = (member) => {
    setEditingTeamId(member._id);
    setEditingTeamForm({
      name: member.name || '',
      role: member.role || '',
      bio: member.bio || '',
      image: member.image || '',
    });
  };

  const handleCreateProject = async (event) => {
    event.preventDefault();
    clearStatus();

    if (!projectForm.title || !projectForm.description) {
      setError('Project title and description are required.');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...projectForm,
        techStack: projectForm.techStack
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
      };

      const response = await fetch(`${apiBaseUrl}/api/projects`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to create project.');
      }

      setProjectForm({
        title: '',
        description: '',
        techStack: '',
        liveUrl: '',
        repoUrl: '',
      });
      setMessage('Project created successfully.');
      await Promise.all([fetchDashboard(), fetchPublicLists()]);
    } catch (err) {
      setError(err.message || 'Unable to create project.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeamMember = async (event) => {
    event.preventDefault();
    clearStatus();

    if (!teamForm.name || !teamForm.role) {
      setError('Team member name and role are required.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${apiBaseUrl}/api/team`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(teamForm),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to create team member.');
      }

      setTeamForm({
        name: '',
        role: '',
        bio: '',
        image: '',
      });
      setMessage('Team member created successfully.');
      await Promise.all([fetchDashboard(), fetchPublicLists()]);
    } catch (err) {
      setError(err.message || 'Unable to create team member.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (event) => {
    event.preventDefault();
    clearStatus();

    if (!adminForm.name || !adminForm.email || !adminForm.password) {
      setError('Admin name, email and password are required.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${apiBaseUrl}/api/admin/users/admin`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(adminForm),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to create admin account.');
      }

      setAdminForm({
        name: '',
        email: '',
        password: '',
      });
      setMessage('Admin account created successfully.');
      await fetchDashboard();
    } catch (err) {
      setError(err.message || 'Unable to create admin account.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    clearStatus();

    try {
      setLoading(true);
      const response = await fetch(`${apiBaseUrl}/api/projects/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to delete project.');
      }

      setMessage('Project deleted successfully.');
      await Promise.all([fetchDashboard(), fetchPublicLists()]);
    } catch (err) {
      setError(err.message || 'Unable to delete project.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProject = async (event) => {
    event.preventDefault();
    clearStatus();

    if (!editingProjectForm.title || !editingProjectForm.description) {
      setError('Project title and description are required.');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...editingProjectForm,
        techStack: editingProjectForm.techStack
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
      };

      const response = await fetch(`${apiBaseUrl}/api/projects/${editingProjectId}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to update project.');
      }

      setEditingProjectId('');
      setMessage('Project updated successfully.');
      await Promise.all([fetchDashboard(), fetchPublicLists()]);
    } catch (err) {
      setError(err.message || 'Unable to update project.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTeam = async (id) => {
    clearStatus();

    try {
      setLoading(true);
      const response = await fetch(`${apiBaseUrl}/api/team/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to delete team member.');
      }

      setMessage('Team member deleted successfully.');
      await Promise.all([fetchDashboard(), fetchPublicLists()]);
    } catch (err) {
      setError(err.message || 'Unable to delete team member.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTeam = async (event) => {
    event.preventDefault();
    clearStatus();

    if (!editingTeamForm.name || !editingTeamForm.role) {
      setError('Team member name and role are required.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${apiBaseUrl}/api/team/${editingTeamId}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(editingTeamForm),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to update team member.');
      }

      setEditingTeamId('');
      setMessage('Team member updated successfully.');
      await Promise.all([fetchDashboard(), fetchPublicLists()]);
    } catch (err) {
      setError(err.message || 'Unable to update team member.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSiteContent = async (event) => {
    event.preventDefault();
    clearStatus();

    let parsedContent;
    try {
      parsedContent = JSON.parse(siteContentText);
    } catch (parseError) {
      setError('Website content must be valid JSON before saving.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${apiBaseUrl}/api/admin/content`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(parsedContent),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to save website content.');
      }

      setSiteContentText(JSON.stringify(data.content || parsedContent, null, 2));
      setSiteContentUpdatedAt(data.updatedAt || '');
      setMessage('Website content updated successfully.');
    } catch (err) {
      setError(err.message || 'Unable to save website content.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      if (!token || !isAdmin) return;

      try {
        setLoading(true);
        await Promise.all([fetchDashboard(), fetchPublicLists()]);
        await fetchAdminSiteContent();
      } catch (err) {
        setError(err.message || 'Unable to initialize dashboard.');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [token, isAdmin]);

  useEffect(() => {
    if (activeSectionParam && !allowedSections.includes(activeSectionParam)) {
      setSearchParams({}, { replace: true });
    }
  }, [activeSectionParam, allowedSections, setSearchParams]);

  const handleSectionChange = (sectionKey) => {
    setSearchParams({ section: sectionKey });
  };

  return (
    <section className="admin-page">
      <header className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome, {user?.name}. Backend is handling all writes to the database.</p>
        </div>
      </header>

      {loading && <p className="admin-loading">Syncing with backend...</p>}
      {error && <p className="admin-alert admin-alert-error">{error}</p>}
      {message && <p className="admin-alert admin-alert-success">{message}</p>}

      <div className="admin-stats-grid">
        <article className="admin-stat-card">
          <h3>Projects</h3>
          <p>{dashboard?.stats?.projectCount ?? 0}</p>
        </article>
        <article className="admin-stat-card">
          <h3>Team Members</h3>
          <p>{dashboard?.stats?.teamCount ?? 0}</p>
        </article>
        <article className="admin-stat-card">
          <h3>Users</h3>
          <p>{dashboard?.stats?.userCount ?? 0}</p>
        </article>
      </div>

      <div className="admin-section-picker">
        {SECTION_CARDS.map((section) => (
          <button
            key={section.key}
            type="button"
            className={`admin-section-card ${activeSection === section.key ? 'active' : ''}`}
            onClick={() => handleSectionChange(section.key)}
          >
            <span className="admin-section-badge">{section.badge}</span>
            <span className="admin-section-title">{section.title}</span>
            <span className="admin-section-description">{section.description}</span>
          </button>
        ))}
      </div>

      <div className="admin-panel-wrap">
        {!activeSection && (
          <article className="admin-card admin-panel-card">
            <h2>Select A Section</h2>
            <p className="admin-panel-hint">
              Click any section card above to open its form or management tools.
            </p>
          </article>
        )}

        {activeSection === 'create-admin' && (
          <article className="admin-card admin-panel-card">
            <h2>Create Admin Account</h2>
            <form onSubmit={handleCreateAdmin} className="admin-form">
              <label>
                Name
                <input
                  value={adminForm.name}
                  onChange={(event) =>
                    setAdminForm((current) => ({ ...current, name: event.target.value }))
                  }
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  value={adminForm.email}
                  onChange={(event) =>
                    setAdminForm((current) => ({ ...current, email: event.target.value }))
                  }
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  value={adminForm.password}
                  onChange={(event) =>
                    setAdminForm((current) => ({ ...current, password: event.target.value }))
                  }
                />
              </label>

              <button type="submit" disabled={loading}>Create Admin</button>
            </form>
          </article>
        )}

        {activeSection === 'create-project' && (
          <article className="admin-card admin-panel-card">
            <h2>Add Project</h2>
            <form onSubmit={handleCreateProject} className="admin-form">
              <label>
                Title
                <input
                  value={projectForm.title}
                  onChange={(event) =>
                    setProjectForm((current) => ({ ...current, title: event.target.value }))
                  }
                />
              </label>

              <label>
                Description
                <textarea
                  value={projectForm.description}
                  onChange={(event) =>
                    setProjectForm((current) => ({ ...current, description: event.target.value }))
                  }
                />
              </label>

              <label>
                Tech Stack (comma separated)
                <input
                  value={projectForm.techStack}
                  onChange={(event) =>
                    setProjectForm((current) => ({ ...current, techStack: event.target.value }))
                  }
                  placeholder="React, Node.js, MongoDB"
                />
              </label>

              <label>
                Live URL
                <input
                  value={projectForm.liveUrl}
                  onChange={(event) =>
                    setProjectForm((current) => ({ ...current, liveUrl: event.target.value }))
                  }
                />
              </label>

              <label>
                Repo URL
                <input
                  value={projectForm.repoUrl}
                  onChange={(event) =>
                    setProjectForm((current) => ({ ...current, repoUrl: event.target.value }))
                  }
                />
              </label>

              <button type="submit" disabled={loading}>Create Project</button>
            </form>
          </article>
        )}

        {activeSection === 'create-team' && (
          <article className="admin-card admin-panel-card">
            <h2>Add Team Member</h2>
            <form onSubmit={handleCreateTeamMember} className="admin-form">
              <label>
                Name
                <input
                  value={teamForm.name}
                  onChange={(event) =>
                    setTeamForm((current) => ({ ...current, name: event.target.value }))
                  }
                />
              </label>

              <label>
                Role
                <input
                  value={teamForm.role}
                  onChange={(event) =>
                    setTeamForm((current) => ({ ...current, role: event.target.value }))
                  }
                />
              </label>

              <label>
                Bio
                <textarea
                  value={teamForm.bio}
                  onChange={(event) =>
                    setTeamForm((current) => ({ ...current, bio: event.target.value }))
                  }
                />
              </label>

              <label>
                Image Filename
                <input
                  value={teamForm.image}
                  onChange={(event) =>
                    setTeamForm((current) => ({ ...current, image: event.target.value }))
                  }
                  placeholder="Nyajuok.jpeg"
                />
              </label>

              <button type="submit" disabled={loading}>Create Team Member</button>
            </form>
          </article>
        )}

        {activeSection === 'manage-projects' && (
          <article className="admin-card admin-panel-card">
            <h2>Manage Projects</h2>
            <ul className="admin-list">
              {projects.map((project) => (
                <li key={project._id}>
                  {editingProjectId === project._id ? (
                    <form onSubmit={handleUpdateProject} className="admin-form admin-inline-form">
                      <label>
                        Title
                        <input
                          value={editingProjectForm.title}
                          onChange={(event) =>
                            setEditingProjectForm((current) => ({ ...current, title: event.target.value }))
                          }
                        />
                      </label>
                      <label>
                        Description
                        <textarea
                          value={editingProjectForm.description}
                          onChange={(event) =>
                            setEditingProjectForm((current) => ({ ...current, description: event.target.value }))
                          }
                        />
                      </label>
                      <label>
                        Tech Stack
                        <input
                          value={editingProjectForm.techStack}
                          onChange={(event) =>
                            setEditingProjectForm((current) => ({ ...current, techStack: event.target.value }))
                          }
                        />
                      </label>
                      <div className="admin-row-actions">
                        <button type="submit" disabled={loading}>Save</button>
                        <button
                          type="button"
                          className="admin-secondary-btn"
                          onClick={() => setEditingProjectId('')}
                          disabled={loading}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div>
                        <strong>{project.title}</strong>
                        <p>{project.description}</p>
                      </div>
                      <div className="admin-row-actions">
                        <button
                          type="button"
                          className="admin-secondary-btn"
                          onClick={() => beginProjectEdit(project)}
                          disabled={loading}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(project._id)}
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </article>
        )}

        {activeSection === 'manage-team' && (
          <article className="admin-card admin-panel-card">
            <h2>Manage Team Members</h2>
            <ul className="admin-list">
              {team.map((member) => (
                <li key={member._id}>
                  {editingTeamId === member._id ? (
                    <form onSubmit={handleUpdateTeam} className="admin-form admin-inline-form">
                      <label>
                        Name
                        <input
                          value={editingTeamForm.name}
                          onChange={(event) =>
                            setEditingTeamForm((current) => ({ ...current, name: event.target.value }))
                          }
                        />
                      </label>
                      <label>
                        Role
                        <input
                          value={editingTeamForm.role}
                          onChange={(event) =>
                            setEditingTeamForm((current) => ({ ...current, role: event.target.value }))
                          }
                        />
                      </label>
                      <label>
                        Bio
                        <textarea
                          value={editingTeamForm.bio}
                          onChange={(event) =>
                            setEditingTeamForm((current) => ({ ...current, bio: event.target.value }))
                          }
                        />
                      </label>
                      <div className="admin-row-actions">
                        <button type="submit" disabled={loading}>Save</button>
                        <button
                          type="button"
                          className="admin-secondary-btn"
                          onClick={() => setEditingTeamId('')}
                          disabled={loading}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div>
                        <strong>{member.name}</strong>
                        <p>{member.role}</p>
                      </div>
                      <div className="admin-row-actions">
                        <button
                          type="button"
                          className="admin-secondary-btn"
                          onClick={() => beginTeamEdit(member)}
                          disabled={loading}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteTeam(member._id)}
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </article>
        )}

        {activeSection === 'manage-content' && (
          <article className="admin-card admin-panel-card">
            <h2>Manage Website Content</h2>
            <p className="admin-panel-hint">
              Update homepage cards, button labels, and section texts here. Save to publish changes without coding.
            </p>
            {siteContentUpdatedAt && (
              <p className="admin-panel-hint">
                Last updated: {new Date(siteContentUpdatedAt).toLocaleString()}
              </p>
            )}
            <form onSubmit={handleSaveSiteContent} className="admin-form">
              <label>
                Website Content JSON
                <textarea
                  value={siteContentText}
                  onChange={(event) => setSiteContentText(event.target.value)}
                  rows={24}
                />
              </label>
              <button type="submit" disabled={loading}>Save Website Content</button>
            </form>
          </article>
        )}
      </div>

      <div className="admin-footer-actions">
        <button type="button" className="admin-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </section>
  );
}

export default AdminDashboard;
