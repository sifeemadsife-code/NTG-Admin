import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineerService } from '../../Services/engineer';
import { Engineer } from '../../Models/engineer';
import { EngineerCards } from '../../Models/engineer-cards';
import { EngineerList } from '../../Models/engineer_list';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-engineer',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-engineer.html',
  styleUrl: './admin-engineer.css',
})
export class AdminEngineer implements OnInit {
    isSidebarOpen = false;
  engineers = signal<EngineerList[]>([]);
  searchTerm = signal<string>('');
  statusFilter = signal<string>('active');
  private router = inject(Router);
  menuItems = [
    { icon: 'fas fa-home', label: 'Dashboard', route: '/dashboard' },
    { icon: 'fas fa-users-cog', label: 'Engineers', route: '/engineersList', active: true },
    { icon: 'fas fa-user-graduate', label: 'Students', route: '/studentsList' },
    { icon: 'fas fa-chart-bar', label: 'Reports', route: '/reports' },
    { icon: 'fas fa-book', label: 'Training Program', route: '/trainingProgramsList' },
    { icon: 'fas fa-book-open', label: 'Subjects', route: '/subjects' },
    { icon: 'fas fa-bell', label: 'Notification', route: '/notification' },
    { icon: 'fas fa-cog', label: 'Settings', route: '/settings' },
    { icon: 'fas fa-user', label: 'Profile', route: '/profile' },
  ];
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.router.navigate(['/']);
  }
  filteredEngineers = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const status = this.statusFilter();

    return this.engineers().filter((engineer) => {
      const matchesSearch =
        !term ||
        `${engineer.firstName} ${engineer.lastName}`.toLowerCase().includes(term) ||
        engineer.id.toString().includes(term) ||
        (engineer.education ?? '').toLowerCase().includes(term);

      let matchesStatus = true;
      switch (status) {
        case 'active':
          matchesStatus = engineer.status === false;
          break;
        case 'leave':
          matchesStatus = engineer.status === true;
          break;
        case 'all':
          matchesStatus = true;
          break;
      }
      return matchesSearch && matchesStatus;
    });
  });
  constructor(private readonly engineerService: EngineerService) {}
  ngOnInit(): void {
    this.loadAllEngineers();
  }
  loadAllEngineers() {
    this.engineerService.getAllEngineers().subscribe({
      next: (data) => {
        this.engineers.set(data);
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onSearchChange(value: string) {
    this.searchTerm.set(value);
  }

  onStatusChange(value: string) {
    this.statusFilter.set(value);
  }
  deleteEngineer(id: number) {
    if (!confirm('Are you sure you want to delete this engineer?')) {
      return;
    }
    this.engineerService.deleteEngineer(id).subscribe({
      next: () => {
        alert('Engineer deleted successfully');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
