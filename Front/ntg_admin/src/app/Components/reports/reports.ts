import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReportService } from '../../Services/report';
import { ReportModel } from '../../Models/report';
import { SidebarComponent } from '../sidebar/sidebar';
import { SuccessMessageService } from '../../Services/success-message';

type ReportTab = 'inbox' | 'sent';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterLink, SidebarComponent],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit {
  private reportService = inject(ReportService);
  private successMessage = inject(SuccessMessageService);

  isSidebarOpen = false;
  constructor(private router: Router) {}

  private readonly currentUserId = Number(localStorage.getItem('userId')) || 1;

  activeTab = signal<ReportTab>('inbox');
  inboxReports = signal<ReportModel[]>([]);
  sentReports = signal<ReportModel[]>([]);
  searchTerm = signal('');

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.loadInbox();
    this.loadSent();
  }

  loadInbox(): void {
    this.reportService.getInbox(this.currentUserId).subscribe({
      next: (data) => this.inboxReports.set(data),
      error: (err) => console.log(err),
    });
  }

  loadSent(): void {
    this.reportService.getSent(this.currentUserId).subscribe({
      next: (data) => this.sentReports.set(data),
      error: (err) => console.log(err),
    });
  }

  switchTab(tab: ReportTab): void {
    this.activeTab.set(tab);
  }

  private currentTabReports = computed(() =>
    this.activeTab() === 'inbox' ? this.inboxReports() : this.sentReports(),
  );

  filteredReports = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const source = this.currentTabReports();
    if (!term) return source;
    return source.filter(
      (r) =>
        `${r.userFirstName} ${r.userLastName}`.toLowerCase().includes(term) ||
        `${r.sentToFirstName} ${r.sentToLastName}`.toLowerCase().includes(term) ||
        r.content.toLowerCase().includes(term),
    );
  });

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  async deleteReport(id: number): Promise<void> {
    if (!(await this.successMessage.confirm('Are you sure you want to delete this report?', 'Delete report?'))) return;

    this.reportService.delete(id).subscribe({
      next: () => {
        this.loadSent();
        this.successMessage.show('Report deleted successfully.');
      },
      error: (err) => {
        console.log(err);
        this.successMessage.showError(err?.error?.message || 'Failed to delete report.');
      },
    });
  }
}
