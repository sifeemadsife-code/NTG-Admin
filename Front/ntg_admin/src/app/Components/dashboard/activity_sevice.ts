import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from './Activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private readonly API_URL = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) {}

  getRecentActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.API_URL);
  }

  seedData(): Observable<string> {
    return this.http.post<string>(`${this.API_URL}/seed`, {});
  }
}