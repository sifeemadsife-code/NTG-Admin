import { EngineerService } from './../../Services/engineer';
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Engineer } from '../../Models/engineer';
import { EngineerCards } from '../../Models/engineer-cards';

@Component({
  selector: 'app-engineer-details-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './engineer-details.html',
  styleUrls: ['./engineer-details.css']
})
export class ngineerDetails implements OnInit {

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

  cards = signal<EngineerCards>({
    students: 0,
    reports: 0,
    rating: 0,
  });

  constructor(private readonly engineerService: EngineerService) {}

  ngOnInit(): void {

    const engineerId = 1000;

    this.engineerService.getEngineer(engineerId).subscribe({
      next: (data) => {
        console.log('Engineer:', data);
        this.engineer.set(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
    
    this.engineerService.getEngineerCards(engineerId).subscribe({
      next: (data) => {
        console.log('Cards:', data);
        this.cards.set(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}