import { Student } from './../../Services/student';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TrainingService } from '../../Services/training-service';
import { EngineerService } from '../../Services/engineer';
import { Chart, registerables } from 'chart.js';
import { SidebarComponent } from "../sidebar/sidebar";

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, SidebarComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit, AfterViewInit {
  @ViewChild('performanceChart') performanceChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('studentsChart') studentsChartRef!: ElementRef<HTMLCanvasElement>;

  private performanceChart?: Chart;
  private studentsChart?: Chart;
  private viewReady = false;

  isSidebarOpen = false;
  loading = signal(true);
  error = signal<string | null>(null);
  programsCount = signal<number>(0);
  engineersCount = signal<number>(0);
  studentCount = signal<number>(0);
  gradeDistribution = signal<{ grade: string; count: number }[]>([]);

  profile = signal({
    name: localStorage.getItem('name') || 'Admin',
    role: localStorage.getItem('role') || 'Admin',
  });


  constructor(
    private programsService: TrainingService,
    private engineersService: EngineerService,
    private studentsService: Student
  ) {}

  ngOnInit(): void {
    this.loadActivities();
    this.getProgramsCount();
    this.getEngineersCount();
    this.getStudentsCount();
    this.loadStudentsByGrade();
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.renderPerformanceChart();
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
            backgroundColor: ['#05172F', '#0B2202', '#5B1717'],
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
      // view lessa msh gahza, jarrab tany 3ala microtask
      setTimeout(() => this.renderStudentsChart(dist), 100);
      return;
    }

    const palette = ['#05172F', '#8F0000', '#DA7612', '#28964d', '#4a90d9', '#a855f7', '#f59e0b', '#14b8a6'];

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

  loadActivities(): void {
    this.loading.set(true);
    this.error.set(null);
    // TODO: connect this to a real activities endpoint when available
    this.loading.set(false);
  }

  getIconClass(icon: string): string {
    return `fas ${icon}`;
  }
}