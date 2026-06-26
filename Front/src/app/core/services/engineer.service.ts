import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EngineerService {
  private apiUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) { }

  getEngineerProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/engineer/12000`);
  }

  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/documents`);
  }

  deleteDocument(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/documents/${id}`);
  }
}