import { Engineer } from './../Models/engineer';
import { AddEngineer } from './../Components/add-engineer/add-engineer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EngineerCards } from '../Models/engineer-cards';
import { CreateEngineer } from '../Models/create_engineer';

@Injectable({
  providedIn: 'root',
})
export class EngineerService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}
  getAllEngineers() : Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/teachers`)
  }
  getAllEngineersCount() : Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/teachers/count`)
  }
  getEngineer(id: number): Observable<Engineer> {
    return this.http.get<Engineer>(`${this.apiUrl}/teachers/${id}`);
  }
  updateEngineer(id: number, newEngineer: Engineer) {
    return this.http.put(`${this.apiUrl}/teachers/${id}`, newEngineer);
  }
  getEngineerCards(id: number): Observable<EngineerCards> {
    return this.http.get<EngineerCards>(`${this.apiUrl}/teachers/${id}/dashboard`);
  }
  deleteEngineer(id: number){
    return this.http.delete(`${this.apiUrl}/teachers/${id}`);
  }
  addEngineer(engineer: CreateEngineer): Observable<Engineer>{
    return this.http.post<Engineer>(`${this.apiUrl}/teachers`, engineer);
  }
}