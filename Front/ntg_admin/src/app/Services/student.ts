import { Injectable } from '@angular/core';
import { StudentsList } from '../Components/students-list/students-list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentsListInterface } from '../Models/Students_list';

@Injectable({
  providedIn: 'root',
})
export class Student {
    private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}
  getAllStudents() : Observable<StudentsListInterface>{
    return this.http.get<StudentsListInterface>(`${this.apiUrl}/students`)
  }
}
