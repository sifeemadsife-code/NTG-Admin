import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Engineer } from '../models/engineer';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EngineerService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEngineer(id: number): Observable<Engineer> {
    return this.http.get<Engineer>(
      `${this.apiUrl}/engineers/${id}`
    );
  }
}