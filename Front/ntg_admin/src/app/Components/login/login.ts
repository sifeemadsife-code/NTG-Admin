import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  loginForm: FormGroup;

  hidePassword = true;

  constructor(
    private forms: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {

    this.loginForm = this.forms.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]

    });

  }
  isPassword() {
    this.hidePassword = !this.hidePassword;
  }

login() {
  console.log('Login button clicked');

  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  const body = {
    email: this.loginForm.value.email,      // <-- email
    password: this.loginForm.value.password
  };

  this.http.post('http://localhost:8080/api/auth/login', body, {
    headers: { 'Content-Type': 'application/json' }
  }).subscribe({
next: (res: any) => {
  console.log("Login Success", res);

  localStorage.setItem('token', res.token);
  localStorage.setItem('role', res.role);

  this.router.navigate(['/dashboard']);
}
  });
}
}