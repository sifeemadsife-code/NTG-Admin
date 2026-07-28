// toast.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../Services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-component.html',
  styleUrls: ['./toast-component.css']
})
export class ToastComponent {
  private toastService = inject(ToastService);
  toast = this.toastService.toast;
  clearToast(): void {
    this.toastService.clear();
  }

  handleAction(): void {
    const toast = this.toast();
    if (toast?.action) {
      toast.action.onClick();
    }
    this.clearToast();
  }
}