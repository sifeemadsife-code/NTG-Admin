export interface StudentSubject {
  subjectName: string;
  midterm: number | null;
  finalScore: number | null;
  total: number;
}

export interface StudentDetails {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  grade: string | null;
  studentNumber: number;
  attendanceRate: number;
  assignmentsDone: number;
  violationsCount: number;
  classRank: number;
  subjects: StudentSubject[];
}