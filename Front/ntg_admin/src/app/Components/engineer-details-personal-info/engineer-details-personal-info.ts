import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineerService } from '../../Services/engineer';
import { Engineer } from '../../Models/engineer';
import { EngineerCards } from '../../Models/engineer-cards';

@Component({
  selector: 'app-engineer-details-personal-info',
  imports: [CommonModule],
  templateUrl: './engineer-details-personal-info.html',
  styleUrl: './engineer-details-personal-info.css',
})
export class EngineerDetailsPersonalInfo implements OnInit {
 engineer: Engineer = {
    id: 1,
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    education: '',
    employmentHistory: '',
    numberOfYearsOfExperience: null,
  };

  cards: EngineerCards = {
    students: 0,
    reports: 0,
    rating: 0,
  };

  constructor(private readonly engineerService: EngineerService) {}

  ngOnInit(): void {
    const engineerId = 1000;

    this.engineerService.getEngineer(engineerId).subscribe({
      next: (data) => {
        this.engineer = data;
      },
      error: (err) => {
        console.error('Failed to load engineer profile', err);
      },
    });

    this.engineerService.getEngineerCards(engineerId).subscribe({
      next: (data) => {
        this.cards = data;
      },
      error: (err) => {
        console.error('Failed to load engineer cards', err);
      },
    });
  }
}
