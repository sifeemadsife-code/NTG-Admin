import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportModel, CreateReportRequest } from '../Models/report';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private apiUrl = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ReportModel[]> {
    return this.http.get<ReportModel[]>(this.apiUrl);
  }

  getInbox(userId: number): Observable<ReportModel[]> {
    return this.http.get<ReportModel[]>(`${this.apiUrl}/inbox/${userId}`);
  }

  getSent(userId: number): Observable<ReportModel[]> {
    return this.http.get<ReportModel[]>(`${this.apiUrl}/sent/${userId}`);
  }

  create(request: CreateReportRequest): Observable<ReportModel> {
    return this.http.post<ReportModel>(this.apiUrl, request);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}