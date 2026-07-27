// Services/confirm-dialog.service.ts
import { Injectable, signal } from '@angular/core';

export interface ConfirmDialogOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  private confirmSignal = signal<{
    show: boolean;
    options: ConfirmDialogOptions | null;
    resolve?: (value: boolean) => void;
  }>({
    show: false,
    options: null
  });

  confirmDialog = this.confirmSignal.asReadonly();

  showConfirm(options: ConfirmDialogOptions): Promise<boolean> {
    return new Promise((resolve) => {
      this.confirmSignal.set({
        show: true,
        options: {
          ...options,
          confirmText: options.confirmText || 'Yes',
          cancelText: options.cancelText || 'No'
        },
        resolve: resolve
      });
    });
  }

  confirm(): void {
    const current = this.confirmSignal();
    if (current.resolve) {
      current.resolve(true);
    }
    this.close();
  }

  cancel(): void {
    const current = this.confirmSignal();
    if (current.resolve) {
      current.resolve(false);
    }
    this.close();
  }

  private close(): void {
    this.confirmSignal.set({
      show: false,
      options: null
    });
  }
}