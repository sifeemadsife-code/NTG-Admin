import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GradeModel } from '../Models/grade';

@Injectable({ providedIn: 'root' })
export class GradeService {
  private apiUrl = 'http://localhost:8080/api/grades';

  constructor(private http: HttpClient) {}

  getAllGrades(): Observable<GradeModel[]> {
    return this.http.get<GradeModel[]>(this.apiUrl);
  }
}