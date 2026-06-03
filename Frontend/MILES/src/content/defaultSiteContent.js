const defaultSiteContent = {
  hero: {
    title: 'MILES',
    subtitle: 'Mothers in Learning, Empowerment & Support',
    description:
      'Empowering mothers and girls through education, community support, and mentorship.',
  },
  home: {
    welcomeTitle: 'Welcome to MILES',
    welcomeText:
      'MILES is dedicated to uplifting mothers and girls by providing access to education, building strong community networks, and fostering mentorship opportunities that create lasting change.',
    featureCards: [
      {
        title: 'Education',
        description:
          'Access learning resources and programs designed to help mothers continue their education journey.',
        path: '/focus/education',
      },
      {
        title: 'Community',
        description:
          'Join a supportive network of mothers who share experiences, advice, and encouragement.',
        path: '/focus/community',
      },
      {
        title: 'Mentorship',
        description:
          'Connect with mentors who guide and inspire you to reach your full potential.',
        path: '/focus/mentorship',
      },
    ],
    quickButtons: [
      { label: 'Learn More', path: '/learn' },
      { label: 'Meet Our Team', path: '/team' },
      { label: 'Our Projects', path: '/projects' },
      { label: 'Donate', path: '/donate' },
    ],
  },
  navbar: {
    brandText: 'MILES',
    homeLabel: 'Home',
    aboutLabel: 'About',
    projectsLabel: 'Projects',
    donateLabel: 'Donate',
    contactLabel: 'Contact',
    adminLabel: 'Admin',
  },
  about: {
    title: 'About MILES',
    introOne:
      'MILES - Mothers in Learning, Empowerment & Support - was founded with the mission of creating a world where every mother and girl has the opportunity to thrive through education and community.',
    introTwo:
      'We believe that when you empower a mother, you empower an entire family. Our programs provide the tools, resources, and support systems needed to help mothers overcome barriers and achieve their goals.',
    missionTitle: 'Our Mission',
    missionText:
      'To create inclusive spaces where mothers and girls can learn, grow, and support one another on their educational and personal development journeys.',
    missionPoints: [
      'Create a safe environment for the girl child by involving the community.',
      'Challenge harmful traditional practices that undermine the girl child in the community.',
      'Bring out the stories of young mothers to inspire young girls in the community - we believe these stories can change the issue of early pregnancy.',
    ],
  },
  contact: {
    title: 'Contact Us',
    intro:
      "We'd love to hear from you. Reach out to learn more about our programs or to get involved.",
    email: 'milesproject@gmail.com',
    phone: '+254112419468',
    address: 'Kakuma Refugee Camp, Scorpion Center',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kakuma+Refugee+Camp+Scorpion+Center',
  },
  donate: {
    title: 'Donate to MILES',
    intro:
      'MILES believes that education, mentorship, and community protection can change the future of a young mother and her child. Your support helps us strengthen school re-enrollment, academic retention, community mentorship, and practical care systems for vulnerable mothers in Kakuma.',
    cards: [
      {
        title: 'Support Education',
        description:
          'Donations help with uniforms, textbooks, writing materials, sanitary supplies, and school re-entry support for girls and young mothers.',
      },
      {
        title: 'Strengthen Mentorship',
        description:
          'Your contribution supports mentorship sessions on peer pressure, menstrual hygiene, early pregnancy prevention, and the role of brothers as allies.',
      },
      {
        title: 'Build Community Care',
        description:
          'MILES coordinates shared childcare support, community advocacy, and local protection networks so young mothers can remain in school and thrive.',
      },
    ],
    highlight:
      'According to MILES, lasting change comes from collective action. Every donation becomes part of a community response that supports re-enrollment, retention, leadership, and dignity for young mothers, girls, and families.',
    closing:
      'Whether you support educational intervention, community representation, resource coordination, or mentorship, your donation helps turn structural barriers into practical pathways for growth.',
    actions: [
      {
        label: 'Start a Donation Conversation',
        url: 'mailto:milesproject@gmail.com?subject=Donate%20to%20MILES',
        external: true,
      },
      {
        label: 'Visit MILES',
        url: 'https://www.google.com/maps/search/?api=1&query=Kakuma+Refugee+Camp+Scorpion+Center',
        external: true,
      },
    ],
  },
  learn: {
    title: 'Empowering Vulnerable Mothers Through Targeted Education and Mentorship',
  },
};

export default defaultSiteContent;