export interface StudentFeedbackModel {
  id: number;
  studentId: number;
  studentFirstName: string;
  studentLastName: string;
  userId: number;
  userFirstName: string;
  userLastName: string;
  feedbackDate: string;
  performanceNotes: string;
  behaviorNotes: string | null;
  recommendations: string | null;
}

export interface CreateStudentFeedbackRequest {
  studentId: number;
  userId: number;
  feedbackDate: string;
  performanceNotes: string;
  behaviorNotes?: string;
  recommendations?: string;
}