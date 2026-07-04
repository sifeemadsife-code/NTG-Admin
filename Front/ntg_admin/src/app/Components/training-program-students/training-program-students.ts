import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../../Services/training-service';
import { Training } from '../../Models/Training';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EngineerCards } from '../../Models/engineer-cards';
import { StudentsListInterface } from '../../Models/Students_list';
import { Student } from '../../Services/student';

@Component({
  selector: 'app-training-program-students',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './training-program-students.html',
  styleUrls: ['./training-program-students.css']
})
export class TrainingProgramStudents implements OnInit {
program!: Training;
  loading = true;

  constructor(private service: TrainingService, private route: ActivatedRoute) {}
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
  cards = signal<EngineerCards>({
    students: 0,
    reports: 0,
    rating: 0,
  });
  totalStudents = signal<number>(0);
  studentsPercentage = computed(() => {
    const total = this.totalStudents();
    if (!total) return 0;
    return (this.cards().students / total) * 100;
  });
  program_id = 0;
  ngOnInit() {
    this.program_id = Number(this.route.snapshot.paramMap.get('id'))
    this.service.getProgram(this.program_id).subscribe({
      next: (data) => {
        (this.training.set(data), console.log(data));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
