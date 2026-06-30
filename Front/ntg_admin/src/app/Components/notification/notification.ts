import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationService } from '../../Services/notification';
import { Notification } from '../../Models/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class NotificationComponent implements OnInit {

  notifications: Notification[] = [];

  currentPage = 1;

  constructor(
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {

    this.loadNotifications();

  }

  loadNotifications() {

    this.notificationService.getNotifications().subscribe({

      next: (data) => {

        this.notifications = data;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}