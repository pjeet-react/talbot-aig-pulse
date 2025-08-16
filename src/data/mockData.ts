import { Application, WorkstreamStats } from '@/types/migration';

export const mockApplications: Application[] = [
  // Business Apps (15 apps)
  {
    id: 'ba-1',
    name: 'Customer Portal',
    workstream: 'Business Apps',
    currentStage: 'Production',
    lastUpdated: '2024-08-10',
    nextMilestone: 'Complete migration - Aug 20',
    environments: [
      { name: 'DEV', status: 'Completed', completedDate: '2024-07-15' },
      { name: 'DEV1', status: 'Completed', completedDate: '2024-07-18' },
      { name: 'QA', status: 'Completed', completedDate: '2024-07-25' },
      { name: 'UAT', status: 'Completed', completedDate: '2024-08-01' },
      { name: 'PROD', status: 'In Progress' }
    ],
    components: [
      {
        id: 'cp-api',
        name: 'Customer API',
        type: 'Web API',
        techStack: ['.NET Core', 'SQL Server', 'Redis'],
        endpoints: ['https://api.customer.talbot.com'],
        githubRepo: 'https://github.com/talbot/customer-api',
        devOpsRepo: 'https://github.com/talbot/customer-devops',
        jenkinsUrl: 'https://jenkins.talbot.com/customer-api',
        status: 'Completed'
      },
      {
        id: 'cp-ui',
        name: 'Customer UI',
        type: 'UI',
        techStack: ['React', 'TypeScript', 'Tailwind'],
        endpoints: ['https://customer.talbot.com'],
        githubRepo: 'https://github.com/talbot/customer-ui',
        devOpsRepo: 'https://github.com/talbot/customer-ui-devops',
        jenkinsUrl: 'https://jenkins.talbot.com/customer-ui',
        status: 'In Progress'
      }
    ]
  },
  {
    id: 'ba-2',
    name: 'Claims Management',
    workstream: 'Business Apps',
    currentStage: 'UAT',
    lastUpdated: '2024-08-12',
    nextMilestone: 'Production deployment - Aug 25',
    environments: [
      { name: 'DEV', status: 'Completed', completedDate: '2024-07-20' },
      { name: 'DEV1', status: 'Completed', completedDate: '2024-07-22' },
      { name: 'QA', status: 'Completed', completedDate: '2024-08-01' },
      { name: 'UAT', status: 'In Progress' },
      { name: 'PROD', status: 'Not Started' }
    ],
    components: [
      {
        id: 'cm-api',
        name: 'Claims API',
        type: 'Web API',
        techStack: ['Java Spring', 'PostgreSQL', 'Kafka'],
        githubRepo: 'https://github.com/talbot/claims-api',
        status: 'In Progress'
      }
    ]
  },
  {
    id: 'ba-3',
    name: 'Policy Administration',
    workstream: 'Business Apps',
    currentStage: 'Testing',
    lastUpdated: '2024-08-14',
    environments: [
      { name: 'DEV', status: 'Completed' },
      { name: 'QA', status: 'In Progress' },
      { name: 'UAT', status: 'Not Started' },
      { name: 'PROD', status: 'Not Started' }
    ],
    components: []
  },
  
  // Data & Analytics (7 apps)
  {
    id: 'da-1',
    name: 'Data Warehouse',
    workstream: 'Data & Analytics',
    currentStage: 'Development',
    lastUpdated: '2024-08-13',
    environments: [
      { name: 'DEV', status: 'In Progress' },
      { name: 'QA', status: 'Not Started' },
      { name: 'PROD', status: 'Not Started' }
    ],
    components: [
      {
        id: 'dw-etl',
        name: 'ETL Pipeline',
        type: 'Service',
        techStack: ['Apache Spark', 'Python', 'Snowflake'],
        status: 'In Progress'
      }
    ]
  },
  {
    id: 'da-2',
    name: 'Analytics Dashboard',
    workstream: 'Data & Analytics',
    currentStage: 'Planning',
    lastUpdated: '2024-08-15',
    environments: [
      { name: 'DEV', status: 'Not Started' },
      { name: 'QA', status: 'Not Started' },
      { name: 'PROD', status: 'Not Started' }
    ],
    components: []
  },
  
  // Research & Modelling (2 apps)
  {
    id: 'rm-1',
    name: 'Risk Modeling Engine',
    workstream: 'Research & Modelling',
    currentStage: 'Completed',
    lastUpdated: '2024-08-05',
    environments: [
      { name: 'DEV', status: 'Completed', completedDate: '2024-07-10' },
      { name: 'QA', status: 'Completed', completedDate: '2024-07-20' },
      { name: 'PROD', status: 'Completed', completedDate: '2024-08-05' }
    ],
    components: [
      {
        id: 'rme-api',
        name: 'Risk API',
        type: 'Web API',
        techStack: ['Python', 'FastAPI', 'MongoDB'],
        status: 'Completed'
      }
    ]
  },
  {
    id: 'rm-2',
    name: 'Pricing Models',
    workstream: 'Research & Modelling',
    currentStage: 'UAT',
    lastUpdated: '2024-08-11',
    environments: [
      { name: 'DEV', status: 'Completed' },
      { name: 'QA', status: 'Completed' },
      { name: 'UAT', status: 'In Progress' },
      { name: 'PROD', status: 'Not Started' }
    ],
    components: []
  }
];

// Add more apps to reach the required numbers
for (let i = 4; i <= 15; i++) {
  mockApplications.push({
    id: `ba-${i}`,
    name: `Business App ${i}`,
    workstream: 'Business Apps',
    currentStage: i % 3 === 0 ? 'Completed' : i % 2 === 0 ? 'Testing' : 'Development',
    lastUpdated: '2024-08-15',
    environments: [
      { name: 'DEV', status: 'Completed' },
      { name: 'QA', status: i % 2 === 0 ? 'In Progress' : 'Not Started' },
      { name: 'PROD', status: 'Not Started' }
    ],
    components: []
  });
}

for (let i = 3; i <= 7; i++) {
  mockApplications.push({
    id: `da-${i}`,
    name: `Analytics App ${i}`,
    workstream: 'Data & Analytics',
    currentStage: i % 2 === 0 ? 'Development' : 'Planning',
    lastUpdated: '2024-08-15',
    environments: [
      { name: 'DEV', status: i % 2 === 0 ? 'In Progress' : 'Not Started' },
      { name: 'QA', status: 'Not Started' },
      { name: 'PROD', status: 'Not Started' }
    ],
    components: []
  });
}

export const workstreamStats: WorkstreamStats[] = [
  {
    name: 'Business Apps',
    totalApps: 15,
    completedApps: 3,
    inProgressApps: 8,
    notStartedApps: 4
  },
  {
    name: 'Data & Analytics',
    totalApps: 7,
    completedApps: 0,
    inProgressApps: 2,
    notStartedApps: 5
  },
  {
    name: 'Research & Modelling',
    totalApps: 2,
    completedApps: 1,
    inProgressApps: 1,
    notStartedApps: 0
  }
];