import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../Services/notification';
import { EngineerService } from '../../Services/engineer';
import { EngineerList } from '../../Models/engineer_list';
import { SidebarComponent } from '../sidebar/sidebar';
import { SuccessMessageService } from '../../Services/success-message';
import { RecipientModel, UserRecipientsService } from '../../Services/user-recipients';

@Component({
  selector: 'app-send-notification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SidebarComponent],
  templateUrl: './send-notification.html',
  styleUrl: './send-notification.css',
})
export class SendNotification implements OnInit {
  private fb = inject(FormBuilder);
  private notificationService = inject(NotificationService);
  private userDirectoryService = inject(UserRecipientsService);
  private router = inject(Router);
  private successMessage = inject(SuccessMessageService);

  recipients = signal<RecipientModel[]>([]);
  saving = signal(false);
  error = signal('');

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      type: ['ALERT', Validators.required],
      priority: ['NORMAL', Validators.required],
      body: ['', Validators.required],
      sentToId: ['', Validators.required],
    });

    this.userDirectoryService.getRecipients().subscribe({
      next: (data) => this.recipients.set(data),
      error: (err) => console.log(err),
    });
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
      title: this.form.value.title,
      type: this.form.value.type,
      priority: this.form.value.priority,
      body: this.form.value.body,
      sentToIds: [Number(this.form.value.sentToId)],
    };

    this.notificationService.create(payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.successMessage.show('Notification sent successfully.');
        this.router.navigate(['/notifications']);
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set('Failed to send notification');
        this.successMessage.showError(err?.error?.message || 'Failed to send notification.');
        console.log(err);
      },
    });
  }
}
