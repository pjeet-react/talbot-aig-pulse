import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './StatusBadge';
import { ProgressBar } from './ProgressBar';
import { Application } from '@/types/migration';
import { ExternalLink, GitBranch, Settings, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApplicationCardProps {
  application: Application;
  className?: string;
  style?: React.CSSProperties;
}

export function ApplicationCard({ application, className, style }: ApplicationCardProps) {
  const completedEnvs = application.environments.filter(env => env.status === 'Completed').length;
  const totalEnvs = application.environments.length;

  const getTechStackColor = (tech: string) => {
    // Simple color mapping for common technologies
    const colorMap: Record<string, string> = {
      'React': 'bg-blue-500/20 text-blue-400',
      'TypeScript': 'bg-blue-600/20 text-blue-300',
      '.NET Core': 'bg-purple-500/20 text-purple-400',
      'Java Spring': 'bg-green-500/20 text-green-400',
      'Python': 'bg-yellow-500/20 text-yellow-400',
      'SQL Server': 'bg-red-500/20 text-red-400',
      'PostgreSQL': 'bg-indigo-500/20 text-indigo-400'
    };
    return colorMap[tech] || 'bg-muted/20 text-muted-foreground';
  };

  return (
    <Card className={cn('bg-gradient-card border-border/50 shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in', className)} style={style}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">{application.name}</CardTitle>
            <CardDescription className="text-muted-foreground mt-1">
              {application.workstream}
            </CardDescription>
          </div>
          <StatusBadge status={application.currentStage} />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Environment Progress */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Environment Progress</h4>
          <ProgressBar value={completedEnvs} max={totalEnvs} />
          <div className="flex flex-wrap gap-1 mt-2">
            {application.environments.map((env) => (
              <StatusBadge
                key={env.name}
                status={env.status}
                className="text-xs"
              />
            ))}
          </div>
        </div>

        {/* Components */}
        {application.components.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Components</h4>
            <div className="space-y-2">
              {application.components.map((component) => (
                <div key={component.id} className="p-3 rounded-lg bg-muted/10 border border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{component.name}</span>
                    <StatusBadge status={component.status} className="text-xs" />
                  </div>
                  
                  {/* Tech Stack */}
                  {component.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {component.techStack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className={cn('text-xs', getTechStackColor(tech))}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex flex-wrap gap-2">
                    {component.githubRepo && (
                      <Button size="sm" variant="outline" className="h-7 px-2 text-xs" asChild>
                        <a href={component.githubRepo} target="_blank" rel="noopener noreferrer">
                          <GitBranch className="h-3 w-3 mr-1" />
                          Source
                        </a>
                      </Button>
                    )}
                    {component.devOpsRepo && (
                      <Button size="sm" variant="outline" className="h-7 px-2 text-xs" asChild>
                        <a href={component.devOpsRepo} target="_blank" rel="noopener noreferrer">
                          <Settings className="h-3 w-3 mr-1" />
                          DevOps
                        </a>
                      </Button>
                    )}
                    {component.jenkinsUrl && (
                      <Button size="sm" variant="outline" className="h-7 px-2 text-xs" asChild>
                        <a href={component.jenkinsUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Jenkins
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/30">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            Updated: {application.lastUpdated}
          </div>
          {application.nextMilestone && (
            <div className="text-primary font-medium">
              {application.nextMilestone}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}