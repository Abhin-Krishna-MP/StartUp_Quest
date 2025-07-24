// Mock data for Startup Quest app

export const mockPhases = [
  {
    id: 'ideation',
    title: 'Ideation',
    description: 'Phase 1: Ideation',
    tasks: [
      { name: 'Define problem', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Research pain points', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Explore existing solutions & identify gaps', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Write a one-liner startup idea', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 }
    ],
    tips: [
      'Start with a real problem you or others face.',
      'Don’t fall in love with your first idea—explore alternatives.',
      'Look for gaps in existing solutions.',
      'Keep your idea statement short and clear.'
    ],
    status: 'unlocked',
    progress: 0,
    completedTasks: [],
    xpReward: 26 // phase completion bonus
  },
  {
    id: 'validation',
    title: 'Validation',
    description: 'Phase 2: Validation',
    tasks: [
      { name: 'Create a Value Proposition Canvas', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Build basic user persona', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Run 3 user interviews', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Identify early adopter segment', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Draft a lean validation plan', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 }
    ],
    tips: [
      'Talk to real users, not just friends.',
      'Ask open-ended questions in interviews.',
      'Focus on learning, not confirming your assumptions.',
      'Document your findings and iterate.'
    ],
    status: 'locked',
    progress: 0,  
    completedTasks: [],
    xpReward: 26
  },
  {
    id: 'mvp',
    title: 'MVP (Minimum Viable Product)',
    description: 'Phase 3: MVP',
    tasks: [
      { name: 'Sketch wireframe or UI mockups', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Choose a tech stack or tools', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Build MVP landing page or prototype', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Collect feedback', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Define 1 success metric', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 }
    ],
    tips: [
      'Build only what’s necessary to test your core hypothesis.',
      'Use no-code tools if possible.',
      'Get feedback early and often.',
      'Track a single, clear success metric.'
    ],
    status: 'locked',
    progress: 0,
    completedTasks: [],
    xpReward: 26
  },
  {
    id: 'launch',
    title: 'Launch',
    description: 'Phase 4: Launch',
    tasks: [
      { name: 'Plan a launch strategy', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Publish on Product Hunt / Social Media', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Gather initial feedback and web data', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Measure user behaviors', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 }
    ],
    tips: [
      'Prepare your launch assets in advance.',
      'Engage your early users and community.',
      'Monitor analytics closely after launch.',
      'Be ready to respond to feedback quickly.'
    ],
    status: 'locked',
    progress: 0,
    completedTasks: [],
    xpReward: 26
  },
  {
    id: 'feedback',
    title: 'Feedback & Iterate',
    description: 'Phase 5: Feedback & Iterate',
    tasks: [
      { name: 'Analyze usage metrics', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Ship meaningful iterations', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Write a changelog', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Identify 1 retention hook', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 }
    ],
    tips: [
      'Look for patterns in user feedback.',
      'Prioritize changes that impact retention.',
      'Communicate updates clearly to users.',
      'Iterate quickly, but with purpose.'
    ],
    status: 'locked',
    progress: 0,
    completedTasks: [],
    xpReward: 26
  },
  {
    id: 'monetization',
    title: 'Monetization (Show Me the Money)',
    description: 'Phase 6: Monetization',
    tasks: [
      { name: 'Define a business model', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Test pricing with surveys', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Simulate first revenue transactions', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Create a revenue plan for 3 months', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 }
    ],
    tips: [
      'Start with a simple pricing model.',
      'Validate willingness to pay early.',
      'Track revenue and costs from day one.',
      'Iterate on your business model as you learn.'
    ],
    status: 'locked',
    progress: 0,
    completedTasks: [],
    xpReward: 26
  },
  {
    id: 'scale',
    title: 'Pitch & Scale',
    description: 'Phase 7: Pitch & Scale',
    tasks: [
      { name: 'Build pitch deck', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Create a pitch video', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Practice with peers/mentors', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Define growth KPIs', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 },
      { name: 'Write a one-year vision plan', submissionType: 'form', submissionOptions: ['form', 'file'], xpReward: 26 }
    ],
    tips: [
      'Tell a compelling story in your pitch.',
      'Practice your pitch with real people.',
      'Set clear, measurable growth goals.',
      'Think big, but plan realistically.'
    ],
    status: 'locked',
    progress: 0,
    completedTasks: [],
    xpReward: 38 // last phase gets the remainder to make total 1000
  }
];

export const mockBadges = [
  { id: 'first-steps', name: 'First Steps', description: 'Complete your first phase', earned: false },
  { id: 'validator', name: 'Idea Validator', description: 'Complete the validation phase', earned: false },
  { id: 'builder', name: 'MVP Builder', description: 'Successfully build and launch your MVP', earned: false },
  { id: 'entrepreneur', name: 'True Entrepreneur', description: 'Complete all startup phases', earned: false },
  { id: 'community-member', name: 'Community Member', description: 'Share 5 ideas in the community', earned: false },
  { id: 'supporter', name: 'Supportive Member', description: 'Give 10 upvotes to community ideas', earned: false }
];

export const mockUser = {
  username: 'StartupFounder',
  ideasShared: 2,
  upvotesGiven: 7,
  completedPhases: []
};

export const mockFriends = [
  { id: 'friend-1', name: 'Alice', profilePic: 'https://randomuser.me/api/portraits/women/44.jpg', isOnline: true },
  { id: 'friend-2', name: 'Bob', profilePic: 'https://randomuser.me/api/portraits/men/32.jpg', isOnline: false },
  { id: 'friend-3', name: 'Charlie', profilePic: 'https://randomuser.me/api/portraits/men/65.jpg', isOnline: true }
];

export const mockProfiles = [
  { id: 'friend-1', name: 'Alice', profilePic: 'https://randomuser.me/api/portraits/women/44.jpg', isOnline: true },
  { id: 'friend-2', name: 'Bob', profilePic: 'https://randomuser.me/api/portraits/men/32.jpg', isOnline: false },
  { id: 'friend-3', name: 'Charlie', profilePic: 'https://randomuser.me/api/portraits/men/65.jpg', isOnline: true },
  { id: 'friend-4', name: 'Diana', profilePic: 'https://randomuser.me/api/portraits/women/68.jpg', isOnline: true },
  { id: 'friend-5', name: 'Ethan', profilePic: 'https://randomuser.me/api/portraits/men/77.jpg', isOnline: false },
  { id: 'friend-6', name: 'Fiona', profilePic: 'https://randomuser.me/api/portraits/women/12.jpg', isOnline: true },
  { id: 'friend-7', name: 'George', profilePic: 'https://randomuser.me/api/portraits/men/23.jpg', isOnline: false }
];

export const mockGroups = [
  {
    id: 'group-1',
    name: 'Startup Team',
    members: ['friend-1', 'friend-2', 'friend-3'],
    messages: [
      { sender: 'Alice', text: 'Let’s finalize the pitch deck today.', timestamp: '09:00' },
      { sender: 'Bob', text: 'I’ll share the latest version in a minute.', timestamp: '09:01' },
      { sender: 'Charlie', text: 'I can help with the competitor analysis.', timestamp: '09:02' }
    ]
  },
  {
    id: 'group-2',
    name: 'Marketing',
    members: ['friend-1', 'friend-4', 'friend-5'],
    messages: [
      { sender: 'Diana', text: 'Social media campaign starts tomorrow!', timestamp: '11:00' },
      { sender: 'Alice', text: 'I’ll prepare the posts.', timestamp: '11:01' }
    ]
  }
]; 