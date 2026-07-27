export interface ReportModel {
  id: number;
  userId: number;
  userFirstName: string;
  userLastName: string;
  content: string;
  fileLink: string | null;
  createdAt: string;
  sentToId: number;
  sentToFirstName: string;
  sentToLastName: string;
}

export interface CreateReportRequest {
  userId: number;
  content: string;
  fileLink?: string;
  sentToId: number;
}