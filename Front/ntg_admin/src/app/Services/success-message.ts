import { Injectable, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

type MessageKind = 'success' | 'error';

interface ConfirmationMessage {
  title: string;
  message: string;
  resolve: (confirmed: boolean) => void;
}

@Injectable({ providedIn: 'root' })
export class SuccessMessageService {
  readonly message = signal<string | null>(null);
  readonly messageKind = signal<MessageKind>('success');
  readonly confirmation = signal<ConfirmationMessage | null>(null);
  show(message: string, _duration?: number): void {
    this.showMessage(message, 'success');
  }

  showError(message: string, _duration?: number): void {
    this.showMessage(message, 'error');
  }

  dismissMessage(): void {
    this.message.set(null);
  }

  validationMessage(form: FormGroup, labels: Record<string, string>): string {
    const invalidFields = Object.entries(form.controls)
      .filter(([, control]) => control.invalid)
      .map(([name]) => labels[name] ?? name);

    return invalidFields.length
      ? `Please complete the following fields: ${invalidFields.join(', ')}.`
      : 'Please review the form fields and try again.';
  }

  confirm(message: string, title = 'Are you sure?'): Promise<boolean> {
    const pendingConfirmation = this.confirmation();
    pendingConfirmation?.resolve(false);

    return new Promise<boolean>((resolve) => {
      this.confirmation.set({ title, message, resolve });
    });
  }

  respondToConfirmation(confirmed: boolean): void {
    const confirmation = this.confirmation();
    this.confirmation.set(null);
    confirmation?.resolve(confirmed);
  }

  private showMessage(message: string, kind: MessageKind): void {
    this.messageKind.set(kind);
    this.message.set(message);
  }
}
