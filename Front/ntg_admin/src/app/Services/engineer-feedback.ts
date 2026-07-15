import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EngineerFeedbackModel, CreateEngineerFeedbackRequest } from '../Models/engineer-feedback';

@Injectable({ providedIn: 'root' })
export class EngineerFeedbackService {
  private apiUrl = 'http://localhost:8080/api/engineer-feedback';

  constructor(private http: HttpClient) {}

  getByTeacher(teacherId: number): Observable<EngineerFeedbackModel[]> {
    return this.http.get<EngineerFeedbackModel[]>(`${this.apiUrl}/teacher/${teacherId}`);
  }

  create(request: CreateEngineerFeedbackRequest): Observable<EngineerFeedbackModel> {
    return this.http.post<EngineerFeedbackModel>(this.apiUrl, request);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getFeedbackCount(id: number) {
    return this.http.get<number>(`${this.apiUrl}/teacher/${id}/count`);
  }
}
