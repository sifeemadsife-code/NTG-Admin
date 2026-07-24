import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ReportService } from '../../Services/report';
import { EngineerService } from '../../Services/engineer';
import { EngineerList } from '../../Models/engineer_list';
import { SidebarComponent } from "../sidebar/sidebar";
import { SuccessMessageService } from '../../Services/success-message';

@Component({
  selector: 'app-compose-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SidebarComponent],
  templateUrl: './compose-report.html',
  styleUrl: './compose-report.css',
})
export class ComposeReport implements OnInit {
  private fb = inject(FormBuilder);
  private reportService = inject(ReportService);
  private engineerService = inject(EngineerService);
  private router = inject(Router);
  private successMessage = inject(SuccessMessageService);
  isSidebarOpen = false;
  menuItems = [
    { icon: 'fas fa-home', label: 'Dashboard', route: '/dashboard' },
    { icon: 'fas fa-users-cog', label: 'Engineers', route: '/engineersList' },
    { icon: 'fas fa-user-graduate', label: 'Students', route: '/studentsList' },
    { icon: 'fas fa-chart-bar', label: 'Reports', route: '/reports', active: true },
    { icon: 'fas fa-book', label: 'Training Program', route: '/trainingProgramsList' },
    { icon: 'fas fa-book-open', label: 'Subjects', route: '/subjects' },
    { icon: 'fas fa-bell', label: 'Notification', route: '/notifications' },
    { icon: 'fas fa-cog', label: 'Settings', route: '/settings' },
    { icon: 'fas fa-user', label: 'Profile', route: '/profile' },
  ];
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.router.navigate(['/']);
  }

  engineers = signal<EngineerList[]>([]);
  saving = signal(false);
  error = signal('');

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      sentToId: ['', Validators.required],
      content: ['', Validators.required],
      fileLink: [''],
    });

    this.engineerService.getAllEngineers().subscribe({
      next: (data) => this.engineers.set(data),
      error: (err) => console.log(err),
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.successMessage.showError(this.successMessage.validationMessage(this.form, {
        sentToId: 'Recipient', content: 'Report Content',
      }));
      return;
    }

    const adminId = Number(localStorage.getItem('userId')) || 1;
    this.saving.set(true);

    const payload = {
      userId: adminId,
      content: this.form.value.content,
      fileLink: this.form.value.fileLink,
      sentToId: Number(this.form.value.sentToId),
    };

    this.reportService.create(payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.successMessage.show('Report sent successfully');
        this.router.navigate(['/reports']);
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set('Failed to send report');
        console.log(err);
      },
    });
  }
}
