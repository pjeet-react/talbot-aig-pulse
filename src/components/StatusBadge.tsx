import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'Not Started' | 'Planning' | 'Development' | 'Testing' | 'UAT' | 'Production' | 'Completed' | 'In Progress' | 'Failed';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'Completed':
        return 'bg-accent/20 text-accent border-accent/30';
      case 'In Progress':
      case 'Production':
      case 'Development':
        return 'bg-status-in-progress/20 text-status-in-progress border-status-in-progress/30';
      case 'Planning':
      case 'Testing':
      case 'UAT':
        return 'bg-status-pending/20 text-status-pending border-status-pending/30';
      case 'Failed':
        return 'bg-status-failed/20 text-status-failed border-status-failed/30';
      case 'Not Started':
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        getStatusStyles(),
        className
      )}
    >
      {status}
    </span>
  );
}