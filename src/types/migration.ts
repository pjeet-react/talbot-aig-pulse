export interface Application {
  id: string;
  name: string;
  workstream: 'Business Apps' | 'Data & Analytics' | 'Research & Modelling';
  currentStage: 'Not Started' | 'Planning' | 'Development' | 'Testing' | 'UAT' | 'Production' | 'Completed';
  environments: Environment[];
  components: Component[];
  lastUpdated: string;
  nextMilestone?: string;
  phases?: Phase[];
}

export interface Phase {
  id: string;
  name: string;
  description?: string;
  environments: Environment[];
  components: Component[];
}

export interface Environment {
  name: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Failed';
  url?: string;
  completedDate?: string;
}

export interface Component {
  id: string;
  name: string;
  type: 'Web API' | 'UI' | 'Database' | 'Service' | 'Function';
  techStack: string[];
  endpoints?: string[];
  githubRepo?: string;
  devOpsRepo?: string;
  jenkinsUrl?: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Failed';
}

export interface WorkstreamStats {
  name: string;
  totalApps: number;
  completedApps: number;
  inProgressApps: number;
  notStartedApps: number;
}