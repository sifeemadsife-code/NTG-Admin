import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Training } from '../Models/Training';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private apiUrl = 'http://localhost:8080/api/training-programs/1';

  constructor(private http: HttpClient) {}
  getProgram(): Observable<Training> {
    return this.http.get<Training>(this.apiUrl);
  }

}
