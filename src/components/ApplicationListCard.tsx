import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { StatusBadge } from './StatusBadge';
import { ProgressBar } from './ProgressBar';
import { TechStackIcon } from './TechStackIcon';
import { Application } from '@/types/migration';
import { 
  ChevronDown, 
  ChevronRight, 
  ExternalLink, 
  GitBranch, 
  Calendar,
  Package,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApplicationListCardProps {
  application: Application;
  className?: string;
}

export function ApplicationListCard({ application, className }: ApplicationListCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set());

  const completedEnvs = application.environments.filter(env => env.status === 'Completed').length;
  const totalEnvs = application.environments.length;

  const togglePhase = (phaseId: string) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phaseId)) {
      newExpanded.delete(phaseId);
    } else {
      newExpanded.add(phaseId);
    }
    setExpandedPhases(newExpanded);
  };

  const getTechStackColor = (tech: string) => {
    const colorMap: Record<string, string> = {
      'React': 'text-blue-400',
      'TypeScript': 'text-blue-300',
      '.NET Core': 'text-purple-400',
      'Java Spring': 'text-green-400',
      'Python': 'text-yellow-400',
      'SQL Server': 'text-red-400',
      'PostgreSQL': 'text-indigo-400',
      'Angular': 'text-red-500',
    };
    return colorMap[tech] || 'text-muted-foreground';
  };

  return (
    <Card className={cn('bg-gradient-card border-border/50 shadow-card hover:shadow-elevated transition-all duration-300', className)}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <div className="w-full p-4 cursor-pointer hover:bg-muted/5 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="flex items-center space-x-2">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  <Package className="h-5 w-5 text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-foreground">{application.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {application.workstream}
                    </Badge>
                    <StatusBadge status={application.currentStage} />
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <ProgressBar value={completedEnvs} max={totalEnvs} className="w-32" />
                      <span className="text-sm text-muted-foreground">
                        {completedEnvs}/{totalEnvs} envs
                      </span>
                    </div>
                    
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {application.lastUpdated}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4">
            {/* Phases Section */}
            {application.phases && application.phases.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
                  <Layers className="h-4 w-4 mr-2 text-primary" />
                  Phases
                </h4>
                <div className="space-y-2">
                  {application.phases.map((phase) => {
                    const phaseCompletedEnvs = phase.environments.filter(env => env.status === 'Completed').length;
                    const phaseTotalEnvs = phase.environments.length;
                    const isPhaseExpanded = expandedPhases.has(phase.id);
                    
                    return (
                      <div key={phase.id} className="ml-4 border-l-2 border-border/30 pl-4">
                        <Collapsible open={isPhaseExpanded} onOpenChange={() => togglePhase(phase.id)}>
                          <CollapsibleTrigger asChild>
                            <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/10 cursor-pointer">
                              <div className="flex items-center space-x-2">
                                {isPhaseExpanded ? (
                                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                ) : (
                                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                                )}
                                <span className="text-sm font-medium text-foreground">{phase.name}</span>
                                {phase.description && (
                                  <span className="text-xs text-muted-foreground">- {phase.description}</span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <ProgressBar value={phaseCompletedEnvs} max={phaseTotalEnvs} className="w-20" />
                                <span className="text-xs text-muted-foreground">
                                  {phaseCompletedEnvs}/{phaseTotalEnvs}
                                </span>
                              </div>
                            </div>
                          </CollapsibleTrigger>
                          
                          <CollapsibleContent>
                            <div className="ml-4 mt-2 space-y-3">
                              {/* Phase Environments */}
                              <div className="flex flex-wrap gap-1">
                                {phase.environments.map((env) => (
                                  <StatusBadge
                                    key={env.name}
                                    status={env.status}
                                    className="text-xs"
                                  />
                                ))}
                              </div>
                              
                              {/* Phase Components */}
                              {phase.components.map((component) => (
                                <div key={component.id} className="p-3 rounded-lg bg-muted/5 border border-border/20">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-foreground">{component.name}</span>
                                    <StatusBadge status={component.status} className="text-xs" />
                                  </div>
                                  
                                  {/* Tech Stack with Icons */}
                                  {component.techStack.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-2">
                                      {component.techStack.map((tech) => (
                                        <div key={tech} className="flex items-center space-x-1">
                                          <TechStackIcon tech={tech} className={getTechStackColor(tech)} />
                                          <span className="text-xs text-muted-foreground">{tech}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  
                                  {/* Links */}
                                  <div className="flex flex-wrap gap-2">
                                    {component.githubRepo && (
                                      <Button size="sm" variant="outline" className="h-6 px-2 text-xs" asChild>
                                        <a href={component.githubRepo} target="_blank" rel="noopener noreferrer">
                                          <GitBranch className="h-3 w-3 mr-1" />
                                          GitHub
                                        </a>
                                      </Button>
                                    )}
                                    {component.jenkinsUrl && (
                                      <Button size="sm" variant="outline" className="h-6 px-2 text-xs" asChild>
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
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Main Components Section */}
            {application.components.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
                  <Package className="h-4 w-4 mr-2 text-primary" />
                  Components
                </h4>
                <div className="space-y-2">
                  {application.components.map((component) => (
                    <div key={component.id} className="p-3 rounded-lg bg-muted/10 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">{component.name}</span>
                        <StatusBadge status={component.status} className="text-xs" />
                      </div>
                      
                      {/* Tech Stack with Icons */}
                      {component.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {component.techStack.map((tech) => (
                            <div key={tech} className="flex items-center space-x-1">
                              <TechStackIcon tech={tech} className={getTechStackColor(tech)} />
                              <span className="text-xs text-muted-foreground">{tech}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Links */}
                      <div className="flex flex-wrap gap-2">
                        {component.githubRepo && (
                          <Button size="sm" variant="outline" className="h-6 px-2 text-xs" asChild>
                            <a href={component.githubRepo} target="_blank" rel="noopener noreferrer">
                              <GitBranch className="h-3 w-3 mr-1" />
                              GitHub
                            </a>
                          </Button>
                        )}
                        {component.devOpsRepo && (
                          <Button size="sm" variant="outline" className="h-6 px-2 text-xs" asChild>
                            <a href={component.devOpsRepo} target="_blank" rel="noopener noreferrer">
                              <GitBranch className="h-3 w-3 mr-1" />
                              DevOps
                            </a>
                          </Button>
                        )}
                        {component.jenkinsUrl && (
                          <Button size="sm" variant="outline" className="h-6 px-2 text-xs" asChild>
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

            {/* Environment Progress */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Overall Environment Progress</h4>
              <div className="flex flex-wrap gap-1">
                {application.environments.map((env) => (
                  <StatusBadge
                    key={env.name}
                    status={env.status}
                    className="text-xs"
                  />
                ))}
              </div>
            </div>

            {/* Next Milestone */}
            {application.nextMilestone && (
              <div className="pt-2 border-t border-border/30">
                <div className="text-sm text-primary font-medium">
                  Next: {application.nextMilestone}
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}