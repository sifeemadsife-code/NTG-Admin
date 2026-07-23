import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../Services/notification';
import { NotificationModel } from '../../Models/notification';
import { SidebarComponent } from "../sidebar/sidebar";
import { SuccessMessageService } from '../../Services/success-message';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, RouterLink, SidebarComponent],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class NotificationComponent implements OnInit {
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private successMessage = inject(SuccessMessageService);

  notifications = signal<NotificationModel[]>([]);
  currentPage = signal(1);
  itemsPerPage = signal(6);


  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.notifications().length / this.itemsPerPage()))
  );

  paginatedNotifications = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    return this.notifications().slice(start, start + this.itemsPerPage());
  });

  pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    const userId = Number(localStorage.getItem('userId')) || 1;
    this.notificationService.getUserNotifications(userId).subscribe({
      next: (data) => this.notifications.set(data),
      error: (err) => console.log(err),
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  prevPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  getIcon(type: string): string {
    switch (type) {
      case 'REPORT': return 'description';
      case 'ALERT': return 'warning';
      case 'MESSAGE': return 'mail';
      case 'SYSTEM': return 'settings';
      default: return 'notifications';
    }
  }

  async deleteNotification(id: number): Promise<void> {
    if (!(await this.successMessage.confirm('Are you sure you want to delete this notification?', 'Delete notification?'))) return;
    this.notificationService.delete(id).subscribe({
      next: () => {
        this.loadNotifications();
        this.successMessage.show('Notification deleted successfully');
      },
      error: (err) => {
        console.log(err);
        this.successMessage.showError('Failed to delete notification. Please try again.');
      },
    });
  }
}
