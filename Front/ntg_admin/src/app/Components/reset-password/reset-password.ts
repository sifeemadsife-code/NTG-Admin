import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../Services/profile';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../sidebar/sidebar";
import { RouterLink } from '@angular/router';
import { SuccessMessageService } from '../../Services/success-message';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  passwordError = signal('');
  changingPassword = signal(false);
  constructor(
    private profileService: ProfileService,
    private successMessage: SuccessMessageService,
  ) {}
  private fb = inject(FormBuilder);
  passwordForm: FormGroup = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  });
  changePassword(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      this.successMessage.showError(this.successMessage.validationMessage(this.passwordForm, {
        currentPassword: 'Current Password', newPassword: 'New Password', confirmPassword: 'Confirm New Password',
      }));
      return;
    }

    const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

    if (newPassword !== confirmPassword) {
      this.passwordError.set('New password and confirmation do not match.');
      return;
    }

    this.changingPassword.set(true);
    this.passwordError.set('');

    this.profileService.changePassword({ currentPassword, newPassword }).subscribe({
      next: () => {
        this.changingPassword.set(false);
        this.passwordForm.reset();
        this.successMessage.show('Password changed successfully.');
      },
      error: (err) => {
        this.changingPassword.set(false);
        this.passwordError.set(err?.error?.message || 'Failed to change password.');
        console.log(err);
      },
    });
  }
}
