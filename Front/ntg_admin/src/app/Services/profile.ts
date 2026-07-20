import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminProfile, ChangePasswordRequest, UpdateProfileRequest } from '../Models/admin-profile';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private apiUrl = 'http://localhost:8080/api/profile';

  constructor(private http: HttpClient) {}

  getMyProfile(): Observable<AdminProfile> {
    return this.http.get<AdminProfile>(`${this.apiUrl}/me`);
  }

  updateMyProfile(request: UpdateProfileRequest): Observable<AdminProfile> {
    return this.http.put<AdminProfile>(`${this.apiUrl}/me`, request);
  }

  changePassword(request: ChangePasswordRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/change-password`, request);
  }
}
