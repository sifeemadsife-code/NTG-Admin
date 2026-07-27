import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Training } from '../Models/Training';
import { TrainingProgramList } from '../Models/training_program_list';
import { StudentsListInterface } from '../Models/Students_list';

export interface CreateTrainingProgramRequest {
  teacherId: number;
  userId: number;
  gradeId: number;
  programName: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location?: string;
}
export interface UpdateTrainingProgramRequest {
  programName: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private apiUrl = 'http://localhost:8080/api/training-programs';

  constructor(private http: HttpClient) {}

  getProgram(id: number): Observable<Training> {
    return this.http.get<Training>(`${this.apiUrl}/${id}`);
  }

  getTrainingPrograms(): Observable<TrainingProgramList[]> {
    return this.http.get<TrainingProgramList[]>(`${this.apiUrl}`);
  }

  getProgramsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  getProgramStudents(id: number): Observable<StudentsListInterface[]> {
    return this.http.get<StudentsListInterface[]>(`${this.apiUrl}/${id}/students`);
  }

  createProgram(data: CreateTrainingProgramRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  updateProgram(id: number, data: UpdateTrainingProgramRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteProgram(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
