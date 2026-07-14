export interface EngineerFeedbackModel {
  id: number;
  feedbackDate: string;
  feedback: string;
  notes: string | null;
  byUserFirstName: string;
  byUserLastName: string;
}

export interface CreateEngineerFeedbackRequest {
  userId: number;
  teacherId: number;
  feedbackDate: string;
  feedback: string;
  notes?: string;
  rate: number;
}