import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentEvaluationModel, CreateStudentEvaluationRequest } from '../Models/student-evaluation';

@Injectable({ providedIn: 'root' })
export class StudentEvaluationService {
  private apiUrl = 'http://localhost:8080/api/student-evaluations';

  constructor(private http: HttpClient) {}

  getAll(): Observable<StudentEvaluationModel[]> {
    return this.http.get<StudentEvaluationModel[]>(this.apiUrl);
  }

  getByStudent(studentId: number): Observable<StudentEvaluationModel[]> {
    return this.http.get<StudentEvaluationModel[]>(`${this.apiUrl}/student/${studentId}`);
  }

  create(request: CreateStudentEvaluationRequest): Observable<StudentEvaluationModel> {
    return this.http.post<StudentEvaluationModel>(this.apiUrl, request);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}