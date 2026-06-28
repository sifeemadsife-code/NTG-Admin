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
    return this.http.get<Engineer>(`${this.apiUrl}/engineers/${id}`);
  }

  getEngineerCards(id: number): Observable<EngineerCards> {
    return this.http.get<EngineerCards>(`${this.apiUrl}/engineers/${id}/cards`);
  }

  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/documents`);
  }

  deleteDocument(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/documents/${id}`);
  }
}