export interface PerformanceGoal {
  id: number;
  employeeName: string;
  goal: string;
  dueDate: string;
  progress: number;
  status: 'completed' | 'inProgress' | 'notStarted';
}
export interface TeamPerformance {
  department: string;
  teamSize: number;
  averageScore: number;
  goalCompletion: number;
  trend: 'up' | 'down' | 'stable';
}
export interface PerformanceGoalCreate extends Omit<PerformanceGoal, 'id'> {}
export interface PerformanceGoalUpdate extends Partial<PerformanceGoal> {}