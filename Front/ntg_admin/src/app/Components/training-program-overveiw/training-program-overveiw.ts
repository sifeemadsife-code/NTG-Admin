import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../../Services/training-service';
import { Training } from '../../Models/Training';

@Component({
  selector: 'app-training-program-overveiw',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './training-program-overveiw.html',
  styleUrls: ['./training-program-overveiw.css'],
})
export class TrainingProgramOverveiw implements OnInit {
  program!: Training;
  loading = true;

  constructor(private service: TrainingService) {}
  training = signal<Training>({
    id: 1,
    teacherId: 1,
    teacherFirstName: '',
    teacherLastName: '',
    programName: '',
    description: '',
    startDate:  new Date("0-0-0"),
    endDate:  new Date("0-0-0"),
    location: '',
    createdAt: new Date("0-0-0"),
    totalStudents: 0
  });

  ngOnInit() {
    this.service.getProgram().subscribe({
      next: (data) => {
        this.training.set(data),
        console.log(data)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
