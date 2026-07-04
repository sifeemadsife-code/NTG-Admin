import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../../Services/training-service';
import { Training } from '../../Models/Training';
import { Student } from '../../Services/student';
import { Chart } from 'chart.js/auto';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  training = signal<Training>({
    id: 1,
    teacherId: 1,
    teacherFirstName: '',
    teacherLastName: '',
    programName: '',
    description: '',
    startDate: new Date('0-0-0'),
    endDate: new Date('0-0-0'),
    location: '',
    createdAt: new Date('0-0-0'),
    totalStudents: 0,
  });
  engineer_id = 0;
  studentCount = signal(0);
  ngOnInit() {
    this.engineer_id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getProgram(this.engineer_id).subscribe({
      next: (data) => {
        (this.training.set(data), console.log(data));
        this.checkDataReady();
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.getStudentsCount();
  }
  getStudentsCount() {
    this.studentService.getStudentsCount().subscribe({
      next: (value) => {
        this.studentCount.set(Number(value));
        console.log(value);
        this.checkDataReady();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  chart!: Chart;

  createChart() {
    const total = this.studentCount();
    const inProgram = this.training().totalStudents;

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
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });
  }
  checkDataReady() {
    if (this.studentCount() > 0 && this.training().totalStudents >= 0) {
      this.createChart();
    }
  }
}
