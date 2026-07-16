import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineerService } from '../../Services/engineer';
import { Engineer } from '../../Models/engineer';
import { EngineerCards } from '../../Models/engineer-cards';
import { EngineerList } from '../../Models/engineer_list';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar';

@Component({
  selector: 'app-admin-engineer',
  imports: [CommonModule, RouterLink, RouterLinkActive, SidebarComponent],
  templateUrl: './admin-engineer.html',
  styleUrl: './admin-engineer.css',
})
export class AdminEngineer implements OnInit {
  isSidebarOpen = false;
  engineers = signal<EngineerList[]>([]);
  searchTerm = signal<string>('');
  statusFilter = signal<string>('active');
  private router = inject(Router);
  toggleMenu() {
    this.isSidebarOpen = !this.isSidebarOpen;
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
  restoreEngineer(id: number) {
    if (!confirm('Are you sure you want to Restore this engineer?')) {
      return;
    }
    this.engineerService.restoreEngineer(id).subscribe({
      next: () => {
        alert('Engineer restored successfully');
        this.loadAllEngineers();
      },
      error: (err) => console.error(err),
    });
  }
}
