export interface NotificationModel {
  id: number;
  title: string;
  type: string;
  priority: string;
  body: string;
  sentAt: string;
  senderId: number;
  senderFirstName: string;
  senderLastName: string;
  sentToId: number;
  sentToFirstName: string;
  sentToLastName: string;
}

export interface CreateNotificationRequest {
  userId: number;
  title: string;
  type: string;
  priority: string;
  body: string;
  sentToIds: number[];
}