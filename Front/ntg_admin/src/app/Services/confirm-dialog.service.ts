import { Injectable, signal } from '@angular/core';

export interface ConfirmDialogOptions {
  title?: string;
  message?: string;
  type?: 'danger' | 'warning' | 'default';
  confirmText?: string;
  cancelText?: string;
}

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  readonly confirmDialog = signal<{ show: boolean; options?: ConfirmDialogOptions }>({ show: false });

  confirm(options: ConfirmDialogOptions = {}): void {
    this.confirmDialog.set({ show: true, options });
  }

  cancel(): void {
    this.confirmDialog.set({ show: false });
  }
}
