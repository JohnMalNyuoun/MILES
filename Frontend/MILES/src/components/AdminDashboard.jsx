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
  const [siteContentObject, setSiteContentObject] = useState(defaultSiteContent);
  const [siteContentUpdatedAt, setSiteContentUpdatedAt] = useState('');
  const [heroForm, setHeroForm] = useState(() => buildHeroFormFromContent(defaultSiteContent));
  const [homeForm, setHomeForm] = useState(() => buildHomeFormFromContent(defaultSiteContent));
  const [navbarForm, setNavbarForm] = useState(() => buildNavbarFormFromContent(defaultSiteContent));
  const [aboutForm, setAboutForm] = useState(() => buildAboutFormFromContent(defaultSiteContent));
  const [contactForm, setContactForm] = useState(() => buildContactFormFromContent(defaultSiteContent));
  const [donateForm, setDonateForm] = useState(() => buildDonateFormFromContent(defaultSiteContent));
  const [learnForm, setLearnForm] = useState(() => buildLearnFormFromContent(defaultSiteContent));
  const [dashboardSearch, setDashboardSearch] = useState('');
  const [activeOverviewPanel, setActiveOverviewPanel] = useState('activity');

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

  const saveContentSection = async (nextContent, successMessage) => {
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
    await saveContentSection(nextContent, 'Hero section updated successfully.');
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
    await saveContentSection(nextContent, 'Home section updated successfully.');
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
    await saveContentSection(nextContent, 'Navigation updated successfully.');
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
    await saveContentSection(nextContent, 'About section updated successfully.');
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
    await saveContentSection(nextContent, 'Contact section updated successfully.');
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
    await saveContentSection(nextContent, 'Donate section updated successfully.');
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

    await saveContentSection(nextContent, 'Learn section updated successfully.');
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
  };

  const handleSidebarClick = (sectionKey, panelKey) => {
    if (!sectionKey) {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ section: sectionKey });
    }
    setActiveOverviewPanel(panelKey);
  };

  const mentorshipBadgeTopics = ['Pregnancy Prevention', 'Peer Pressure'];
  const recentActivityItems = [
    ...(dashboard?.recentTeam || []).slice(0, 2).map((member) => ({
      id: `team-${member._id}`,
      text: `${member.name} joined the team as ${member.role}.`,
      when: member.updatedAt || member.createdAt,
    })),
    ...(dashboard?.recentProjects || []).slice(0, 2).map((project) => ({
      id: `project-${project._id}`,
      text: `Project \"${project.title}\" was updated in the dashboard.`,
      when: project.updatedAt || project.createdAt,
    })),
  ].slice(0, 4);

  const advocacyStories = projects.slice(0, 3).map((project) => ({
    id: project._id,
    title: project.title,
    status: project.liveUrl ? 'Published' : 'Pending Review',
    when: project.updatedAt || project.createdAt,
  }));

  const pendingTasks = [
    {
      id: 'pending-profile-images',
      label: `${team.filter((member) => !member.image).length} team profile(s) missing image filename`,
    },
    {
      id: 'pending-live-links',
      label: `${projects.filter((project) => !project.liveUrl).length} project(s) missing live URL`,
    },
    {
      id: 'pending-repo-links',
      label: `${projects.filter((project) => !project.repoUrl).length} project(s) missing repository URL`,
    },
  ];

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
            className={`miles-nav-item ${activeOverviewPanel === 'team' ? 'active' : ''}`}
            onClick={() => handleSidebarClick('create-team', 'team')}
          >
            <span className="miles-nav-icon">◉</span>
            Mothers
          </button>
          <button
            type="button"
            className={`miles-nav-item ${activeOverviewPanel === 'quick-actions' ? 'active' : ''}`}
            onClick={() => handleSidebarClick('edit-learn', 'quick-actions')}
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
        <header className="miles-admin-header">
          <div>
            <h1>MILES | Empowerment Support</h1>
            <p>
              Program Coordinator | John Mal Nyuon
              {siteContentUpdatedAt ? ` | Last content update: ${formatDateTime(siteContentUpdatedAt)}` : ''}
            </p>
          </div>
          <div className="miles-header-tools">
            <input
              type="search"
              className="miles-admin-search"
              value={dashboardSearch}
              onChange={(event) => setDashboardSearch(event.target.value)}
              placeholder="Search activities, cases, or members"
            />
            <div className="miles-profile-chip">
              <span className="miles-profile-avatar">A</span>
              <span>{user?.name || 'Admin'}</span>
            </div>
          </div>
        </header>

        {loading && <p className="admin-loading">Syncing with backend...</p>}
        {error && <p className="admin-alert admin-alert-error">{error}</p>}
        {message && <p className="admin-alert admin-alert-success">{message}</p>}

        <div className="miles-stat-row">
          <article className="miles-stat-card">
            <h3>Mothers Supported</h3>
            <p>{dashboard?.stats?.teamCount ?? team.length} <span>From database</span></p>
          </article>
          <article className="miles-stat-card">
            <h3>Recent Mentorship</h3>
            <p>{projects.length} Active Records</p>
            <div className="miles-badges">
              {mentorshipBadgeTopics.map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </div>
          </article>
          <article className="miles-stat-card">
            <h3>Admin Users</h3>
            <p>{dashboard?.stats?.userCount ?? 0} <span>Authorized</span></p>
          </article>
        </div>

        <div className="miles-overview-row">
          <article className={`miles-panel miles-recent-activity ${activeOverviewPanel === 'activity' ? 'miles-panel-priority' : ''}`}>
            <h2>Recent Activity Feed</h2>
            <ul className="miles-recent-activity-scroll">
              {recentActivityItems.length > 0 ? (
                recentActivityItems.map((item) => (
                  <li key={item.id}>
                    <strong>{item.text}</strong>
                    <p>{formatDateTime(item.when)}</p>
                  </li>
                ))
              ) : (
                <li>No recent database activity yet.</li>
              )}
            </ul>
          </article>

          <div className="miles-overview-side-stack">
            <article className={`miles-panel ${activeOverviewPanel === 'quick-actions' ? 'miles-panel-priority' : ''}`}>
              <h2>Quick Actions</h2>
              <div className="miles-action-stack">
                <button type="button" onClick={() => openWorkspaceSection('create-team', 'quick-actions')}>Add New Mother Profile</button>
                <button type="button" onClick={() => openWorkspaceSection('manage-projects', 'quick-actions')}>Log New Case Intervention</button>
                <button type="button" onClick={() => openWorkspaceSection('edit-learn', 'quick-actions')}>Schedule Workshop</button>
              </div>
            </article>

            <article className={`miles-panel ${activeOverviewPanel === 'tasks' ? 'miles-panel-priority' : ''}`}>
              <h2>Pending Tasks</h2>
              <ul className="miles-task-list">
                {pendingTasks.map((task) => (
                  <li key={task.id}>
                    <span>{task.label}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className={`miles-panel miles-donor-panel ${activeOverviewPanel === 'donor' ? 'miles-panel-priority' : ''}`}>
              <h2>Donor Report Generator</h2>
              <p>Compile the latest impact metrics and stories into a shareable donor report.</p>
              <button type="button" onClick={() => openWorkspaceSection('edit-donate', 'donor')}>Generate Report</button>
            </article>
          </div>
        </div>

        <div className="miles-insights-row">
          <article className={`miles-panel ${activeOverviewPanel === 'team' ? 'miles-panel-priority' : ''}`}>
            <h2>Team Overview</h2>
            <ul className="miles-team-list miles-team-list-fullwidth">
              {team.slice(0, 5).map((member) => (
                <li key={member._id}>
                  <span className="miles-avatar-slot">{(member.name || 'M').charAt(0)}</span>
                  <div>
                    <strong>{member.name}</strong>
                    <p>{member.role}</p>
                    <small>Updated: {formatDateTime(member.updatedAt || member.createdAt)}</small>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <article className={`miles-panel ${activeOverviewPanel === 'stories' ? 'miles-panel-priority' : ''}`}>
            <h2>Advocacy Stories</h2>
            <ul className="miles-story-list miles-story-list-clean">
              {advocacyStories.length > 0 ? (
                advocacyStories.map((story) => (
                  <li key={story.id}>
                    <div className="miles-story-copy">
                      <span>{story.title}</span>
                      <p>{formatDateTime(story.when)}</p>
                    </div>
                    <em className={story.status === 'Published' ? 'miles-badge-published' : 'miles-badge-pending'}>
                      {story.status}
                    </em>
                  </li>
                ))
              ) : (
                <li>No stories tracked yet.</li>
              )}
            </ul>
          </article>
        </div>

        <article className="miles-panel miles-workspace-panel">
          <h2>Management Workspace</h2>
          <p>Choose a section below to edit content, manage records, or perform admin actions.</p>
        </article>

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
                        <p>Updated: {formatDateTime(member.updatedAt || member.createdAt)}</p>
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
            <h2>Help & Guidance</h2>
            <p className="admin-panel-hint">
              Use this guide to navigate the dashboard and publish updates to the live website.
            </p>

            <section className="admin-help-block">
              <h3>1. Dashboard Overview</h3>
              <ul>
                <li>Use the left sidebar to jump between major areas like Team, Reports, and Settings.</li>
                <li>The top cards show live counts from your backend database.</li>
                <li>Panels in the middle show recent activity, stories, and pending data checks.</li>
              </ul>
            </section>

            <section className="admin-help-block">
              <h3>2. Editing Website Content</h3>
              <ul>
                <li>Open section cards like Edit Hero, Edit Home, Edit Donate, or Edit Learn.</li>
                <li>Update the fields, then click the Save button at the bottom of that section.</li>
                <li>Your changes are sent directly to backend APIs and stored in the database.</li>
                <li>After saving, the dashboard shows a success alert and updated timestamps.</li>
              </ul>
            </section>

            <section className="admin-help-block">
              <h3>3. Managing Team and Projects</h3>
              <ul>
                <li>Create records from Add Team Member or Add Project.</li>
                <li>Use Manage Team Members and Manage Projects to edit or delete existing records.</li>
                <li>Each record row displays when it was last updated.</li>
              </ul>
            </section>

            <section className="admin-help-block">
              <h3>4. Safety Checklist Before Publishing</h3>
              <ul>
                <li>Verify names, links, and spellings before clicking save.</li>
                <li>Check Pending Tasks panel for missing image files or project links.</li>
                <li>Confirm timestamps changed after save to ensure update reached the database.</li>
              </ul>
            </section>
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
