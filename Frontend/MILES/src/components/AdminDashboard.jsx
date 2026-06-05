import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import defaultSiteContent from '../content/defaultSiteContent';
import ApprovalQueue from './ApprovalQueue';

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
    key: 'manage-projects',
    title: 'Manage Projects',
    description: 'Edit or delete existing project entries.',
    badge: 'MP',
  },
  {
    key: 'manage-team',
    title: 'Manage Team',
    description: 'View, edit, and update team records.',
    badge: 'TM',
  },
  {
    key: 'workshop-schedule',
    title: 'Workshop Schedule Tracker',
    description: 'Plan upcoming workshops and track all activities in one place.',
    badge: 'WS',
  },
  {
    key: 'edit-hero',
    title: 'Edit Hero Section',
    description: 'Update hero title, subtitle, and description.',
    badge: 'HR',
  },
  {
    key: 'edit-home',
    title: 'Edit Home Section',
    description: 'Update welcome text, cards, and quick buttons.',
    badge: 'HM',
  },
  {
    key: 'edit-navbar',
    title: 'Edit Navigation',
    description: 'Update navbar labels and brand text.',
    badge: 'NB',
  },
  {
    key: 'edit-about',
    title: 'Edit About Section',
    description: 'Update About page text and mission points.',
    badge: 'AB',
  },
  {
    key: 'edit-contact',
    title: 'Edit Contact Section',
    description: 'Update contact details and map link.',
    badge: 'CT',
  },
  {
    key: 'edit-donate',
    title: 'Edit Donate Section',
    description: 'Update donation cards and action buttons.',
    badge: 'DN',
  },
  {
    key: 'edit-learn',
    title: 'Edit Learn Section',
    description: 'Update Learn More narratives in a dedicated form.',
    badge: 'LM',
  },
  {
    key: 'help-guide',
    title: 'Help & Guidance',
    description: 'How to use the dashboard and publish updates safely.',
    badge: 'HP',
  },
];

const buildHeroFormFromContent = (content) => {
  const hero = {
    ...defaultSiteContent.hero,
    ...(content?.hero || {}),
  };

  return {
    title: hero.title || '',
    subtitle: hero.subtitle || '',
    description: hero.description || '',
  };
};

const buildNavbarFormFromContent = (content) => {
  const navbar = {
    ...defaultSiteContent.navbar,
    ...(content?.navbar || {}),
  };

  return {
    brandText: navbar.brandText || '',
    homeLabel: navbar.homeLabel || '',
    aboutLabel: navbar.aboutLabel || '',
    projectsLabel: navbar.projectsLabel || '',
    donateLabel: navbar.donateLabel || '',
    contactLabel: navbar.contactLabel || '',
    adminLabel: navbar.adminLabel || '',
  };
};

const buildHomeFormFromContent = (content) => {
  const home = {
    ...defaultSiteContent.home,
    ...(content?.home || {}),
  };
  const featureCards = home.featureCards || defaultSiteContent.home.featureCards;
  const quickButtons = home.quickButtons || defaultSiteContent.home.quickButtons;

  return {
    welcomeTitle: home.welcomeTitle || '',
    welcomeText: home.welcomeText || '',
    featureOneTitle: featureCards[0]?.title || '',
    featureOneDescription: featureCards[0]?.description || '',
    featureOnePath: featureCards[0]?.path || '',
    featureTwoTitle: featureCards[1]?.title || '',
    featureTwoDescription: featureCards[1]?.description || '',
    featureTwoPath: featureCards[1]?.path || '',
    featureThreeTitle: featureCards[2]?.title || '',
    featureThreeDescription: featureCards[2]?.description || '',
    featureThreePath: featureCards[2]?.path || '',
    buttonOneLabel: quickButtons[0]?.label || '',
    buttonOnePath: quickButtons[0]?.path || '',
    buttonTwoLabel: quickButtons[1]?.label || '',
    buttonTwoPath: quickButtons[1]?.path || '',
    buttonThreeLabel: quickButtons[2]?.label || '',
    buttonThreePath: quickButtons[2]?.path || '',
    buttonFourLabel: quickButtons[3]?.label || '',
    buttonFourPath: quickButtons[3]?.path || '',
  };
};

const buildAboutFormFromContent = (content) => {
  const about = {
    ...defaultSiteContent.about,
    ...(content?.about || {}),
  };
  const missionPoints = about.missionPoints || defaultSiteContent.about.missionPoints;

  return {
    title: about.title || '',
    introOne: about.introOne || '',
    introTwo: about.introTwo || '',
    missionTitle: about.missionTitle || '',
    missionText: about.missionText || '',
    missionPointOne: missionPoints[0] || '',
    missionPointTwo: missionPoints[1] || '',
    missionPointThree: missionPoints[2] || '',
  };
};

const buildContactFormFromContent = (content) => {
  const contact = {
    ...defaultSiteContent.contact,
    ...(content?.contact || {}),
  };

  return {
    title: contact.title || '',
    intro: contact.intro || '',
    email: contact.email || '',
    phone: contact.phone || '',
    address: contact.address || '',
    mapUrl: contact.mapUrl || '',
  };
};

const buildDonateFormFromContent = (content) => {
  const donate = {
    ...defaultSiteContent.donate,
    ...(content?.donate || {}),
  };
  const cards = donate.cards || defaultSiteContent.donate.cards;
  const actions = donate.actions || defaultSiteContent.donate.actions;

  return {
    title: donate.title || '',
    intro: donate.intro || '',
    cardOneTitle: cards[0]?.title || '',
    cardOneDescription: cards[0]?.description || '',
    cardTwoTitle: cards[1]?.title || '',
    cardTwoDescription: cards[1]?.description || '',
    cardThreeTitle: cards[2]?.title || '',
    cardThreeDescription: cards[2]?.description || '',
    highlight: donate.highlight || '',
    closing: donate.closing || '',
    actionOneLabel: actions[0]?.label || '',
    actionOneUrl: actions[0]?.url || '',
    actionOneExternal: actions[0]?.external !== false,
    actionTwoLabel: actions[1]?.label || '',
    actionTwoUrl: actions[1]?.url || '',
    actionTwoExternal: actions[1]?.external !== false,
  };
};

const buildLearnFormFromContent = (content) => {
  const learn = {
    ...defaultSiteContent.learn,
    ...(content?.learn || {}),
  };
  const focusAreas = learn.focusAreas || defaultSiteContent.learn.focusAreas;

  return {
    title: learn.title || '',
    amplifyingTitle: learn.amplifyingTitle || '',
    amplifyingIntro: learn.amplifyingIntro || '',
    amplifyingBridge: learn.amplifyingBridge || '',
    focusAreaOneTitle: focusAreas[0]?.title || '',
    focusAreaOneBody: focusAreas[0]?.body || '',
    focusAreaTwoTitle: focusAreas[1]?.title || '',
    focusAreaTwoBody: focusAreas[1]?.body || '',
    dignityTitle: learn.dignityTitle || '',
    dignityText: learn.dignityText || '',
  };
};

const buildWorkshopFormFromContent = (content) => {
  const workshops = {
    ...defaultSiteContent.workshops,
    ...(content?.workshops || {}),
  };
  const activities = workshops.activities || defaultSiteContent.workshops.activities;

  return {
    title: workshops.title || '',
    coordinator: workshops.coordinator || '',
    nextSessionDate: workshops.nextSessionDate || '',
    nextSessionTopic: workshops.nextSessionTopic || '',
    nextSessionLocation: workshops.nextSessionLocation || '',
    nextSessionFacilitator: workshops.nextSessionFacilitator || '',
    notes: workshops.notes || '',
    workshopSummary: workshops.workshopSummary || '',
    targetAudience: workshops.targetAudience || '',
    keyOutcomes: workshops.keyOutcomes || '',
    followUpActions: workshops.followUpActions || '',
    activityOneTitle: activities[0]?.title || '',
    activityOneDate: activities[0]?.date || '',
    activityOneLocation: activities[0]?.location || '',
    activityOneStatus: activities[0]?.status || 'Planned',
    activityOneDetails: activities[0]?.details || '',
    activityTwoTitle: activities[1]?.title || '',
    activityTwoDate: activities[1]?.date || '',
    activityTwoLocation: activities[1]?.location || '',
    activityTwoStatus: activities[1]?.status || 'Planned',
    activityTwoDetails: activities[1]?.details || '',
    activityThreeTitle: activities[2]?.title || '',
    activityThreeDate: activities[2]?.date || '',
    activityThreeLocation: activities[2]?.location || '',
    activityThreeStatus: activities[2]?.status || 'Planned',
    activityThreeDetails: activities[2]?.details || '',
  };
};

const emptyWorkshopPostForm = {
  title: '',
  postUrl: '',
  workshopDate: '',
  postedDate: '',
  summary: '',
  details: '',
};

const formatAdminDisplayName = (value) => {
  if (!value) return 'Admin User';

  const normalizedValue = String(value).trim();
  if (!normalizedValue) return 'Admin User';

  if (normalizedValue.toLowerCase() === 'nyajuokwilliam') {
    return 'Nyajuok William';
  }

  return normalizedValue
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();
};

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
  const activeSectionMeta = SECTION_CARDS.find((section) => section.key === activeSection) || null;
  const isWorkspaceView = Boolean(activeSectionMeta);
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
    videoUrl: '',
  });
  const [adminForm, setAdminForm] = useState({
    name: '',
    username: '',
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
    videoUrl: '',
  });
  const [siteContentObject, setSiteContentObject] = useState(defaultSiteContent);
  const [siteContentUpdatedAt, setSiteContentUpdatedAt] = useState('');
  const [workshopUpdatedAt, setWorkshopUpdatedAt] = useState('');
  const [recentWorkshopSchedules, setRecentWorkshopSchedules] = useState([]);
  const [workshopPosts, setWorkshopPosts] = useState([]);
  const [heroForm, setHeroForm] = useState(() => buildHeroFormFromContent(defaultSiteContent));
  const [homeForm, setHomeForm] = useState(() => buildHomeFormFromContent(defaultSiteContent));
  const [navbarForm, setNavbarForm] = useState(() => buildNavbarFormFromContent(defaultSiteContent));
  const [aboutForm, setAboutForm] = useState(() => buildAboutFormFromContent(defaultSiteContent));
  const [contactForm, setContactForm] = useState(() => buildContactFormFromContent(defaultSiteContent));
  const [donateForm, setDonateForm] = useState(() => buildDonateFormFromContent(defaultSiteContent));
  const [learnForm, setLearnForm] = useState(() => buildLearnFormFromContent(defaultSiteContent));
  const [workshopForm, setWorkshopForm] = useState(() => buildWorkshopFormFromContent(defaultSiteContent));
  const [newWorkshopPostForm, setNewWorkshopPostForm] = useState(() => ({ ...emptyWorkshopPostForm }));
  const [editingWorkshopPostForm, setEditingWorkshopPostForm] = useState(() => ({ ...emptyWorkshopPostForm }));
  const [editingWorkshopPostId, setEditingWorkshopPostId] = useState('');
  const workshopPostEditRef = useRef(null);
  const [dashboardSearch, setDashboardSearch] = useState('');
  const [activeOverviewPanel, setActiveOverviewPanel] = useState('activity');
  const [searchDrivenSection, setSearchDrivenSection] = useState('');

  const isAdmin = user?.role === 'admin';
  const adminDisplayName = useMemo(
    () => formatAdminDisplayName(user?.name || user?.username || 'Admin User'),
    [user]
  );

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

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const returnToDashboard = (panelKey = 'activity') => {
    setEditingProjectId('');
    setEditingTeamId('');
    setEditingWorkshopPostId('');
    setSearchParams({}, { replace: true });
    setActiveOverviewPanel(panelKey);
    scrollToTop();
  };

  const fetchPublicLists = async () => {
    const [projectsResponse, teamResponse] = await Promise.all([
      fetch(`${apiBaseUrl}/api/projects`),
      fetch(`${apiBaseUrl}/api/team?profile=team`),
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
    const normalizedContent = {
      ...defaultSiteContent,
      ...(data.content || {}),
      learn: {
        ...defaultSiteContent.learn,
        ...(data.content?.learn || {}),
      },
    };

    setSiteContentObject(normalizedContent);
    setHeroForm(buildHeroFormFromContent(normalizedContent));
    setHomeForm(buildHomeFormFromContent(normalizedContent));
    setNavbarForm(buildNavbarFormFromContent(normalizedContent));
    setAboutForm(buildAboutFormFromContent(normalizedContent));
    setContactForm(buildContactFormFromContent(normalizedContent));
    setDonateForm(buildDonateFormFromContent(normalizedContent));
    setLearnForm(buildLearnFormFromContent(normalizedContent));
    setSiteContentUpdatedAt(data.updatedAt || '');
  };

  const fetchWorkshopSchedule = async () => {
    const response = await fetch(`${apiBaseUrl}/api/workshops`);

    if (!response.ok) {
      throw new Error('Failed to load workshop schedule.');
    }

    const data = await response.json();
    setWorkshopForm(buildWorkshopFormFromContent({ workshops: data.currentSchedule || data }));
    setRecentWorkshopSchedules(Array.isArray(data.recentSchedules) ? data.recentSchedules : []);
    setWorkshopUpdatedAt(data.updatedAt || '');
  };

  const fetchWorkshopPosts = async () => {
    const response = await fetch(`${apiBaseUrl}/api/workshop-posts`);

    if (!response.ok) {
      throw new Error('Failed to load workshop posts.');
    }

    const data = await response.json();
    setWorkshopPosts(Array.isArray(data) ? data : []);
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
      videoUrl: member.videoUrl || '',
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
      returnToDashboard('activity');
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
        videoUrl: '',
      });
      setMessage(data.message || 'Team member saved to the database successfully.');
      await Promise.all([fetchDashboard(), fetchPublicLists()]);
      returnToDashboard('team');
    } catch (err) {
      setError(err.message || 'Unable to create team member.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (event) => {
    event.preventDefault();
    clearStatus();

    if (!adminForm.name || !adminForm.username || !adminForm.email || !adminForm.password) {
      setError('Admin name, username, email and password are required.');
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
        username: '',
        email: '',
        password: '',
      });
      setMessage('Admin account created successfully.');
      await fetchDashboard();
      returnToDashboard('activity');
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
      returnToDashboard('activity');
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
      returnToDashboard('team');
    } catch (err) {
      setError(err.message || 'Unable to update team member.');
    } finally {
      setLoading(false);
    }
  };

  const saveContentSection = async (nextContent, successMessage, successPanel = 'activity') => {
    try {
      setLoading(true);
      const response = await fetch(`${apiBaseUrl}/api/admin/content`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(nextContent),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to save section.');
      }

      const normalizedContent = {
        ...defaultSiteContent,
        ...(data.content || nextContent),
        learn: {
          ...defaultSiteContent.learn,
          ...((data.content || nextContent).learn || {}),
        },
      };

      setSiteContentObject(normalizedContent);
      setHeroForm(buildHeroFormFromContent(normalizedContent));
      setHomeForm(buildHomeFormFromContent(normalizedContent));
      setNavbarForm(buildNavbarFormFromContent(normalizedContent));
      setAboutForm(buildAboutFormFromContent(normalizedContent));
      setContactForm(buildContactFormFromContent(normalizedContent));
      setDonateForm(buildDonateFormFromContent(normalizedContent));
      setLearnForm(buildLearnFormFromContent(normalizedContent));
      setSiteContentUpdatedAt(data.updatedAt || '');
      setMessage(successMessage);
      returnToDashboard(successPanel);
    } catch (err) {
      setError(err.message || 'Unable to save section.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveHeroSection = async (event) => {
    event.preventDefault();
    clearStatus();
    const nextContent = {
      ...siteContentObject,
      hero: {
        title: heroForm.title,
        subtitle: heroForm.subtitle,
        description: heroForm.description,
      },
    };
    await saveContentSection(nextContent, 'Hero section updated successfully.', 'activity');
  };

  const handleSaveHomeSection = async (event) => {
    event.preventDefault();
    clearStatus();
    const nextContent = {
      ...siteContentObject,
      home: {
        welcomeTitle: homeForm.welcomeTitle,
        welcomeText: homeForm.welcomeText,
        featureCards: [
          {
            title: homeForm.featureOneTitle,
            description: homeForm.featureOneDescription,
            path: homeForm.featureOnePath,
          },
          {
            title: homeForm.featureTwoTitle,
            description: homeForm.featureTwoDescription,
            path: homeForm.featureTwoPath,
          },
          {
            title: homeForm.featureThreeTitle,
            description: homeForm.featureThreeDescription,
            path: homeForm.featureThreePath,
          },
        ],
        quickButtons: [
          { label: homeForm.buttonOneLabel, path: homeForm.buttonOnePath },
          { label: homeForm.buttonTwoLabel, path: homeForm.buttonTwoPath },
          { label: homeForm.buttonThreeLabel, path: homeForm.buttonThreePath },
          { label: homeForm.buttonFourLabel, path: homeForm.buttonFourPath },
        ],
      },
    };
    await saveContentSection(nextContent, 'Home section updated successfully.', 'activity');
  };

  const handleSaveNavbarSection = async (event) => {
    event.preventDefault();
    clearStatus();
    const nextContent = {
      ...siteContentObject,
      navbar: {
        brandText: navbarForm.brandText,
        homeLabel: navbarForm.homeLabel,
        aboutLabel: navbarForm.aboutLabel,
        projectsLabel: navbarForm.projectsLabel,
        donateLabel: navbarForm.donateLabel,
        contactLabel: navbarForm.contactLabel,
        adminLabel: navbarForm.adminLabel,
      },
    };
    await saveContentSection(nextContent, 'Navigation updated successfully.', 'tasks');
  };

  const handleSaveAboutSection = async (event) => {
    event.preventDefault();
    clearStatus();
    const nextContent = {
      ...siteContentObject,
      about: {
        title: aboutForm.title,
        introOne: aboutForm.introOne,
        introTwo: aboutForm.introTwo,
        missionTitle: aboutForm.missionTitle,
        missionText: aboutForm.missionText,
        missionPoints: [
          aboutForm.missionPointOne,
          aboutForm.missionPointTwo,
          aboutForm.missionPointThree,
        ],
      },
    };
    await saveContentSection(nextContent, 'About section updated successfully.', 'stories');
  };

  const handleSaveContactSection = async (event) => {
    event.preventDefault();
    clearStatus();
    const nextContent = {
      ...siteContentObject,
      contact: {
        title: contactForm.title,
        intro: contactForm.intro,
        email: contactForm.email,
        phone: contactForm.phone,
        address: contactForm.address,
        mapUrl: contactForm.mapUrl,
      },
    };
    await saveContentSection(nextContent, 'Contact section updated successfully.', 'activity');
  };

  const handleSaveDonateSection = async (event) => {
    event.preventDefault();
    clearStatus();
    const nextContent = {
      ...siteContentObject,
      donate: {
        title: donateForm.title,
        intro: donateForm.intro,
        cards: [
          { title: donateForm.cardOneTitle, description: donateForm.cardOneDescription },
          { title: donateForm.cardTwoTitle, description: donateForm.cardTwoDescription },
          { title: donateForm.cardThreeTitle, description: donateForm.cardThreeDescription },
        ],
        highlight: donateForm.highlight,
        closing: donateForm.closing,
        actions: [
          {
            label: donateForm.actionOneLabel,
            url: donateForm.actionOneUrl,
            external: donateForm.actionOneExternal,
          },
          {
            label: donateForm.actionTwoLabel,
            url: donateForm.actionTwoUrl,
            external: donateForm.actionTwoExternal,
          },
        ],
      },
    };
    await saveContentSection(nextContent, 'Donate section updated successfully.', 'donor');
  };

  const handleSaveLearnSection = async (event) => {
    event.preventDefault();
    clearStatus();

    const nextContent = {
      ...siteContentObject,
      learn: {
        title: learnForm.title,
        amplifyingTitle: learnForm.amplifyingTitle,
        amplifyingIntro: learnForm.amplifyingIntro,
        amplifyingBridge: learnForm.amplifyingBridge,
        focusAreas: [
          {
            title: learnForm.focusAreaOneTitle,
            body: learnForm.focusAreaOneBody,
          },
          {
            title: learnForm.focusAreaTwoTitle,
            body: learnForm.focusAreaTwoBody,
          },
        ],
        dignityTitle: learnForm.dignityTitle,
        dignityText: learnForm.dignityText,
      },
    };

    await saveContentSection(nextContent, 'Learn section updated successfully.', 'stories');
  };

  const handleSaveWorkshopSchedule = async (event) => {
    event.preventDefault();
    clearStatus();

    try {
      setLoading(true);
      const response = await fetch(`${apiBaseUrl}/api/workshops`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify({
          title: workshopForm.title,
          coordinator: workshopForm.coordinator,
          nextSessionDate: workshopForm.nextSessionDate,
          nextSessionTopic: workshopForm.nextSessionTopic,
          nextSessionLocation: workshopForm.nextSessionLocation,
          nextSessionFacilitator: workshopForm.nextSessionFacilitator,
          notes: workshopForm.notes,
          workshopSummary: workshopForm.workshopSummary,
          targetAudience: workshopForm.targetAudience,
          keyOutcomes: workshopForm.keyOutcomes,
          followUpActions: workshopForm.followUpActions,
          activities: [
            {
              title: workshopForm.activityOneTitle,
              date: workshopForm.activityOneDate,
              location: workshopForm.activityOneLocation,
              status: workshopForm.activityOneStatus,
              details: workshopForm.activityOneDetails,
            },
            {
              title: workshopForm.activityTwoTitle,
              date: workshopForm.activityTwoDate,
              location: workshopForm.activityTwoLocation,
              status: workshopForm.activityTwoStatus,
              details: workshopForm.activityTwoDetails,
            },
            {
              title: workshopForm.activityThreeTitle,
              date: workshopForm.activityThreeDate,
              location: workshopForm.activityThreeLocation,
              status: workshopForm.activityThreeStatus,
              details: workshopForm.activityThreeDetails,
            },
          ],
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to save workshop schedule.');
      }

      setWorkshopForm(buildWorkshopFormFromContent({ workshops: data.schedule }));
      setRecentWorkshopSchedules(Array.isArray(data.recentSchedules) ? data.recentSchedules : []);
      setWorkshopUpdatedAt(data.updatedAt || '');
      setMessage('Workshop schedule recorded in the database successfully.');
      returnToDashboard('quick-actions');
    } catch (err) {
      setError(err.message || 'Unable to save workshop schedule.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWorkshopPost = async (event) => {
    event.preventDefault();
    clearStatus();

    try {
      setLoading(true);
      const response = await fetch(`${apiBaseUrl}/api/workshop-posts`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(newWorkshopPostForm),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to save workshop post.');
      }

      setNewWorkshopPostForm({ ...emptyWorkshopPostForm });
      await fetchWorkshopPosts();
      setMessage('Workshop post recorded successfully.');
      returnToDashboard('quick-actions');
    } catch (err) {
      setError(err.message || 'Unable to save workshop post.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateWorkshopPost = async (event) => {
    event.preventDefault();
    clearStatus();

    try {
      setLoading(true);
      const response = await fetch(
        `${apiBaseUrl}/api/workshop-posts/${editingWorkshopPostId}`,
        {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(editingWorkshopPostForm),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to save workshop post.');
      }

      setEditingWorkshopPostForm({ ...emptyWorkshopPostForm });
      setEditingWorkshopPostId('');
      await fetchWorkshopPosts();
      setMessage('Workshop post updated successfully.');
      returnToDashboard('quick-actions');
    } catch (err) {
      setError(err.message || 'Unable to save workshop post.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWorkshopPost = async (postId) => {
    clearStatus();

    try {
      setLoading(true);
      const response = await fetch(`${apiBaseUrl}/api/workshop-posts/${postId}`, {
        method: 'DELETE',
        headers: authHeaders,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to delete workshop post.');
      }

      await fetchWorkshopPosts();
      setMessage('Workshop post deleted successfully.');
      returnToDashboard('quick-actions');
    } catch (err) {
      setError(err.message || 'Unable to delete workshop post.');
    } finally {
      setLoading(false);
    }
  };

  const beginWorkshopPostEdit = (post) => {
    setEditingWorkshopPostId(post._id);
    setEditingWorkshopPostForm({
      title: post.title || '',
      postUrl: post.postUrl || '',
      workshopDate: post.workshopDate || '',
      postedDate: post.postedDate || '',
      summary: post.summary || '',
      details: post.details || '',
    });
    setMessage('Editing workshop post. Update the fields and save changes.');
    window.requestAnimationFrame(() => {
      if (workshopPostEditRef.current) {
        workshopPostEditRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const cancelWorkshopPostEdit = () => {
    setEditingWorkshopPostId('');
    setEditingWorkshopPostForm({ ...emptyWorkshopPostForm });
    setMessage('');
  };

  useEffect(() => {
    const init = async () => {
      if (!token || !isAdmin) return;

      try {
        setLoading(true);
        await Promise.all([fetchDashboard(), fetchPublicLists()]);
        await Promise.all([fetchAdminSiteContent(), fetchWorkshopSchedule(), fetchWorkshopPosts()]);
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
    scrollToTop();
  };

  const formatDateTime = (dateValue) => {
    if (!dateValue) return 'N/A';
    const parsedDate = new Date(dateValue);
    if (Number.isNaN(parsedDate.getTime())) return 'N/A';
    return parsedDate.toLocaleString();
  };

  const openWorkspaceSection = (sectionKey, panelKey) => {
    if (sectionKey) {
      setSearchParams({ section: sectionKey });
    }
    setActiveOverviewPanel(panelKey);
    scrollToTop();
  };

  const handleSidebarClick = (sectionKey, panelKey) => {
    if (!sectionKey) {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ section: sectionKey });
    }
    setActiveOverviewPanel(panelKey);
    scrollToTop();
  };

  const mentorshipBadgeTopics = ['Pregnancy Prevention', 'Peer Pressure'];
  const normalizedDashboardSearch = dashboardSearch.trim().toLowerCase();
  const supportTeamMembers = team;

  const advocacyStories = projects.slice(0, 3).map((project) => ({
    id: project._id,
    title: project.title,
    status: project.liveUrl ? 'Published' : 'Pending Review',
    when: project.updatedAt || project.createdAt,
  }));

  const workshopActivities = recentWorkshopSchedules
    .map((schedule, index) => ({
      id: schedule._id || `schedule-${index}`,
      title: schedule.nextSessionTopic || schedule.title || 'Workshop activity',
      status: schedule.activities?.[0]?.status || 'Recorded',
      when: schedule.nextSessionDate || schedule.updatedAt || '',
    }))
    .filter((activity) => activity?.title || activity?.when || activity?.status)
    .slice(0, 3)
    .map((activity, index) => ({
      ...activity,
      id: activity.id || `${activity.title || 'activity'}-${index}`,
      status: activity.status || 'Recorded',
    }));

  const pendingTasks = [
    {
      id: 'pending-profile-images',
      label: `${supportTeamMembers.filter((member) => !member.image).length} team profile(s) missing photo`,
    },
    {
      id: 'pending-profile-videos',
      label: `${supportTeamMembers.filter((member) => !member.videoUrl).length} team profile(s) missing video link`,
    },
    {
      id: 'pending-live-links',
      label: `${projects.filter((project) => !project.liveUrl).length} project(s) missing live URL`,
    },
    {
      id: 'pending-repo-links',
      label: `${projects.filter((project) => !project.repoUrl).length} project(s) missing repository URL`,
    },
    {
      id: 'recorded-workshops',
      label: `${recentWorkshopSchedules.length} recent workshop record(s) stored in the database`,
    },
  ];

  const filteredSectionCards = SECTION_CARDS.filter((section) => {
    if (!normalizedDashboardSearch) return true;

    return [section.title, section.description, section.badge]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(normalizedDashboardSearch));
  });

  const filteredPendingTasks = pendingTasks.filter((task) => {
    if (!normalizedDashboardSearch) return true;
    return task.label.toLowerCase().includes(normalizedDashboardSearch);
  });

  const filteredSupportTeamPreview = supportTeamMembers.filter((member) => {
    if (!normalizedDashboardSearch) return true;

    return [member.name, member.role, member.bio]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(normalizedDashboardSearch));
  });

  const filteredWorkshopActivities = workshopActivities.filter((activity) => {
    if (!normalizedDashboardSearch) return true;

    return [activity.title, activity.status, formatDateTime(activity.when)]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(normalizedDashboardSearch));
  });

  const filteredProjects = projects.filter((project) => {
    if (!normalizedDashboardSearch) return true;

    return [
      project.title,
      project.description,
      ...(project.techStack || []),
      project.liveUrl,
      project.repoUrl,
    ]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(normalizedDashboardSearch));
  });

  const filteredTeamRecords = filteredSupportTeamPreview;

  const sectionPanelMap = {
    'create-admin': 'activity',
    'create-project': 'activity',
    'manage-projects': 'activity',
    'manage-team': 'team',
    'workshop-schedule': 'quick-actions',
    'edit-hero': 'activity',
    'edit-home': 'activity',
    'edit-navbar': 'tasks',
    'edit-about': 'stories',
    'edit-contact': 'activity',
    'edit-donate': 'donor',
    'edit-learn': 'stories',
    'help-guide': 'stories',
  };

  const inferredSearchTarget = useMemo(() => {
    if (!normalizedDashboardSearch) {
      return null;
    }

    const directSectionMatch = SECTION_CARDS.find((section) =>
      [section.title, section.description, section.badge]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedDashboardSearch))
    );

    if (directSectionMatch) {
      return {
        section: directSectionMatch.key,
        panel: sectionPanelMap[directSectionMatch.key] || 'activity',
      };
    }

    if (filteredSupportTeamPreview.length > 0) {
      return { section: 'manage-team', panel: 'team' };
    }

    if (filteredProjects.length > 0) {
      return { section: 'manage-projects', panel: 'activity' };
    }

    if (filteredWorkshopActivities.length > 0) {
      return { section: 'workshop-schedule', panel: 'quick-actions' };
    }

    if (filteredPendingTasks.length > 0) {
      return { section: 'edit-navbar', panel: 'tasks' };
    }

    return null;
  }, [
    filteredPendingTasks.length,
    filteredProjects.length,
    filteredTeamRecords.length,
    filteredSupportTeamPreview.length,
    filteredWorkshopActivities.length,
    normalizedDashboardSearch,
  ]);

  useEffect(() => {
    if (!normalizedDashboardSearch) {
      if (searchDrivenSection && activeSection === searchDrivenSection) {
        setSearchDrivenSection('');
        setSearchParams({}, { replace: true });
      }
      return;
    }

    if (!inferredSearchTarget) {
      return;
    }

    const shouldDriveSearch = !activeSection || activeSection === searchDrivenSection;

    if (!shouldDriveSearch) {
      return;
    }

    if (activeSection !== inferredSearchTarget.section || activeOverviewPanel !== inferredSearchTarget.panel) {
      setSearchDrivenSection(inferredSearchTarget.section);
      setSearchParams({ section: inferredSearchTarget.section }, { replace: true });
      setActiveOverviewPanel(inferredSearchTarget.panel);
    }
  }, [
    activeOverviewPanel,
    activeSection,
    inferredSearchTarget,
    normalizedDashboardSearch,
    searchDrivenSection,
    setSearchParams,
  ]);

  return (
    <section className="admin-page miles-admin-shell">
      <aside className="miles-admin-sidebar">
        <div className="miles-sidebar-brand">
          <span className="miles-sidebar-logo">M</span>
          <div>
            <h2>MILES Admin</h2>
            <p>Empowerment Control Center</p>
          </div>
        </div>

        <nav className="miles-sidebar-nav" aria-label="Primary">
          <button
            type="button"
            className={`miles-nav-item ${activeOverviewPanel === 'activity' ? 'active' : ''}`}
            onClick={() => handleSidebarClick('', 'activity')}
          >
            <span className="miles-nav-icon">▣</span>
            Dashboard
          </button>
          <button
            type="button"
            className={`miles-nav-item ${activeOverviewPanel === 'quick-actions' ? 'active' : ''}`}
            onClick={() => handleSidebarClick('workshop-schedule', 'quick-actions')}
          >
            <span className="miles-nav-icon">◈</span>
            Workshops
          </button>
          <button
            type="button"
            className={`miles-nav-item ${activeOverviewPanel === 'activity' ? 'active' : ''}`}
            onClick={() => handleSidebarClick('manage-projects', 'activity')}
          >
            <span className="miles-nav-icon">◌</span>
            Cases
          </button>
          <button
            type="button"
            className={`miles-nav-item ${activeOverviewPanel === 'donor' ? 'active' : ''}`}
            onClick={() => handleSidebarClick('edit-donate', 'donor')}
          >
            <span className="miles-nav-icon">▤</span>
            Reports
          </button>
          <button
            type="button"
            className={`miles-nav-item ${activeOverviewPanel === 'team' ? 'active' : ''}`}
            onClick={() => handleSidebarClick('manage-team', 'team')}
          >
            <span className="miles-nav-icon">▥</span>
            Team
          </button>
          <button
            type="button"
            className={`miles-nav-item ${activeOverviewPanel === 'tasks' ? 'active' : ''}`}
            onClick={() => handleSidebarClick('edit-navbar', 'tasks')}
          >
            <span className="miles-nav-icon">⚙</span>
            Settings
          </button>
          <button
            type="button"
            className={`miles-nav-item ${activeOverviewPanel === 'stories' ? 'active' : ''}`}
            onClick={() => handleSidebarClick('help-guide', 'stories')}
          >
            <span className="miles-nav-icon">?</span>
            Help
          </button>
        </nav>
      </aside>

      <div className="miles-admin-main">
        <header className="miles-admin-header flex items-center justify-between gap-4">
          <div>
            <h1>MILES | Empowerment Support</h1>
            <p>
              Program Coordinator | John Mal Nyuon
              {siteContentUpdatedAt ? ` | Last content update: ${formatDateTime(siteContentUpdatedAt)}` : ''}
              {workshopUpdatedAt ? ` | Last workshop update: ${formatDateTime(workshopUpdatedAt)}` : ''}
            </p>
          </div>
          <div className="miles-header-tools">
            <div className="miles-search-block">
              <input
                type="search"
                className="miles-admin-search"
                value={dashboardSearch}
                onChange={(event) => setDashboardSearch(event.target.value)}
                placeholder="Search activities, cases, or members"
              />
            </div>
            <div className="miles-profile-chip">
              <span className="miles-profile-avatar">{adminDisplayName.charAt(0)}</span>
              <span>{adminDisplayName}</span>
            </div>
          </div>
        </header>

        {loading && <p className="admin-loading">Syncing with backend...</p>}
        {error && <p className="admin-alert admin-alert-error">{error}</p>}
        {message && <p className="admin-alert admin-alert-success">{message}</p>}

        {!isWorkspaceView && (
          <>
        <div className="miles-admin-split grid grid-cols-1 lg:grid-cols-5 gap-8 mt-6">
          <div className="miles-metrics-column lg:col-span-2 flex flex-col gap-6" aria-label="Admin overview shortcuts">
            <button
              type="button"
              className={`miles-metric-card miles-stat-card-button ${activeSection === 'manage-team' ? 'miles-stat-card-active' : ''}`}
              onClick={() => openWorkspaceSection('manage-team', 'team')}
            >
              <h3>Team Members</h3>
              <p>{supportTeamMembers.length} <span>From database</span></p>
              <small>Open Team records</small>
            </button>
            <button
              type="button"
              className={`miles-metric-card miles-stat-card-button ${activeSection === 'manage-projects' ? 'miles-stat-card-active' : ''}`}
              onClick={() => openWorkspaceSection('manage-projects', 'activity')}
            >
              <h3>Recent Mentorship</h3>
              <p>{projects.length} Active Records</p>
              <div className="miles-badges">
                {mentorshipBadgeTopics.map((topic) => (
                  <span key={topic}>{topic}</span>
                ))}
              </div>
              <small>Open Case management</small>
            </button>
            <button
              type="button"
              className={`miles-metric-card miles-stat-card-button ${activeSection === 'create-admin' ? 'miles-stat-card-active' : ''}`}
              onClick={() => openWorkspaceSection('create-admin', 'activity')}
            >
              <h3>Admin Users</h3>
              <p>{dashboard?.stats?.userCount ?? 0} <span>Authorized</span></p>
              <small>Open Admin account tools</small>
            </button>
          </div>

          <div className="miles-approval-workspace lg:col-span-3 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <ApprovalQueue
              currentUsername={user?.username}
              authHeaders={authHeaders}
            />
          </div>
        </div>

        <article className="miles-panel miles-workspace-panel">
          <h2>Management Workspace</h2>
          <p>Choose a section below to edit content, manage records, or perform admin actions.</p>
        </article>

        <div className="admin-section-picker">
        {filteredSectionCards.map((section) => (
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
        {filteredSectionCards.length === 0 && (
          <article className="admin-card admin-panel-card">
            <h2>No Matching Sections</h2>
            <p className="admin-panel-hint">Try another search term for cases, members, workshops, or settings.</p>
          </article>
        )}
      </div>
          </>
        )}

        {isWorkspaceView && (
          <section className="miles-workspace-page">
            <div className="miles-workspace-page-header">
              <div>
                <p className="miles-workspace-kicker">Focused Workspace</p>
                <h2>{activeSectionMeta?.title}</h2>
                <p>{activeSectionMeta?.description}</p>
              </div>
              <button
                type="button"
                className="miles-workspace-back"
                onClick={() => returnToDashboard(activeOverviewPanel)}
              >
                Back to Dashboard
              </button>
            </div>
          </section>
        )}

      <div className={`admin-panel-wrap ${isWorkspaceView ? 'miles-workspace-only' : ''}`}>
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
                Username
                <input
                  type="text"
                  value={adminForm.username}
                  onChange={(event) =>
                    setAdminForm((current) => ({ ...current, username: event.target.value }))
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

        {activeSection === 'manage-projects' && (
          <article className="admin-card admin-panel-card">
            <h2>Manage Projects</h2>
            <ul className="admin-list">
              {filteredProjects.length > 0 ? filteredProjects.map((project) => (
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
                        <p>Updated: {formatDateTime(project.updatedAt || project.createdAt)}</p>
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
              )) : (
                <li>No project or case matches your search.</li>
              )}
            </ul>
          </article>
        )}

        {activeSection === 'manage-team' && (
          <article className="admin-card admin-panel-card">
            <div className="exec-registry-header">
              <h2 className="exec-registry-title">Active Core Leadership &amp; Representatives</h2>
              <p className="exec-registry-subtitle">View, edit, and update profiles for core leadership, administrators, and community representatives.</p>
            </div>

            {filteredTeamRecords.length === 0 ? (
              <p className="admin-panel-hint">No team profile matches your search.</p>
            ) : (
              <div className="exec-registry-grid">
                {filteredTeamRecords.map((member) => (
                  <div key={member._id} className="exec-profile-card">
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
                        <label>
                          Photo URL or Filename
                          <input
                            value={editingTeamForm.image}
                            onChange={(event) =>
                              setEditingTeamForm((current) => ({ ...current, image: event.target.value }))
                            }
                          />
                        </label>
                        <label>
                          Video URL
                          <input
                            value={editingTeamForm.videoUrl}
                            onChange={(event) =>
                              setEditingTeamForm((current) => ({ ...current, videoUrl: event.target.value }))
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
                        <div className="exec-profile-meta">
                          <div className="exec-profile-name-row">
                            <strong className="exec-profile-name">{member.name}</strong>
                            <span className="exec-profile-badge">
                              {member.role?.toLowerCase().includes('representative') ? 'Core Team' : 'Active Staff'}
                            </span>
                          </div>
                          <p className="exec-profile-role">{member.role}</p>
                          {member.bio && <p className="exec-profile-bio">{member.bio}</p>}
                          <p className="exec-profile-updated">Updated: {formatDateTime(member.updatedAt || member.createdAt)}</p>
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
                  </div>
                ))}
              </div>
            )}
          </article>
        )}

        {activeSection === 'workshop-schedule' && (
          <article className="admin-card admin-panel-card">
            <h2>Workshop Schedule Tracker</h2>
            <p className="admin-panel-hint">
              Use this tracker to keep workshop plans, responsibilities, and follow-ups on track.
            </p>
            <form onSubmit={handleSaveWorkshopSchedule} className="admin-form">
              <label>
                Tracker Title
                <input
                  value={workshopForm.title}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, title: event.target.value }))
                  }
                />
              </label>
              <label>
                Coordinator
                <input
                  value={workshopForm.coordinator}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, coordinator: event.target.value }))
                  }
                />
              </label>
              <label>
                Next Session Date
                <input
                  type="date"
                  value={workshopForm.nextSessionDate}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, nextSessionDate: event.target.value }))
                  }
                />
              </label>
              <label>
                Next Session Topic
                <input
                  value={workshopForm.nextSessionTopic}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, nextSessionTopic: event.target.value }))
                  }
                />
              </label>
              <label>
                Next Session Location
                <input
                  value={workshopForm.nextSessionLocation}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, nextSessionLocation: event.target.value }))
                  }
                />
              </label>
              <label>
                Facilitator
                <input
                  value={workshopForm.nextSessionFacilitator}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, nextSessionFacilitator: event.target.value }))
                  }
                />
              </label>
              <label>
                General Notes
                <textarea
                  value={workshopForm.notes}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, notes: event.target.value }))
                  }
                />
              </label>

              <label>
                Workshop Summary
                <textarea
                  value={workshopForm.workshopSummary}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, workshopSummary: event.target.value }))
                  }
                />
              </label>
              <label>
                Target Audience
                <input
                  value={workshopForm.targetAudience}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, targetAudience: event.target.value }))
                  }
                />
              </label>
              <label>
                Key Outcomes
                <textarea
                  value={workshopForm.keyOutcomes}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, keyOutcomes: event.target.value }))
                  }
                />
              </label>
              <label>
                Follow-Up Actions
                <textarea
                  value={workshopForm.followUpActions}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, followUpActions: event.target.value }))
                  }
                />
              </label>

              <h3>Activity 1</h3>
              <label>
                Title
                <input
                  value={workshopForm.activityOneTitle}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, activityOneTitle: event.target.value }))
                  }
                />
              </label>
              <label>
                Date
                <input
                  type="date"
                  value={workshopForm.activityOneDate}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, activityOneDate: event.target.value }))
                  }
                />
              </label>
              <label>
                Location
                <input
                  value={workshopForm.activityOneLocation}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, activityOneLocation: event.target.value }))
                  }
                />
              </label>
              <label>
                Status
                <input
                  value={workshopForm.activityOneStatus}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, activityOneStatus: event.target.value }))
                  }
                />
              </label>
              <label>
                Details
                <textarea
                  value={workshopForm.activityOneDetails}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, activityOneDetails: event.target.value }))
                  }
                />
              </label>

              <h3>Activity 2</h3>
              <label>
                Title
                <input
                  value={workshopForm.activityTwoTitle}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, activityTwoTitle: event.target.value }))
                  }
                />
              </label>
              <label>
                Date
                <input
                  type="date"
                  value={workshopForm.activityTwoDate}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, activityTwoDate: event.target.value }))
                  }
                />
              </label>
              <label>
                Location
                <input
                  value={workshopForm.activityTwoLocation}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, activityTwoLocation: event.target.value }))
                  }
                />
              </label>
              <label>
                Status
                <input
                  value={workshopForm.activityTwoStatus}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, activityTwoStatus: event.target.value }))
                  }
                />
              </label>
              <label>
                Details
                <textarea
                  value={workshopForm.activityTwoDetails}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, activityTwoDetails: event.target.value }))
                  }
                />
              </label>

              <h3>Activity 3</h3>
              <label>
                Title
                <input
                  value={workshopForm.activityThreeTitle}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, activityThreeTitle: event.target.value }))
                  }
                />
              </label>
              <label>
                Date
                <input
                  type="date"
                  value={workshopForm.activityThreeDate}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, activityThreeDate: event.target.value }))
                  }
                />
              </label>
              <label>
                Location
                <input
                  value={workshopForm.activityThreeLocation}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, activityThreeLocation: event.target.value }))
                  }
                />
              </label>
              <label>
                Status
                <input
                  value={workshopForm.activityThreeStatus}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, activityThreeStatus: event.target.value }))
                  }
                />
              </label>
              <label>
                Details
                <textarea
                  value={workshopForm.activityThreeDetails}
                  onChange={(event) =>
                    setWorkshopForm((current) => ({ ...current, activityThreeDetails: event.target.value }))
                  }
                />
              </label>

              <button type="submit" disabled={loading}>Save Workshop Schedule</button>
            </form>

            <div className="admin-divider" />

            <h3>Manual Facebook Posts</h3>
            <p className="admin-panel-hint">
              Add new posts, edit the selected post, or remove an outdated entry.
            </p>
            <div className="admin-post-panels">
              {editingWorkshopPostId && (
                <article className="admin-card admin-inline-panel" ref={workshopPostEditRef}>
                  <div className="admin-edit-banner admin-edit-banner--compact">
                    <span className="admin-edit-badge">Editing Workshop Post</span>
                    <span className="admin-edit-banner-text">
                      Update the selected post and save the changes.
                    </span>
                    <button type="button" className="admin-secondary-btn" onClick={cancelWorkshopPostEdit}>
                      Cancel Edit
                    </button>
                  </div>
                  <form onSubmit={handleUpdateWorkshopPost} className="admin-form">
                    <label>
                      Post Title
                      <input
                        value={editingWorkshopPostForm.title}
                        onChange={(event) =>
                          setEditingWorkshopPostForm((current) => ({ ...current, title: event.target.value }))
                        }
                      />
                    </label>
                    <label>
                      Facebook Post URL
                      <input
                        value={editingWorkshopPostForm.postUrl}
                        onChange={(event) =>
                          setEditingWorkshopPostForm((current) => ({ ...current, postUrl: event.target.value }))
                        }
                      />
                    </label>
                    <label>
                      Workshop Date
                      <input
                        type="date"
                        value={editingWorkshopPostForm.workshopDate}
                        onChange={(event) =>
                          setEditingWorkshopPostForm((current) => ({ ...current, workshopDate: event.target.value }))
                        }
                      />
                    </label>
                    <label>
                      Posted Date
                      <input
                        type="date"
                        value={editingWorkshopPostForm.postedDate}
                        onChange={(event) =>
                          setEditingWorkshopPostForm((current) => ({ ...current, postedDate: event.target.value }))
                        }
                      />
                    </label>
                    <label>
                      Summary
                      <textarea
                        value={editingWorkshopPostForm.summary}
                        onChange={(event) =>
                          setEditingWorkshopPostForm((current) => ({ ...current, summary: event.target.value }))
                        }
                      />
                    </label>
                    <label>
                      Details
                      <textarea
                        value={editingWorkshopPostForm.details}
                        onChange={(event) =>
                          setEditingWorkshopPostForm((current) => ({ ...current, details: event.target.value }))
                        }
                      />
                    </label>
                    <button type="submit" disabled={loading}>Update Workshop Post</button>
                  </form>
                </article>
              )}

              <article className="admin-card admin-inline-panel">
                <h4>Add New Workshop Post</h4>
                <form onSubmit={handleSaveWorkshopPost} className="admin-form">
                  <label>
                    Post Title
                    <input
                      value={newWorkshopPostForm.title}
                      onChange={(event) =>
                        setNewWorkshopPostForm((current) => ({ ...current, title: event.target.value }))
                      }
                    />
                  </label>
                  <label>
                    Facebook Post URL
                    <input
                      value={newWorkshopPostForm.postUrl}
                      onChange={(event) =>
                        setNewWorkshopPostForm((current) => ({ ...current, postUrl: event.target.value }))
                      }
                    />
                  </label>
                  <label>
                    Workshop Date
                    <input
                      type="date"
                      value={newWorkshopPostForm.workshopDate}
                      onChange={(event) =>
                        setNewWorkshopPostForm((current) => ({ ...current, workshopDate: event.target.value }))
                      }
                    />
                  </label>
                  <label>
                    Posted Date
                    <input
                      type="date"
                      value={newWorkshopPostForm.postedDate}
                      onChange={(event) =>
                        setNewWorkshopPostForm((current) => ({ ...current, postedDate: event.target.value }))
                      }
                    />
                  </label>
                  <label>
                    Summary
                    <textarea
                      value={newWorkshopPostForm.summary}
                      onChange={(event) =>
                        setNewWorkshopPostForm((current) => ({ ...current, summary: event.target.value }))
                      }
                    />
                  </label>
                  <label>
                    Details
                    <textarea
                      value={newWorkshopPostForm.details}
                      onChange={(event) =>
                        setNewWorkshopPostForm((current) => ({ ...current, details: event.target.value }))
                      }
                    />
                  </label>
                  <button type="submit" disabled={loading}>Add Workshop Post</button>
                </form>
              </article>
            </div>

            <div className="admin-list-block">
              <h4>Recorded Facebook Posts</h4>
              {workshopPosts.length > 0 ? (
                <ul className="admin-post-list">
                  {workshopPosts.map((post) => (
                    <li
                      key={post._id}
                      className={`admin-post-item ${editingWorkshopPostId === post._id ? 'admin-post-item--editing' : ''}`}
                    >
                      <div>
                        <strong>{post.title || 'Workshop post'}</strong>
                        <p>{post.summary || post.details || 'No summary recorded yet.'}</p>
                        <p className="admin-meta-line">
                          Workshop Date: {post.workshopDate || 'Pending'}
                          {' · '}
                          Posted Date: {post.postedDate || 'Pending'}
                        </p>
                        <a href={post.postUrl} target="_blank" rel="noreferrer">
                          Open Facebook post
                        </a>
                      </div>
                      <div className="admin-row-actions">
                        <button
                          type="button"
                          className="admin-secondary-btn"
                          onClick={() => beginWorkshopPostEdit(post)}
                          disabled={loading}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteWorkshopPost(post._id)}
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="admin-panel-hint">No manual Facebook posts have been added yet.</p>
              )}
            </div>
          </article>
        )}

        {activeSection === 'edit-hero' && (
          <article className="admin-card admin-panel-card">
            <h2>Edit Hero Section</h2>
            <form onSubmit={handleSaveHeroSection} className="admin-form">
              <label>
                Hero Title
                <input
                  value={heroForm.title}
                  onChange={(event) =>
                    setHeroForm((current) => ({ ...current, title: event.target.value }))
                  }
                />
              </label>
              <label>
                Hero Subtitle
                <input
                  value={heroForm.subtitle}
                  onChange={(event) =>
                    setHeroForm((current) => ({ ...current, subtitle: event.target.value }))
                  }
                />
              </label>
              <label>
                Hero Description
                <textarea
                  value={heroForm.description}
                  onChange={(event) =>
                    setHeroForm((current) => ({ ...current, description: event.target.value }))
                  }
                />
              </label>
              <button type="submit" disabled={loading}>Save Hero Section</button>
            </form>
          </article>
        )}

        {activeSection === 'edit-home' && (
          <article className="admin-card admin-panel-card">
            <h2>Edit Home Section</h2>
            <form onSubmit={handleSaveHomeSection} className="admin-form">
              <label>
                Welcome Title
                <input
                  value={homeForm.welcomeTitle}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, welcomeTitle: event.target.value }))
                  }
                />
              </label>
              <label>
                Welcome Text
                <textarea
                  value={homeForm.welcomeText}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, welcomeText: event.target.value }))
                  }
                />
              </label>
              <h3>Feature Card 1</h3>
              <label>
                Title
                <input
                  value={homeForm.featureOneTitle}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, featureOneTitle: event.target.value }))
                  }
                />
              </label>
              <label>
                Description
                <textarea
                  value={homeForm.featureOneDescription}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, featureOneDescription: event.target.value }))
                  }
                />
              </label>
              <label>
                Link Path or URL
                <input
                  value={homeForm.featureOnePath}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, featureOnePath: event.target.value }))
                  }
                />
              </label>
              <h3>Feature Card 2</h3>
              <label>
                Title
                <input
                  value={homeForm.featureTwoTitle}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, featureTwoTitle: event.target.value }))
                  }
                />
              </label>
              <label>
                Description
                <textarea
                  value={homeForm.featureTwoDescription}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, featureTwoDescription: event.target.value }))
                  }
                />
              </label>
              <label>
                Link Path or URL
                <input
                  value={homeForm.featureTwoPath}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, featureTwoPath: event.target.value }))
                  }
                />
              </label>
              <h3>Feature Card 3</h3>
              <label>
                Title
                <input
                  value={homeForm.featureThreeTitle}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, featureThreeTitle: event.target.value }))
                  }
                />
              </label>
              <label>
                Description
                <textarea
                  value={homeForm.featureThreeDescription}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, featureThreeDescription: event.target.value }))
                  }
                />
              </label>
              <label>
                Link Path or URL
                <input
                  value={homeForm.featureThreePath}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, featureThreePath: event.target.value }))
                  }
                />
              </label>
              <h3>Quick Buttons</h3>
              <label>
                Button 1 Label
                <input
                  value={homeForm.buttonOneLabel}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, buttonOneLabel: event.target.value }))
                  }
                />
              </label>
              <label>
                Button 1 Link Path or URL
                <input
                  value={homeForm.buttonOnePath}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, buttonOnePath: event.target.value }))
                  }
                />
              </label>
              <label>
                Button 2 Label
                <input
                  value={homeForm.buttonTwoLabel}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, buttonTwoLabel: event.target.value }))
                  }
                />
              </label>
              <label>
                Button 2 Link Path or URL
                <input
                  value={homeForm.buttonTwoPath}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, buttonTwoPath: event.target.value }))
                  }
                />
              </label>
              <label>
                Button 3 Label
                <input
                  value={homeForm.buttonThreeLabel}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, buttonThreeLabel: event.target.value }))
                  }
                />
              </label>
              <label>
                Button 3 Link Path or URL
                <input
                  value={homeForm.buttonThreePath}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, buttonThreePath: event.target.value }))
                  }
                />
              </label>
              <label>
                Button 4 Label
                <input
                  value={homeForm.buttonFourLabel}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, buttonFourLabel: event.target.value }))
                  }
                />
              </label>
              <label>
                Button 4 Link Path or URL
                <input
                  value={homeForm.buttonFourPath}
                  onChange={(event) =>
                    setHomeForm((current) => ({ ...current, buttonFourPath: event.target.value }))
                  }
                />
              </label>
              <button type="submit" disabled={loading}>Save Home Section</button>
            </form>
          </article>
        )}

        {activeSection === 'edit-navbar' && (
          <article className="admin-card admin-panel-card">
            <h2>Edit Navigation</h2>
            <form onSubmit={handleSaveNavbarSection} className="admin-form">
              <label>
                Brand Text
                <input
                  value={navbarForm.brandText}
                  onChange={(event) =>
                    setNavbarForm((current) => ({ ...current, brandText: event.target.value }))
                  }
                />
              </label>
              <label>
                Home Label
                <input
                  value={navbarForm.homeLabel}
                  onChange={(event) =>
                    setNavbarForm((current) => ({ ...current, homeLabel: event.target.value }))
                  }
                />
              </label>
              <label>
                About Label
                <input
                  value={navbarForm.aboutLabel}
                  onChange={(event) =>
                    setNavbarForm((current) => ({ ...current, aboutLabel: event.target.value }))
                  }
                />
              </label>
              <label>
                Projects Label
                <input
                  value={navbarForm.projectsLabel}
                  onChange={(event) =>
                    setNavbarForm((current) => ({ ...current, projectsLabel: event.target.value }))
                  }
                />
              </label>
              <label>
                Donate Label
                <input
                  value={navbarForm.donateLabel}
                  onChange={(event) =>
                    setNavbarForm((current) => ({ ...current, donateLabel: event.target.value }))
                  }
                />
              </label>
              <label>
                Contact Label
                <input
                  value={navbarForm.contactLabel}
                  onChange={(event) =>
                    setNavbarForm((current) => ({ ...current, contactLabel: event.target.value }))
                  }
                />
              </label>
              <label>
                Admin Label
                <input
                  value={navbarForm.adminLabel}
                  onChange={(event) =>
                    setNavbarForm((current) => ({ ...current, adminLabel: event.target.value }))
                  }
                />
              </label>
              <button type="submit" disabled={loading}>Save Navigation</button>
            </form>
          </article>
        )}

        {activeSection === 'edit-about' && (
          <article className="admin-card admin-panel-card">
            <h2>Edit About Section</h2>
            <form onSubmit={handleSaveAboutSection} className="admin-form">
              <label>
                Page Title
                <input
                  value={aboutForm.title}
                  onChange={(event) =>
                    setAboutForm((current) => ({ ...current, title: event.target.value }))
                  }
                />
              </label>
              <label>
                Introduction Paragraph 1
                <textarea
                  value={aboutForm.introOne}
                  onChange={(event) =>
                    setAboutForm((current) => ({ ...current, introOne: event.target.value }))
                  }
                />
              </label>
              <label>
                Introduction Paragraph 2
                <textarea
                  value={aboutForm.introTwo}
                  onChange={(event) =>
                    setAboutForm((current) => ({ ...current, introTwo: event.target.value }))
                  }
                />
              </label>
              <label>
                Mission Title
                <input
                  value={aboutForm.missionTitle}
                  onChange={(event) =>
                    setAboutForm((current) => ({ ...current, missionTitle: event.target.value }))
                  }
                />
              </label>
              <label>
                Mission Text
                <textarea
                  value={aboutForm.missionText}
                  onChange={(event) =>
                    setAboutForm((current) => ({ ...current, missionText: event.target.value }))
                  }
                />
              </label>
              <label>
                Mission Point 1
                <textarea
                  value={aboutForm.missionPointOne}
                  onChange={(event) =>
                    setAboutForm((current) => ({ ...current, missionPointOne: event.target.value }))
                  }
                />
              </label>
              <label>
                Mission Point 2
                <textarea
                  value={aboutForm.missionPointTwo}
                  onChange={(event) =>
                    setAboutForm((current) => ({ ...current, missionPointTwo: event.target.value }))
                  }
                />
              </label>
              <label>
                Mission Point 3
                <textarea
                  value={aboutForm.missionPointThree}
                  onChange={(event) =>
                    setAboutForm((current) => ({ ...current, missionPointThree: event.target.value }))
                  }
                />
              </label>
              <button type="submit" disabled={loading}>Save About Section</button>
            </form>
          </article>
        )}

        {activeSection === 'edit-contact' && (
          <article className="admin-card admin-panel-card">
            <h2>Edit Contact Section</h2>
            <form onSubmit={handleSaveContactSection} className="admin-form">
              <label>
                Page Title
                <input
                  value={contactForm.title}
                  onChange={(event) =>
                    setContactForm((current) => ({ ...current, title: event.target.value }))
                  }
                />
              </label>
              <label>
                Introduction Text
                <textarea
                  value={contactForm.intro}
                  onChange={(event) =>
                    setContactForm((current) => ({ ...current, intro: event.target.value }))
                  }
                />
              </label>
              <label>
                Email
                <input
                  value={contactForm.email}
                  onChange={(event) =>
                    setContactForm((current) => ({ ...current, email: event.target.value }))
                  }
                />
              </label>
              <label>
                Phone
                <input
                  value={contactForm.phone}
                  onChange={(event) =>
                    setContactForm((current) => ({ ...current, phone: event.target.value }))
                  }
                />
              </label>
              <label>
                Address Label
                <input
                  value={contactForm.address}
                  onChange={(event) =>
                    setContactForm((current) => ({ ...current, address: event.target.value }))
                  }
                />
              </label>
              <label>
                Map URL
                <input
                  value={contactForm.mapUrl}
                  onChange={(event) =>
                    setContactForm((current) => ({ ...current, mapUrl: event.target.value }))
                  }
                />
              </label>
              <button type="submit" disabled={loading}>Save Contact Section</button>
            </form>
          </article>
        )}

        {activeSection === 'edit-donate' && (
          <article className="admin-card admin-panel-card">
            <h2>Edit Donate Section</h2>
            <form onSubmit={handleSaveDonateSection} className="admin-form">
              <label>
                Page Title
                <input
                  value={donateForm.title}
                  onChange={(event) =>
                    setDonateForm((current) => ({ ...current, title: event.target.value }))
                  }
                />
              </label>
              <label>
                Intro Text
                <textarea
                  value={donateForm.intro}
                  onChange={(event) =>
                    setDonateForm((current) => ({ ...current, intro: event.target.value }))
                  }
                />
              </label>
              <h3>Donate Card 1</h3>
              <label>
                Title
                <input
                  value={donateForm.cardOneTitle}
                  onChange={(event) =>
                    setDonateForm((current) => ({ ...current, cardOneTitle: event.target.value }))
                  }
                />
              </label>
              <label>
                Description
                <textarea
                  value={donateForm.cardOneDescription}
                  onChange={(event) =>
                    setDonateForm((current) => ({ ...current, cardOneDescription: event.target.value }))
                  }
                />
              </label>
              <h3>Donate Card 2</h3>
              <label>
                Title
                <input
                  value={donateForm.cardTwoTitle}
                  onChange={(event) =>
                    setDonateForm((current) => ({ ...current, cardTwoTitle: event.target.value }))
                  }
                />
              </label>
              <label>
                Description
                <textarea
                  value={donateForm.cardTwoDescription}
                  onChange={(event) =>
                    setDonateForm((current) => ({ ...current, cardTwoDescription: event.target.value }))
                  }
                />
              </label>
              <h3>Donate Card 3</h3>
              <label>
                Title
                <input
                  value={donateForm.cardThreeTitle}
                  onChange={(event) =>
                    setDonateForm((current) => ({ ...current, cardThreeTitle: event.target.value }))
                  }
                />
              </label>
              <label>
                Description
                <textarea
                  value={donateForm.cardThreeDescription}
                  onChange={(event) =>
                    setDonateForm((current) => ({ ...current, cardThreeDescription: event.target.value }))
                  }
                />
              </label>
              <label>
                Highlight Text
                <textarea
                  value={donateForm.highlight}
                  onChange={(event) =>
                    setDonateForm((current) => ({ ...current, highlight: event.target.value }))
                  }
                />
              </label>
              <label>
                Closing Text
                <textarea
                  value={donateForm.closing}
                  onChange={(event) =>
                    setDonateForm((current) => ({ ...current, closing: event.target.value }))
                  }
                />
              </label>
              <h3>Action Button 1</h3>
              <label>
                Label
                <input
                  value={donateForm.actionOneLabel}
                  onChange={(event) =>
                    setDonateForm((current) => ({ ...current, actionOneLabel: event.target.value }))
                  }
                />
              </label>
              <label>
                URL
                <input
                  value={donateForm.actionOneUrl}
                  onChange={(event) =>
                    setDonateForm((current) => ({ ...current, actionOneUrl: event.target.value }))
                  }
                />
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={donateForm.actionOneExternal}
                  onChange={(event) =>
                    setDonateForm((current) => ({ ...current, actionOneExternal: event.target.checked }))
                  }
                />
                Open button 1 in a new tab
              </label>
              <h3>Action Button 2</h3>
              <label>
                Label
                <input
                  value={donateForm.actionTwoLabel}
                  onChange={(event) =>
                    setDonateForm((current) => ({ ...current, actionTwoLabel: event.target.value }))
                  }
                />
              </label>
              <label>
                URL
                <input
                  value={donateForm.actionTwoUrl}
                  onChange={(event) =>
                    setDonateForm((current) => ({ ...current, actionTwoUrl: event.target.value }))
                  }
                />
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={donateForm.actionTwoExternal}
                  onChange={(event) =>
                    setDonateForm((current) => ({ ...current, actionTwoExternal: event.target.checked }))
                  }
                />
                Open button 2 in a new tab
              </label>
              <button type="submit" disabled={loading}>Save Donate Section</button>
            </form>
          </article>
        )}

        {activeSection === 'edit-learn' && (
          <article className="admin-card admin-panel-card">
            <h2>Edit Learn Section</h2>
            <p className="admin-panel-hint">
              This dedicated form controls the Learn More narrative and awareness blocks.
            </p>
            <form onSubmit={handleSaveLearnSection} className="admin-form">
              <label>
                Main Title
                <input
                  value={learnForm.title}
                  onChange={(event) =>
                    setLearnForm((current) => ({ ...current, title: event.target.value }))
                  }
                />
              </label>

              <label>
                Amplifying Voices Title
                <input
                  value={learnForm.amplifyingTitle}
                  onChange={(event) =>
                    setLearnForm((current) => ({ ...current, amplifyingTitle: event.target.value }))
                  }
                />
              </label>

              <label>
                Amplifying Voices Introduction
                <textarea
                  value={learnForm.amplifyingIntro}
                  onChange={(event) =>
                    setLearnForm((current) => ({ ...current, amplifyingIntro: event.target.value }))
                  }
                />
              </label>

              <label>
                Bridge Paragraph
                <textarea
                  value={learnForm.amplifyingBridge}
                  onChange={(event) =>
                    setLearnForm((current) => ({ ...current, amplifyingBridge: event.target.value }))
                  }
                />
              </label>

              <label>
                Focus Area 1 Title
                <input
                  value={learnForm.focusAreaOneTitle}
                  onChange={(event) =>
                    setLearnForm((current) => ({ ...current, focusAreaOneTitle: event.target.value }))
                  }
                />
              </label>

              <label>
                Focus Area 1 Body
                <textarea
                  value={learnForm.focusAreaOneBody}
                  onChange={(event) =>
                    setLearnForm((current) => ({ ...current, focusAreaOneBody: event.target.value }))
                  }
                  rows={6}
                />
              </label>

              <label>
                Focus Area 2 Title
                <input
                  value={learnForm.focusAreaTwoTitle}
                  onChange={(event) =>
                    setLearnForm((current) => ({ ...current, focusAreaTwoTitle: event.target.value }))
                  }
                />
              </label>

              <label>
                Focus Area 2 Body
                <textarea
                  value={learnForm.focusAreaTwoBody}
                  onChange={(event) =>
                    setLearnForm((current) => ({ ...current, focusAreaTwoBody: event.target.value }))
                  }
                  rows={6}
                />
              </label>

              <label>
                Dignity Note Title
                <input
                  value={learnForm.dignityTitle}
                  onChange={(event) =>
                    setLearnForm((current) => ({ ...current, dignityTitle: event.target.value }))
                  }
                />
              </label>

              <label>
                Dignity Note Text
                <textarea
                  value={learnForm.dignityText}
                  onChange={(event) =>
                    setLearnForm((current) => ({ ...current, dignityText: event.target.value }))
                  }
                  rows={5}
                />
              </label>

              <button type="submit" disabled={loading}>Save Learn Section</button>
            </form>
          </article>
        )}

        {activeSection === 'help-guide' && (
          <article className="admin-card admin-panel-card">
            <h2>Help &amp; Guidance</h2>
            <p className="admin-panel-hint">
              Use this guide to navigate the dashboard safely. Read every section before making any changes.
            </p>

            <div className="admin-help-warning-banner">
              <span className="admin-help-warning-icon">⚠</span>
              <div>
                <strong>Supervision Required</strong>
                <p>
                  This admin panel controls the live MILES website and its database. If you are not
                  a trained technical operator, you must <strong>not use this dashboard alone</strong>.
                  Always have a supervising MILES technical team member present before making any
                  edits, deletions, or approvals. Unsupervised changes can permanently alter or
                  remove live content and data records.
                </p>
              </div>
            </div>

            <section className="admin-help-block">
              <h3>1. Who Should Use This Dashboard</h3>
              <ul>
                <li>Only authorized MILES administrators with a registered account may log in.</li>
                <li>If you are a non-technical staff member, you must be accompanied by a technical supervisor at all times.</li>
                <li>Do not share your login credentials with anyone, including other MILES staff.</li>
                <li>If you are unsure what a section does, stop and contact your technical supervisor before proceeding.</li>
              </ul>
            </section>

            <section className="admin-help-block">
              <h3>2. The Two-Admin Approval Rule</h3>
              <ul>
                <li>All staged content changes require sign-off from a <strong>second administrator</strong> before going live.</li>
                <li>You cannot approve your own submissions — the other admin must review and confirm each action.</li>
                <li>Check the <strong>Dual-Authorization Review Feed</strong> on your dashboard home to see pending actions awaiting your review.</li>
                <li>If no second admin is available, hold all changes until supervision is present.</li>
              </ul>
            </section>

            <section className="admin-help-block">
              <h3>3. Editing Website Content Safely</h3>
              <ul>
                <li>Open section cards like Edit Hero, Edit Home, Edit Donate, or Edit Learn.</li>
                <li>Read all existing content in a field before overwriting it.</li>
                <li>Update only the specific fields you intend to change — leave everything else untouched.</li>
                <li>Click Save and wait for the green success message before navigating away.</li>
                <li>Confirm timestamps updated after saving to verify the change reached the database.</li>
              </ul>
            </section>

            <section className="admin-help-block">
              <h3>4. Managing Team and Projects</h3>
              <ul>
                <li>Use <strong>Manage Team</strong> to view, edit, or remove leadership and representative profiles.</li>
                <li>Use <strong>Add Project</strong> and <strong>Manage Projects</strong> to maintain programme records.</li>
                <li>Do not delete any record without verbal confirmation from your supervisor first.</li>
                <li>Deletion is permanent — deleted records cannot be recovered from this dashboard.</li>
              </ul>
            </section>

            <section className="admin-help-block">
              <h3>5. Safety Checklist Before Every Action</h3>
              <ul>
                <li>✔ Verify names, dates, links, and spellings before clicking Save or Approve.</li>
                <li>✔ Ensure a second admin or technical supervisor is present or reachable.</li>
                <li>✔ Never perform bulk deletes or mass edits without explicit technical instruction.</li>
                <li>✔ Log out immediately after your session is complete. Do not leave the dashboard open unattended.</li>
                <li>✔ Report any unexpected errors or unusual behaviour to the technical team immediately.</li>
              </ul>
            </section>

            <div className="admin-help-contact-note">
              <p>
                Need help? Contact the MILES technical team at{' '}
                <a href="mailto:milesproject@gmail.com">milesproject@gmail.com</a> before making
                any changes you are uncertain about.
              </p>
            </div>
          </article>
        )}

      </div>

      <div className="admin-footer-actions">
        <button type="button" className="admin-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
