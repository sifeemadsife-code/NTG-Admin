import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReportService } from '../../Services/report';
import { ReportModel } from '../../Models/report';
import { Sendemail } from "../sendemail/sendemail";
import { SidebarComponent } from "../sidebar/sidebar";

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterLink,  SidebarComponent],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit {
  private reportService = inject(ReportService);
  isSidebarOpen = false;
  constructor(private router: Router) {}
  menuItems = [
    { icon: 'fas fa-home', label: 'Dashboard', route: '/dashboard' },
    { icon: 'fas fa-users-cog', label: 'Engineers', route: '/engineersList' },
    { icon: 'fas fa-user-graduate', label: 'Students', route: '/studentsList' },
    { icon: 'fas fa-chart-bar', label: 'Reports', route: '/reports', active: true },
    { icon: 'fas fa-book', label: 'Training Program', route: '/trainingProgramsList' },
    { icon: 'fas fa-book-open', label: 'Subjects', route: '/subjects' },
    { icon: 'fas fa-bell', label: 'Notification', route: '/notifications' },
    { icon: 'fas fa-cog', label: 'Settings', route: '/settings' },
    { icon: 'fas fa-user', label: 'Profile', route: '/profile' },
  ];
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.router.navigate(['/']);
  }

  reports = signal<ReportModel[]>([]);
  searchTerm = signal('');

  filteredReports = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.reports();
    return this.reports().filter(
      (r) =>
        `${r.userFirstName} ${r.userLastName}`.toLowerCase().includes(term) ||
        r.content.toLowerCase().includes(term),
    );
  });

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.reportService.getAll().subscribe({
      next: (data) => this.reports.set(data),
      error: (err) => console.log(err),
    });
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  deleteReport(id: number): void {
    if (!confirm('Are you sure you want to delete this report?')) return;
    this.reportService.delete(id).subscribe({
      next: () => this.reports.update((list) => list.filter((r) => r.id !== id)),
      error: (err) => console.log(err),
    });
  }
}
