export interface Training {
  id: number;
  teacherId: number;
  teacherFirstName: string;
  teacherLastName: string;
  gradeId: number;
  gradeName: string;
  programName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  createdAt: Date;
  totalStudents: number;
}