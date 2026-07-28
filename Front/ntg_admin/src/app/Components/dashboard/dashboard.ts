import { Student } from './../../Services/student';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  signal,
  inject,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TrainingService } from '../../Services/training-service';
import { EngineerService } from '../../Services/engineer';
import { Chart, registerables } from 'chart.js';
import { SidebarComponent } from '../sidebar/sidebar';
import { AdminProfile } from '../../Models/admin-profile';
import { ProfileService } from '../../Services/profile';

interface DashboardSearchResult {
  title: string;
  subtitle: string;
  type: 'Engineer' | 'Student' | 'Program' | 'Quick action';
  icon: string;
  route: (string | number)[];
}

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit, AfterViewInit {
  @ViewChild('performanceChart') performanceChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('studentsChart') studentsChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('engineersChart') engineersChartRef!: ElementRef<HTMLCanvasElement>;

  private performanceChart?: Chart;
  private studentsChart?: Chart;
  private engineersChart?: Chart;
  private viewReady = false;

  loading = signal(true);
  error = signal<string | null>(null);
  programsCount = signal<number>(0);
  engineersCount = signal<number>(0);
  studentCount = signal<number>(0);
  profile2 = signal<AdminProfile | null>(null);
  gradeDistribution = signal<{ grade: string; count: number }[]>([]);
  private profileService = inject(ProfileService);
  router = inject(Router);
  engineerExperience = signal<{ level: string; count: number }[]>([]);
  searchTerm = signal('');
  searchOpen = signal(false);
  private searchEngineers = signal<any[]>([]);
  private searchStudents = signal<any[]>([]);
  private searchPrograms = signal<any[]>([]);

  private toTitleCase(text: string): string {
    return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  profile = signal({
    name: this.toTitleCase(localStorage.getItem('name') || 'Admin'),
    role: this.toTitleCase(localStorage.getItem('role') || 'Admin'),
  });

  searchResults = computed<DashboardSearchResult[]>(() => {
    const query = this.searchTerm().trim().toLowerCase();
    if (!query) return [];

    const engineers = this.searchEngineers()
      .filter((engineer) =>
        `${engineer.firstName} ${engineer.lastName} ${engineer.email} ${engineer.education}`
          .toLowerCase()
          .includes(query),
      )
      .map((engineer) => ({
        title: `${engineer.firstName} ${engineer.lastName}`,
        subtitle: engineer.email || engineer.education || 'Engineer',
        type: 'Engineer' as const,
        icon: 'fa-user-tie',
        route: ['/engineers', engineer.id],
      }));
    const students = this.searchStudents()
      .filter((student) =>
        `${student.first_name} ${student.last_name} ${student.grade}`.toLowerCase().includes(query),
      )
      .map((student) => ({
        title: `${student.first_name} ${student.last_name}`,
        subtitle: student.grade ? `Grade: ${student.grade}` : 'Student',
        type: 'Student' as const,
        icon: 'fa-graduation-cap',
        route: ['/students', student.id],
      }));
    const programs = this.searchPrograms()
      .filter((program) =>
        `${program.program_name} ${program.grade_name}`.toLowerCase().includes(query),
      )
      .map((program) => ({
        title: program.program_name,
        subtitle: program.grade_name ? `Grade: ${program.grade_name}` : 'Training program',
        type: 'Program' as const,
        icon: 'fa-book-open',
        route: ['/programs', program.id],
      }));
    const shortcuts: DashboardSearchResult[] = [
      {
        title: 'Add Engineer',
        subtitle: 'Create a new engineer account',
        type: 'Quick action' as const,
        icon: 'fa-user-plus',
        route: ['/addEngineer'],
      },
      {
        title: 'Create Training Program',
        subtitle: 'Create a new training program',
        type: 'Quick action' as const,
        icon: 'fa-plus-circle',
        route: ['/createProgram'],
      },
      {
        title: 'Send Report',
        subtitle: 'Create and send a report',
        type: 'Quick action' as const,
        icon: 'fa-paper-plane',
        route: ['/compose-report'],
      },
    ].filter((item) => `${item.title} ${item.subtitle}`.toLowerCase().includes(query));

    return [...engineers, ...students, ...programs, ...shortcuts].slice(0, 7);
  });

  constructor(
    private programsService: TrainingService,
    private engineersService: EngineerService,
    private studentsService: Student,
  ) {}

  ngOnInit(): void {
    this.getProgramsCount();
    this.getEngineersCount();
    this.getStudentsCount();
    this.loadStudentsByGrade();
    this.loadEngineersByExperience();
    this.loadProfile();
    this.loadProgramsForSearch();
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.renderPerformanceChart();
    if (this.gradeDistribution().length) {
      this.renderStudentsChart(this.gradeDistribution());
    }
    if (this.engineerExperience().length) {
      this.renderEngineersChart(this.engineerExperience());
    }
  }

  getProgramsCount(): void {
    this.programsService.getProgramsCount().subscribe({
      next: (value) => {
        this.programsCount.set(value);
        this.renderPerformanceChart();
      },
      error: (err) => console.log(err),
    });
  }

  loadProgramsForSearch(): void {
    this.programsService.getTrainingPrograms().subscribe({
      next: (programs) => this.searchPrograms.set(programs || []),
      error: (err) => console.log(err),
    });
  }

  getEngineersCount(): void {
    this.engineersService.getAllEngineersCount().subscribe({
      next: (value) => {
        this.engineersCount.set(value);
        this.renderPerformanceChart();
      },
      error: (err) => console.log(err),
    });
  }

  getStudentsCount(): void {
    this.studentsService.getStudentsCount().subscribe({
      next: (value) => {
        this.studentCount.set(value);
        this.renderPerformanceChart();
      },
      error: (err) => console.log(err),
    });
  }
  loadStudentsByGrade(): void {
    this.studentsService.getAllStudents().subscribe({
      next: (students: any[]) => {
        this.searchStudents.set(students || []);
        const map = new Map<string, number>();
        (students || []).forEach((s) => {
          const grade = s.grade && s.grade.trim() ? s.grade : 'Unassigned';
          map.set(grade, (map.get(grade) || 0) + 1);
        });
        const dist = Array.from(map.entries()).map(([grade, count]) => ({ grade, count }));
        this.gradeDistribution.set(dist);
        this.renderStudentsChart(dist);
      },
      error: (err) => console.log(err),
    });
  }

  loadEngineersByExperience(): void {
    this.loading.set(true);
    this.engineersService.getAllEngineers().subscribe({
      next: (engineers: any[]) => {
        this.searchEngineers.set(engineers || []);
        const buckets = [
          { level: '0-2 yrs', min: 0, max: 2, count: 0 },
          { level: '3-5 yrs', min: 3, max: 5, count: 0 },
          { level: '6-10 yrs', min: 6, max: 10, count: 0 },
          { level: '10+ yrs', min: 11, max: Infinity, count: 0 },
        ];

        (engineers || []).forEach((e) => {
          const exp = Number(e.experience ?? e.numberOfYearsOfExperience ?? 0);
          const bucket = buckets.find((b) => exp >= b.min && exp <= b.max);
          if (bucket) bucket.count++;
        });

        const dist = buckets
          .filter((b) => b.count > 0)
          .map((b) => ({ level: b.level, count: b.count }));

        this.engineerExperience.set(dist);
        this.loading.set(false);
        this.error.set(null);
        this.renderEngineersChart(dist);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
        this.error.set('Failed to load engineer data');
      },
    });
  }

  private renderPerformanceChart(): void {
    if (!this.viewReady || !this.performanceChartRef) return;

    const data = [this.studentCount(), this.engineersCount(), this.programsCount()];

    if (this.performanceChart) {
      this.performanceChart.data.datasets[0].data = data;
      this.performanceChart.update();
      return;
    }

    this.performanceChart = new Chart(this.performanceChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Students', 'Engineers', 'Programs'],
        datasets: [
          {
            label: 'Total',
            data,
            backgroundColor: ['#8d0801', '#bf0603', '#708d81'],
            borderRadius: 8,
            barThickness: 40,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { precision: 0 } },
        },
      },
    });
  }

  private renderStudentsChart(dist: { grade: string; count: number }[]): void {
    if (!this.viewReady || !this.studentsChartRef) {
      setTimeout(() => this.renderStudentsChart(dist), 100);
      return;
    }
    const palette = ['#8d0801', '#f4d58d', '#708d81'];
    if (this.studentsChart) {
      this.studentsChart.data.labels = dist.map((d) => d.grade);
      this.studentsChart.data.datasets[0].data = dist.map((d) => d.count);
      this.studentsChart.update();
      return;
    }
    this.studentsChart = new Chart(this.studentsChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: dist.map((d) => d.grade),
        datasets: [
          {
            data: dist.map((d) => d.count),
            backgroundColor: dist.map((_, i) => palette[i % palette.length]),
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } },
        },
      },
    });
  }

  private renderEngineersChart(dist: { level: string; count: number }[]): void {
    if (!this.viewReady || !this.engineersChartRef) {
      setTimeout(() => this.renderEngineersChart(dist), 100);
      return;
    }
    const palette = ['#bf0603', '#708d81'];
    if (this.engineersChart) {
      this.engineersChart.data.labels = dist.map((d) => d.level);
      this.engineersChart.data.datasets[0].data = dist.map((d) => d.count);
      this.engineersChart.update();
      return;
    }
    this.engineersChart = new Chart(this.engineersChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: dist.map((d) => d.level),
        datasets: [
          {
            data: dist.map((d) => d.count),
            backgroundColor: dist.map((_, i) => palette[i % palette.length]),
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } },
        },
      },
    });
  }

  loadProfile(): void {
    this.loading.set(true);
    this.error.set('');

    this.profileService.getMyProfile().subscribe({
      next: (data) => {
        this.profile2.set(data);
      },
      error: (err) => {
        this.error.set('Failed to load profile.');
        console.log(err);
      },
    });
  }
  closeSearch(): void {
    setTimeout(() => {
      this.searchOpen.set(false);
    }, 200);
  }
}
