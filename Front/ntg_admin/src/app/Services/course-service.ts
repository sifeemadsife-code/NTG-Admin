import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface CourseResponseDTO {
  id: number;
  teacherId: number;
  teacherFirstName: string;
  teacherLastName: string;
  termId: number;
  courseType: string;
  courseName: string;
  description: string;
  studyPlan: string;
}

export interface CreateCourseRequestDTO {
  teacherId: number;
  termId: number;
  courseName: string;
  description: string;
  studyPlan: string;
}

export interface UpdateCourseRequestDTO {
  teacherId: number;
  termId: number;
  courseName: string;
  description: string;
  studyPlan: string;
}
@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = 'http://localhost:8080/api/courses';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<CourseResponseDTO> {
    return this.http.get<CourseResponseDTO>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  create(course: CreateCourseRequestDTO): Observable<CourseResponseDTO> {
    return this.http.post<CourseResponseDTO>(this.apiUrl, course, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  update(id: number, course: UpdateCourseRequestDTO): Observable<CourseResponseDTO> {
    return this.http.put<CourseResponseDTO>(`${this.apiUrl}/${id}`, course, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      message = `Client error: ${error.error.message}`;
    } else {
      message = `Server error ${error.status}: ${error.error?.message || error.message}`;
    }
    console.error(message);
    return throwError(() => new Error(message));
  }
}