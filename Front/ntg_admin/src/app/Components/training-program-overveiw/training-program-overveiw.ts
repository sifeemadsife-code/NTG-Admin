import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Chart } from 'chart.js/auto';

import { TrainingService } from '../../Services/training-service';
import { Student } from '../../Services/student';

import { Training } from '../../Models/Training';
import { StudentsListInterface } from '../../Models/Students_list';

@Component({
  selector: 'app-training-program-overveiw',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './training-program-overveiw.html',
  styleUrls: ['./training-program-overveiw.css'],
})
export class TrainingProgramOverveiw implements OnInit {

  constructor(
    private service: TrainingService,
    private studentService: Student,
    private route: ActivatedRoute,
  ) {}

  private router = inject(Router);

  program_id = 0;

  training = signal<Training>({
    id: 1,
    teacherId: 1,
    teacherFirstName: '',
    teacherLastName: '',
    gradeId: 0,
    gradeName: '',
    programName: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    location: '',
    createdAt: new Date(),
    totalStudents: 0,
  });

  students = signal<StudentsListInterface[]>([]);
  studentsCount = signal(0);
  studentCount = signal(0);

  chart!: Chart;

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
    this.program_id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getProgram(this.program_id).subscribe({
      next: (data) => {
        this.training.set(data);
        this.checkDataReady();
      },
      error: (err) => console.log(err),
    });

    this.getStudentsCount();
    this.loadProgramStudents();
  }

  getStudentsCount(): void {
    this.studentService.getStudentsCount().subscribe({
      next: (value) => {
        this.studentCount.set(Number(value));
        this.checkDataReady();
      },
      error: (err) => console.log(err),
    });
  }

  loadProgramStudents(): void {
    this.service.getProgramStudents(this.program_id).subscribe({
      next: (data) => {
        this.students.set(data);
        this.studentsCount.set(data.length);
        this.checkDataReady();
      },
      error: (err) => console.log(err),
    });
  }

  createChart(): void {

    const total = this.studentCount();
    const inProgram = this.studentsCount();

    if (inProgram > total) {
      console.error('Invalid chart data');
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('studentsChart', {
      type: 'doughnut',
      data: {
        labels: ['In Training Program', 'Other Students'],
        datasets: [
          {
            data: [inProgram, total - inProgram],
            backgroundColor: ['#8B0000', '#D9D9D9'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });
  }

  checkDataReady(): void {
    if (this.studentCount() >= 0 && this.studentsCount() >= 0) {
      setTimeout(() => this.createChart());
    }
  }
}