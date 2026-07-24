import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { SuccessMessageService } from '../../Services/success-message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  loginForm: FormGroup;

  hidePassword = true;

  constructor(
    private forms: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private successMessage: SuccessMessageService,
  ) {
    this.loginForm = this.forms.group({
      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  isPassword() {
    this.hidePassword = !this.hidePassword;
  }

  login() {
    console.log('Login button clicked');

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.successMessage.showError(this.successMessage.validationMessage(this.loginForm, {
        email: 'Email', password: 'Password',
      }));
      return;
    }

    const body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.http
      .post('http://localhost:8080/api/auth/login', body, {
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe({
        next: (res: any) => {
          console.log('Login Success', res);

          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
          localStorage.setItem('userId', String(res.userId));
          localStorage.setItem('name', `${res.firstName} ${res.lastName}`);

          this.successMessage.show('Logged in successfully!');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          const message =
            error.status === 401
              ? 'Invalid email or password.'
              : error.error?.message || 'Login failed. Please try again.';
          this.successMessage.showError(message);
        },
      });
  }
}
