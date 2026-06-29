import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Engineer } from '../Models/engineer';
import { EngineerCards } from '../Models/engineer-cards';

@Injectable({
  providedIn: 'root',
})
export class EngineerService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getEngineer(id: number): Observable<Engineer> {
    return this.http.get<Engineer>(`${this.apiUrl}/teachers/${id}`);
  }
  updateEngineer(id: number, newEngineer: Engineer) {
  return this.http.put(`${this.apiUrl}/teachers/${id}`, newEngineer);
}
  getEngineerCards(id: number): Observable<EngineerCards> {
    return this.http.get<EngineerCards>(`${this.apiUrl}/teachers/${id}/dashboard`);
  }

  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/documents`);
  }

  deleteDocument(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/documents/${id}`);
  }
}