export interface Training {
  id: number;
  name: string;
  description: string;
  status: string;

  totalStudents: number;
  assignedEngineers: number;
  attendanceRate: number;
  averageProgress: number;
  averageScore: number;

  category: string;
  level: string;
  startDate: string;
  endDate: string;
  duration: string;
  trainingHours: number;
  capacity: number;

  attendanceTrend: number[];
  performanceDistribution: number[];
}
