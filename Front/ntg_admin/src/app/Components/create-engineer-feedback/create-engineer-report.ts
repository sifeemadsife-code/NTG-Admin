import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EngineerFeedbackService } from '../../Services/engineer-feedback';
import { EngineerService } from '../../Services/engineer';
import { EngineerList } from '../../Models/engineer_list';
import { SidebarComponent } from "../sidebar/sidebar";
import { SuccessMessageService } from '../../Services/success-message';

@Component({
  selector: 'app-create-engineer-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SidebarComponent],
  templateUrl: './create-engineer-report.html',
  styleUrl: './create-engineer-report.css',
})
export class CreateEngineerReport implements OnInit {
  private fb = inject(FormBuilder);
  private engineerFeedbackService = inject(EngineerFeedbackService);
  private engineerService = inject(EngineerService);
  private router = inject(Router);
  private successMessage = inject(SuccessMessageService);

  engineers = signal<EngineerList[]>([]);
  saving = signal(false);
  error = signal('');
  isSidebarOpen = false;
  form!: FormGroup;
  menuItems = [
    { icon: 'fas fa-home', label: 'Dashboard', route: '/dashboard' },
    { icon: 'fas fa-users-cog', label: 'Engineers', route: '/engineersList', active: true },
    { icon: 'fas fa-user-graduate', label: 'Students', route: '/studentsList' },
    { icon: 'fas fa-chart-bar', label: 'Reports', route: '/reports' },
    { icon: 'fas fa-book', label: 'Training Program', route: '/trainingProgramsList' },
    { icon: 'fas fa-book-open', label: 'Subjects', route: '/subjects' },
    { icon: 'fas fa-bell', label: 'Notification', route: '/notification' },
    { icon: 'fas fa-cog', label: 'Settings', route: '/settings' },
    { icon: 'fas fa-user', label: 'Profile', route: '/profile' },
  ];
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      teacherId: ['', Validators.required],
      feedbackDate: [this.getTodayDate(), Validators.required],
      feedback: ['', Validators.required],
      notes: [''],
      rate: [null, [Validators.required, Validators.min(0), Validators.max(5)]],
    });

    this.engineerService.getAllEngineers().subscribe({
      next: (data) => this.engineers.set(data),
      error: (err) => console.log(err),
    });
  }

  private getTodayDate(): string {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${today.getFullYear()}-${month}-${day}`;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.successMessage.showError(this.successMessage.validationMessage(this.form, {}));
      return;
    }

    const adminId = Number(localStorage.getItem('userId')) || 1;
    this.saving.set(true);

    const payload = {
      userId: adminId,
      teacherId: Number(this.form.value.teacherId),
      feedbackDate: this.form.value.feedbackDate,
      feedback: this.form.value.feedback,
      notes: this.form.value.notes,
      rate: Number(this.form.value.rate),
    };

    this.engineerFeedbackService.create(payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.successMessage.show('Engineer report saved successfully.');
        this.router.navigate(['/engineersList']);
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set('Failed to save report');
        this.successMessage.showError(err?.error?.message || 'Failed to save report.');
        console.log(err);
      },
    });
  }
  toggleMenu() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
