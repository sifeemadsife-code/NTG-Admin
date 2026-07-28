import { RecipientModel } from './../../Services/user-recipients';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ReportService } from '../../Services/report';
import { SidebarComponent } from '../sidebar/sidebar';
import { SuccessMessageService } from '../../Services/success-message';
import { UserRecipientsService } from '../../Services/user-recipients';

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
  private userDirectoryService = inject(UserRecipientsService);
  private router = inject(Router);
  private successMessage = inject(SuccessMessageService);

  isSidebarOpen = false;
  recipients = signal<RecipientModel[]>([]);
  saving = signal(false);
  error = signal('');
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      sentToId: ['', Validators.required],
      content: ['', Validators.required],
      fileLink: [''],
    });

    this.loadRecipients();
  }

  private loadRecipients(): void {
    this.userDirectoryService.getRecipients().subscribe({
      next: (data) => this.recipients.set(data),
      error: (err) => {
        console.log(err);
        this.successMessage.showError('Failed to load recipients list.');
      },
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.successMessage.showError('Please select a recipient and enter the report content.');
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
        this.successMessage.show('Report sent successfully.');
        this.router.navigate(['/reports']);
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set('Failed to send report');
        this.successMessage.showError(err?.error?.message || 'Failed to send report.');
        console.log(err);
      },
    });
  }
}