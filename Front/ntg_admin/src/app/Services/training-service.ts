import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Training } from '../Models/Training';
import { TrainingProgramList } from '../Models/training_program_list';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private apiUrl = 'http://localhost:8080/api/training-programs';

  constructor(private http: HttpClient) {}
  getProgram(id:number): Observable<Training> {
    return this.http.get<Training>(`${this.apiUrl}/${id}`);
  }
  getTrainingPrograms(): Observable<TrainingProgramList[]>{
    return this.http.get<TrainingProgramList[]>(`${this.apiUrl}`)
  }
}
