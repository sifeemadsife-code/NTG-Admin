// confirm-dialog.component.ts
import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogService } from '../../Services/confirm-dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog-component.html',
  styleUrls: ['./confirm-dialog-component.css']
})
export class ConfirmDialogComponent {
  constructor(private confirmDialogService: ConfirmDialogService) {}

  
  confirmDialog = computed(() => this.confirmDialogService.confirmDialog());

  onConfirm(): void {
    this.confirmDialogService.confirm();
  }

  onCancel(): void {
    this.confirmDialogService.cancel();
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }
}