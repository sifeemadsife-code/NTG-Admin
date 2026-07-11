import { Component, signal, OnInit, inject } from '@angular/core';
import { TrainingService } from '../../Services/training-service';
import { TrainingProgramList } from '../../Models/training_program_list';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-programs-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './programs-list.html',
  styleUrl: './programs-list.css',
})
export class ProgramsList implements OnInit {
  programs = signal<TrainingProgramList[]>([]);

  constructor(private trainingService: TrainingService) {}
  private router = inject(Router);
  menuItems = [
    { icon: 'fas fa-home', label: 'Dashboard', route: '/dashboard' },
    { icon: 'fas fa-users-cog', label: 'Engineers', route: '/engineersList' },
    { icon: 'fas fa-user-graduate', label: 'Students', route: '/studentsList' },
    { icon: 'fas fa-chart-bar', label: 'Reports', route: '/reports' },
    {
      icon: 'fas fa-book',
      label: 'Training Program',
      route: '/trainingProgramsList',
      active: true,
    },
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
  ngOnInit(): void {
    this.getAllPrograms();
    this.getProgramsCount();
  }
  count = 0;
  getProgramsCount() {
    this.trainingService.getProgramsCount().subscribe({
      next: (value) => {
        this.count = value;
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getAllPrograms() {
    this.trainingService.getTrainingPrograms().subscribe({
      next: (data) => {
        this.programs.set(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteEngineer(id: number) {
    if (!confirm('Are you sure you want to delete this Program?')) {
      return;
    }
    this.trainingService.deleteProgram(id).subscribe({
      next: () => {
        alert('Program deleted successfully');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
