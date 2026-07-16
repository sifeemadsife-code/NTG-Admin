import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationModel, CreateNotificationRequest } from '../Models/notification';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private apiUrl = 'http://localhost:8080/api/notifications';

  constructor(private http: HttpClient) {}

  getUserNotifications(userId: number): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(`${this.apiUrl}/user/${userId}`);
  }

  getUserNotificationsCount(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/user/${userId}/count`);
  }

  create(request: CreateNotificationRequest): Observable<NotificationModel[]> {
    return this.http.post<NotificationModel[]>(this.apiUrl, request);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}