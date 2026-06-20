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
    teamLabel: 'Team',
    workshopsLabel: 'Workshops',
    projectsLabel: 'Projects',
    donateLabel: 'Donate',
    contactLabel: 'Contact',
    adminLabel: 'Admin',
  },
  about: {
    title: 'About MILES',
    introOne:
      'MILES - Mothers in Learning, Empowerment & Support - was founded with the mission of creating a world where every young mother and girl has the opportunity to thrive through education and community.',
    introTwo:
      'We believe that when you empower a young mother, you empower an entire family. Our programs provide the tools, resources, and support systems needed to help mothers overcome barriers and achieve their goals.',
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
    email: 'wmal44884@gmail.com',
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
        url: 'mailto:wmal44884@gmail.com?subject=Donate%20to%20MILES',
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
    amplifyingTitle: 'Amplifying Voices: Truth, Awareness, and Collective Protection',
    amplifyingIntro:
      'At the MILES Project, we believe that the most powerful tool for community transformation is the truth. To protect the next generation of girls and boys, we hold brave spaces where young mothers step forward to share their lived experiences. These are not just stories - they are active blueprints for survival, resilience, and community awakening.',
    amplifyingBridge:
      'By bringing these narratives out of the shadows, our advocacy work targets two critical vulnerabilities facing our youth today:',
    focusAreas: [
      {
        title: '1. Confronting the Reality of Early Pregnancy',
        body: 'Early pregnancy is not an isolated personal event; it is a structural crisis that abruptly halts a girl\'s academic journey, places immense strain on her physical health, and introduces immediate economic vulnerability. Through first-hand testimonies, young mothers shed light on the heavy realities of balancing sudden maternal responsibilities with the fight to return to the classroom.\n\nWe use these raw, honest accounts to demystify the illusions of early relationships and to visually show young girls the profound, life-altering weight of early parenthood.',
      },
      {
        title: '2. Exposing the Traps of Negative Peer Pressure',
        body: 'Negative peer pressure silently steers young people toward decisions that compromise their futures. Whether it is the pressure to drop out of school, engage in risky behavior, or conform to unsafe social environments, youth often succumb because the dangers feel distant.\n\nWhen our young mothers speak, they pull back the curtain on how easily negative peer influence can derail an individual\'s potential. Their stories serve as an urgent warning system, teaching young boys and girls how to recognize manipulative social dynamics, stand firm in their values, and choose positive alliances instead.',
      },
    ],
    dignityTitle: 'A Note on Dignity and Agency',
    dignityText:
      'MILES does not share stories to induce shame or stigma. We share them to build armor. Every young mother who speaks does so from a position of leadership and purpose. They are utilizing their past struggles to act as guardians for the community\'s children, turning personal adversity into a collective shield.',
  },
  workshops: {
    title: 'Workshop Schedule Tracker',
    coordinator: 'MILES Program Team',
    nextSessionDate: '',
    nextSessionTopic: '',
    nextSessionLocation: '',
    nextSessionFacilitator: '',
    notes: '',
    activities: [
      {
        title: 'Peer mentorship circle',
        date: '',
        location: 'Scorpion Center',
        status: 'Planned',
        details: 'Create a safe sharing space for mothers returning to school.',
      },
      {
        title: 'School re-enrollment follow-up',
        date: '',
        location: 'Kakuma schools',
        status: 'Planned',
        details: 'Coordinate with schools and families to remove attendance barriers.',
      },
    ],
  },
};

export default defaultSiteContent;