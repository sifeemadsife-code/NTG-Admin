import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../../Services/training-service';
import { Training } from '../../Models/Training';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EngineerCards } from '../../Models/engineer-cards';
import { EngineerService } from '../../Services/engineer';
import { Engineer } from '../../Models/engineer';

@Component({
  selector: 'app-training-program-students',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './training-program-engineer.html',
  styleUrls: ['./training-program-engineer.css'],
})
export class TrainingProgramEngineer implements OnInit {
  loading = true;

  engineer = signal<Engineer>({
    id: 1,
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    education: '',
    employmentHistory: '',
    numberOfYearsOfExperience: 0,
  });

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

  constructor(
    private service: TrainingService,
    private engineerService: EngineerService,
    private router: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.program_id = Number(this.router.snapshot.paramMap.get('id'));

    this.service.getProgram(this.program_id).subscribe({
      next: (data) => {
        this.training.set(data);
        this.loading = false;
        console.log(data);

        this.engineerService.getEngineer(data.teacherId).subscribe({
          next: (engineerData) => {
            this.engineer.set(engineerData);
            console.log(engineerData);
          },
          error: (err) => {
            console.log(err);
          },
        });

        this.engineerService.getEngineerCards(data.teacherId).subscribe({
          next: (cardsData) => {
            this.cards.set(cardsData);
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }
}
