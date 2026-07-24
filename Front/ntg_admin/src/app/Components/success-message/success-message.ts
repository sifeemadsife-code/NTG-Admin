import { Component, inject } from '@angular/core';
import { SuccessMessageService } from '../../Services/success-message';

@Component({
  selector: 'app-success-message',
  standalone: true,
  template: `
    @if (successMessage.message(); as message) {
      <div class="message-backdrop">
        <div class="message" [class.error-message]="successMessage.messageKind() === 'error'"
          [attr.role]="successMessage.messageKind() === 'error' ? 'alert' : 'status'" aria-live="polite">
          <i [class]="successMessage.messageKind() === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-check-circle'" aria-hidden="true"></i>
          <span>{{ message }}</span>
          <button type="button" class="message-ok-button" (click)="successMessage.dismissMessage()">OK</button>
        </div>
      </div>
    }

    @if (successMessage.confirmation(); as confirmation) {
      <div class="confirmation-backdrop" (click)="successMessage.respondToConfirmation(false)">
        <section class="confirmation-dialog" role="alertdialog" aria-modal="true" [attr.aria-label]="confirmation.title" (click)="$event.stopPropagation()">
          <i class="fas fa-question-circle" aria-hidden="true"></i>
          <h2>{{ confirmation.title }}</h2>
          <p>{{ confirmation.message }}</p>
          <div class="confirmation-actions">
            <button type="button" class="cancel-button" (click)="successMessage.respondToConfirmation(false)">Cancel</button>
            <button type="button" class="confirm-button" (click)="successMessage.respondToConfirmation(true)">Confirm</button>
          </div>
        </section>
      </div>
    }
  `,
  styleUrl: './success-message.css',
})
export class SuccessMessageComponent {
  readonly successMessage = inject(SuccessMessageService);
}
