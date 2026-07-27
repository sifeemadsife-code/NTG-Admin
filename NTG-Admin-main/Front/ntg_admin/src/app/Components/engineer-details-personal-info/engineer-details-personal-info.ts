import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineerService } from '../../Services/engineer';
import { Engineer } from '../../Models/engineer';
import { EngineerCards } from '../../Models/engineer-cards';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EngineerFeedbackService } from '../../Services/engineer-feedback';

@Component({
  selector: 'app-engineer-details-personal-info',
  imports: [CommonModule, RouterLink],
  templateUrl: './engineer-details-personal-info.html',
  styleUrl: './engineer-details-personal-info.css',
})
export class EngineerDetailsPersonalInfo implements OnInit {
  engineer = signal<Engineer>({
    id: 1,
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    education: '',
    employmentHistory: '',
    numberOfYearsOfExperience: 0,
    birthDate: new Date('0-0-0'),
    gender: '',
    religion: '',
    nationalNumber: 0,
    status: true,
  });

  cards = signal<EngineerCards>({
    students: 0,
    reports: 0,
    rating: 0,
  });

  constructor(
    private readonly engineerService: EngineerService,
    private route: ActivatedRoute,
    private readonly feedbackService: EngineerFeedbackService,
  ) {}
  engineerId = 0;
  feedbacksCount = signal<number>(0);
  ngOnInit(): void {
    this.engineerId = Number(this.route.snapshot.paramMap.get('id'));
    this.engineerService.getEngineer(this.engineerId).subscribe({
      next: (data) => {
        console.log('Engineer:', data);
        this.engineer.set(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.feedbackService.getFeedbackCount(this.engineerId).subscribe({
      next: (count) => {
        this.feedbacksCount.set(count);
      },
      error: (err) => console.log(err),
    });
    this.engineerService.getEngineerCards(this.engineerId).subscribe({
      next: (data) => {
        console.log('Cards:', data);
        this.cards.set(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
