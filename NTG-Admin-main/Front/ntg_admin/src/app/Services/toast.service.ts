// Services/toast.service.ts
import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  type: ToastType;
  message: string;
  title?: string;
  duration?: number;
  showCloseButton?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSignal = signal<ToastMessage | null>(null);
  
  // ✅ تأكد من وجود هذا السطر
  toast = this.toastSignal.asReadonly();

  success(message: string, title: string = 'Success', duration: number = 3000): void {
    this.show({ type: 'success', message, title, duration, showCloseButton: true });
  }

  error(message: string, title: string = 'Error', duration: number = 4000): void {
    this.show({ type: 'error', message, title, duration, showCloseButton: true });
  }

  warning(message: string, title: string = 'Warning', duration: number = 3500): void {
    this.show({ type: 'warning', message, title, duration, showCloseButton: true });
  }

  info(message: string, title: string = 'Information', duration: number = 3000): void {
    this.show({ type: 'info', message, title, duration, showCloseButton: true });
  }

  successWithAction(
    message: string, 
    title: string = 'Success', 
    actionLabel: string = 'Continue',
    actionCallback: () => void = () => {},
    duration: number = 5000
  ): void {
    this.show({
      type: 'success',
      message,
      title,
      duration,
      showCloseButton: true,
      action: {
        label: actionLabel,
        onClick: actionCallback
      }
    });
  }

  private show(toast: ToastMessage): void {
    this.toastSignal.set(toast);
    
    if (toast.duration && toast.duration > 0 && !toast.action) {
      setTimeout(() => {
        this.clear();
      }, toast.duration);
    }
  }

  clear(): void {
    this.toastSignal.set(null);
  }
}