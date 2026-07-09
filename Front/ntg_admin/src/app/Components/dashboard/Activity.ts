export enum ActivityType {
  REPORT = 'REPORT',
  DEVELOPMENT = 'DEVELOPMENT',
  INCIDENT = 'INCIDENT',
  TRAINING = 'TRAINING',
  MESSAGE = 'MESSAGE',
  USER = 'USER'
}

export interface Activity {
  id: number;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string; 
  icon: string;
  color: string;
}