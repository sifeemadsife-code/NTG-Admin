import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentFeedbackModel, CreateStudentFeedbackRequest } from '../Models/student-feedback';

@Injectable({ providedIn: 'root' })
export class StudentFeedbackService {
  private apiUrl = 'http://localhost:8080/api/student-feedback';

  constructor(private http: HttpClient) {}

  getAll(): Observable<StudentFeedbackModel[]> {
    return this.http.get<StudentFeedbackModel[]>(this.apiUrl);
  }

  getByStudent(studentId: number): Observable<StudentFeedbackModel[]> {
    return this.http.get<StudentFeedbackModel[]>(`${this.apiUrl}/student/${studentId}`);
  }

  create(request: CreateStudentFeedbackRequest): Observable<StudentFeedbackModel> {
    return this.http.post<StudentFeedbackModel>(this.apiUrl, request);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}