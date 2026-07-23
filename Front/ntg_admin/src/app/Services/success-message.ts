import { Injectable, signal } from '@angular/core';

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
  private hideTimer?: ReturnType<typeof setTimeout>;

  show(message: string, duration = 3000): void {
    this.showMessage(message, 'success', duration);
  }

  showError(message: string, duration = 4000): void {
    this.showMessage(message, 'error', duration);
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

  private showMessage(message: string, kind: MessageKind, duration: number): void {
    clearTimeout(this.hideTimer);
    this.messageKind.set(kind);
    this.message.set(message);
    this.hideTimer = setTimeout(() => this.message.set(null), duration);
  }
}
