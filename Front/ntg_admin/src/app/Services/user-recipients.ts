import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RecipientModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roleName: string;
}

@Injectable({ providedIn: 'root' })
export class UserRecipientsService {
  private apiUrl = 'http://localhost:8080/api/users/recipients';
  constructor(private http: HttpClient) {}

  getRecipients(): Observable<RecipientModel[]> {
    return this.http.get<RecipientModel[]>(this.apiUrl);
  }
}
