import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SuccessMessageService } from './success-message';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  private successMessage = inject(SuccessMessageService);

  async logout(): Promise<void> {
    if (!(await this.successMessage.confirm('Are you sure you want to log out?', 'Log out?'))) return;

    this.clearSession();
    this.successMessage.show('Logged out successfully.');
    this.router.navigate(['/']);
  }

  clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? Number(id) : null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = token.split('.')[1];
    if (!payload) return true;

    try {
      const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
      const { exp } = JSON.parse(atob(normalizedPayload));
      return !exp || exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}
