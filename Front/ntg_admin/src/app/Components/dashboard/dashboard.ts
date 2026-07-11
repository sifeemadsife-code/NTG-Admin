import { Student } from './../../Services/student';
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TrainingService } from '../../Services/training-service';
import { EngineerService } from '../../Services/engineer';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
  loading = signal(true);
  error = signal<string | null>(null);
  programsCount = signal<number>(0);
  engineersCount = signal<number>(0);
  studentCount = signal<number>(0);

  profile = signal({
    name: localStorage.getItem('name') || 'Admin',
    role: localStorage.getItem('role') || 'Admin',
  });

  menuItems = [
    { icon: 'fas fa-home', label: 'Dashboard', route: '/dashboard', active: true },
    { icon: 'fas fa-users-cog', label: 'Engineers', route: '/engineersList' },
    { icon: 'fas fa-user-graduate', label: 'Students', route: '/studentsList' },
    { icon: 'fas fa-chart-bar', label: 'Reports', route: '/reports' },
    { icon: 'fas fa-book', label: 'Training Program', route: '/trainingProgramsList' },
    { icon: 'fas fa-book-open', label: 'Subjects', route: '/subjects' },
    { icon: 'fas fa-bell', label: 'Notification', route: '/notifications' },
    { icon: 'fas fa-cog', label: 'Settings', route: '/settings' },
    { icon: 'fas fa-user', label: 'Profile', route: '/profile' },
  ];

  constructor(
    private router: Router,
    private programsService: TrainingService,
    private engineersService: EngineerService,
    private studentsService: Student
  ) {}

  ngOnInit(): void {
    this.loadActivities();
    this.getProgramsCount();
    this.getEngineersCount();
    this.getStudentsCount();
  }
  getProgramsCount(): void {
    this.programsService.getProgramsCount().subscribe({
      next: (value) => {
        this.programsCount.set(value);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getEngineersCount(): void {
    this.engineersService.getAllEngineersCount().subscribe({
      next: (value) => {
        this.engineersCount.set(value);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getStudentsCount(): void {
    this.studentsService.getStudentsCount().subscribe({
      next: (value) => {
        this.studentCount.set(value);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadActivities(): void {
    this.loading.set(true);
    this.error.set(null);
  }

  handleMenuClick(item: any): void {
    if (item.action === 'logout') {
      this.logout();
    } else if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.router.navigate(['/']);
  }

  getTimeAgo(timestamp: string): string {
    const now = new Date();
    const activityTime = new Date(timestamp);

    const diffInMinutes = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);

    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }

  getIconClass(icon: string): string {
    return `fas ${icon}`;
  }

  getIconColor(color: string): string {
    const colorMap: { [key: string]: string } = {
      blue: '#3b82f6',
      green: '#10b981',
      red: '#ef4444',
      purple: '#8b5cf6',
      orange: '#f97316',
      teal: '#14b8a6',
    };

    return colorMap[color] || '#6b7280';
  }
}
