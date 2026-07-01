export interface Training {
  id: number;
  teacherId: number;
  teacherFirstName: string;
  teacherLastName: string;
  programName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  createdAt: Date;
  totalStudents: number;
}
