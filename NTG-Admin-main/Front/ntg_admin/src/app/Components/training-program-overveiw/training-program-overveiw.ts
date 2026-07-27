import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { TrainingService } from '../../Services/training-service';
import { Student } from '../../Services/student';
import { Training } from '../../Models/Training';
import { StudentsListInterface } from '../../Models/Students_list';
import { SidebarComponent } from "../sidebar/sidebar";

@Component({
  selector: 'app-training-program-overveiw',
  standalone: true,
  imports: [CommonModule, RouterLink, SidebarComponent],
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


  programDuration = signal<string>('0 Weeks');
  programDurationLabel = signal<string>('Program Duration');
  engineersCount = signal<number>(1);
  progressCompleted = signal<number>(72);
  progressRemaining = signal<number>(28);
  weeksRemaining = signal<number>(8);

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
                this.calculateProgramDuration(data.startDate, data.endDate);
        
        this.checkDataReady();
      },
      error: (err) => console.log(err),
    });

    this.getStudentsCount();
    this.loadProgramStudents();
    
    this.getEngineersCount();
  }

  calculateProgramDuration(startDate: Date, endDate: Date): void {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
      this.programDuration.set(`${diffWeeks} Weeks`);
      
      const totalWeeks = diffWeeks;
      const currentDate = new Date();
      const elapsedTime = Math.abs(currentDate.getTime() - start.getTime());
      const elapsedWeeks = Math.ceil(elapsedTime / (1000 * 60 * 60 * 24 * 7));
      const remaining = Math.max(0, totalWeeks - elapsedWeeks);
      this.weeksRemaining.set(remaining);
      
      const progress = Math.min(100, Math.round((elapsedWeeks / totalWeeks) * 100));
      this.progressCompleted.set(progress);
      this.progressRemaining.set(100 - progress);
    }
  }

  getEngineersCount(): void {
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
            backgroundColor: ['#780000', '#dcdfe5'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
         cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true, 
              pointStyle: 'circle', 
              padding: 12,
              font: {
                size: 13,
                
              },
              color: '#666'
            }
          
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