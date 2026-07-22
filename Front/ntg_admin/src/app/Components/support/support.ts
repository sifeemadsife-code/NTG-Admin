import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {

  // =========================
  // Support Actions
  // =========================

  contactSupport(): void {

    console.log('Contact Support');

  }

  createTicket(): void {

    console.log('Create Support Ticket');

  }

  viewFAQ(): void {

    console.log('View FAQ');

  }

  // =========================
  // Logout
  // =========================

  logout(): void {

    console.log('Logout');

    // Later:
    // this.authService.logout();

  }

}