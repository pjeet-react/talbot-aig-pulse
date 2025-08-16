import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatCard } from '@/components/StatCard';
import { ApplicationListCard } from '@/components/ApplicationListCard';
import { ProgressBar } from '@/components/ProgressBar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { mockApplications, workstreamStats } from '@/data/mockData';
import { 
  Building2, 
  BarChart3, 
  FlaskConical, 
  Activity, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

const Index = () => {
  const [selectedWorkstream, setSelectedWorkstream] = useState<string>('overview');
  
  // Calculate overall stats
  const totalApps = workstreamStats.reduce((sum, ws) => sum + ws.totalApps, 0);
  const completedApps = workstreamStats.reduce((sum, ws) => sum + ws.completedApps, 0);
  const inProgressApps = workstreamStats.reduce((sum, ws) => sum + ws.inProgressApps, 0);
  const notStartedApps = workstreamStats.reduce((sum, ws) => sum + ws.notStartedApps, 0);
  
  const getWorkstreamIcon = (name: string) => {
    switch (name) {
      case 'Business Apps':
        return Building2;
      case 'Data & Analytics':
        return BarChart3;
      case 'Research & Modelling':
        return FlaskConical;
      default:
        return Activity;
    }
  };

  const filterApplicationsByWorkstream = (workstream: string) => {
    if (workstream === 'overview') return mockApplications;
    return mockApplications.filter(app => app.workstream === workstream);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Talbot to AIG Migration Dashboard</h1>
              <p className="text-muted-foreground">Real-time migration progress tracking</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Activity className="h-4 w-4 animate-pulse-glow text-primary" />
                <span>Live Status</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Applications"
            value={totalApps}
            subtitle="Across all workstreams"
            icon={Activity}
            trend="neutral"
            className="animate-fade-in"
          />
          <StatCard
            title="Completed"
            value={completedApps}
            subtitle={`${Math.round((completedApps / totalApps) * 100)}% complete`}
            icon={CheckCircle}
            trend="up"
            className="animate-fade-in"
          />
          <StatCard
            title="In Progress"
            value={inProgressApps}
            subtitle="Active migrations"
            icon={Clock}
            trend="neutral"
            className="animate-fade-in"
          />
          <StatCard
            title="Not Started"
            value={notStartedApps}
            subtitle="Pending migration"
            icon={AlertTriangle}
            trend="down"
            className="animate-fade-in"
          />
        </div>

        {/* Workstream Progress */}
        <Card className="mb-8 bg-gradient-card border-border/50 shadow-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              Workstream Progress Overview
            </CardTitle>
            <CardDescription>Migration status across all workstreams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {workstreamStats.map((workstream) => {
                const Icon = getWorkstreamIcon(workstream.name);
                return (
                  <div key={workstream.name} className="space-y-3">
                    <div className="flex items-center">
                      <Icon className="h-5 w-5 mr-2 text-primary" />
                      <h3 className="font-semibold text-foreground">{workstream.name}</h3>
                    </div>
                    <ProgressBar
                      value={workstream.completedApps}
                      max={workstream.totalApps}
                      showLabel={false}
                    />
                    <div className="text-sm text-muted-foreground">
                      {workstream.completedApps} completed, {workstream.inProgressApps} in progress, {workstream.notStartedApps} not started
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Applications by Workstream */}
        <Tabs value={selectedWorkstream} onValueChange={setSelectedWorkstream} className="animate-fade-in">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="overview">All Applications</TabsTrigger>
            <TabsTrigger value="Business Apps">Business Apps</TabsTrigger>
            <TabsTrigger value="Data & Analytics">Data & Analytics</TabsTrigger>
            <TabsTrigger value="Research & Modelling">Research & Modelling</TabsTrigger>
          </TabsList>
          
          <TabsContent value={selectedWorkstream} className="mt-6">
            <div className="space-y-4">
              {filterApplicationsByWorkstream(selectedWorkstream).map((app, index) => (
                <ApplicationListCard
                  key={app.id}
                  application={app}
                  className="animate-fade-in"
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
