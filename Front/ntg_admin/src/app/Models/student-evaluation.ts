export interface StudentEvaluationModel {
  id: number;
  studentId: number;
  studentFirstName: string;
  studentLastName: string;
  userId: number;
  userFirstName: string;
  userLastName: string;
  trainingProgramId: number;
  trainingProgramName: string;
  evaluationDate: string;
  score: number | null;
  evaluationText: string;
  evaluationNote: string | null;
} 

export interface CreateStudentEvaluationRequest {
  studentId: number;
  userId: number;
  trainingProgramId: number;
  evaluationDate: string;
  score: number | null;
  evaluationText: string;
  evaluationNote?: string;
}
export interface UpdateStudentEvaluationRequest{
  score: number | null;
  evaluationText: string;
  evaluationNote?: string;
}