import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineerService } from '../../Services/engineer';
import { Engineer } from '../../Models/engineer';
import { EngineerCards } from '../../Models/engineer-cards';


@Component({
  selector: 'app-admin-engineer',
  imports: [CommonModule],
  templateUrl: './admin-engineer.html',
  styleUrl: './admin-engineer.css',
})
export class AdminEngineer {
engineer: Engineer = {
    id: 1,
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    education: '',
    employmentHistory: '',
    numberOfYearsOfExperience: 0,
  };

  cards: EngineerCards = {
    students: 0,
    reports: 0,
    rating: 0,
  };
Engineers: any;

  constructor(private readonly engineerService: EngineerService) {}


  ngOnInit(): void {

  const engineerId = 1000;
  this.engineerService.getEngineer(engineerId).subscribe({
    next: (data) => {
      console.log("Engineer:", data);
      this.engineer = data;
    },
    error: (err) => {
      console.log(err);
    }
  });

  this.engineerService.getEngineerCards(engineerId).subscribe({
    next: (data) => {
      console.log("Cards:", data);
        this.cards = data;
    },
    error: (err) => {
      console.log(err);
    }
  });
}}


