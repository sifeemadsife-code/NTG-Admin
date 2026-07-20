import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminProfile as AdminProfileModel } from '../../Models/admin-profile';
import { ProfileService } from '../../Services/profile';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.css',
})
export class AdminProfile implements OnInit {
  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);

  loading = signal(true);
  saving = signal(false);
  error = signal('');
  successMessage = signal('');

  profile = signal<AdminProfileModel | null>(null);

  profileForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    firstNameInArabic: [''],
    lastNameInArabic: [''],
    email: ['', [Validators.required, Validators.email]],
    address: [''],
    gender: [''],
    nationality: [''],
    birthDate: [''],
    religion: [''],
    nationalNumber: [null],
  });

  passwordForm: FormGroup = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  });

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading.set(true);
    this.error.set('');

    this.profileService.getMyProfile().subscribe({
      next: (data) => {
        this.profile.set(data);
        this.profileForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          firstNameInArabic: data.firstNameInArabic,
          lastNameInArabic: data.lastNameInArabic,
          email: data.email,
          address: data.address,
          gender: data.gender,
          nationality: data.nationality,
          birthDate: data.birthDate,
          religion: data.religion,
          nationalNumber: data.nationalNumber,
        });
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load profile.');
        this.loading.set(false);
        console.log(err);
      },
    });
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set('');
    this.successMessage.set('');

    this.profileService.updateMyProfile(this.profileForm.value).subscribe({
      next: (data) => {
        this.profile.set(data);
        this.saving.set(false);
        this.successMessage.set('Profile updated successfully.');
        localStorage.setItem('name', `${data.firstName} ${data.lastName}`);
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set(err?.error?.message || 'Failed to update profile.');
        console.log(err);
      },
    });
  }
}
