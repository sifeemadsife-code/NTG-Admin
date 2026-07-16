import { AuthService } from './../../Services/auth';
import { NAV_ITEMS } from './navItems';
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  private auth = inject(AuthService);

  // Comes from the shared constant - never redefined per page.
  readonly navItems = NAV_ITEMS;

  // Own its own open/closed (mobile) state - no page needs to track this.
  readonly isOpen = signal(false);

  toggle(): void {
    this.isOpen.update((v) => !v);
  }

  // Auto-close the mobile drawer after picking a link.
  close(): void {
    this.isOpen.set(false);
  }

  logout(): void {
    this.auth.logout();
  }
}
