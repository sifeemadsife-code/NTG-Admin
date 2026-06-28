import { Engineer } from './../../Models/engineer';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EngineerService } from '../../Services/engineer';
import { Engineer as FullEngineer } from '../../Models/engineer';

@Component({
  selector: 'app-update-data',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-data.html',
  styleUrls: ['./update-data.css'],
})
export class UpdateDataComponent implements OnInit {
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
  imageSrc = 'images/avatar.png';
  private fullEngineer: FullEngineer | null = null;

  constructor(private engineerService: EngineerService) {}

  ngOnInit(): void {
    this.engineerService.getEngineer(1).subscribe((data) => {
      this.fullEngineer = data;
      this.engineer = {
        id: 1,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        address: data.address,
        education: data.education,
        employmentHistory: data.employmentHistory,
        numberOfYearsOfExperience: data.numberOfYearsOfExperience,
      };
      this.imageSrc = 'assets/images/avatar.png';
    });
  }

  saveEngineer(): void {
    if (!this.fullEngineer) {
      return;
    }

    const updatedEngineer: FullEngineer = {
      ...this.fullEngineer,
      id: 1,
      firstName: this.engineer.firstName,
      lastName: this.engineer.lastName,
      email: this.engineer.email,
      address: this.engineer.address,
      education: this.engineer.education,
      employmentHistory: this.engineer.employmentHistory,
      numberOfYearsOfExperience: this.engineer.numberOfYearsOfExperience,
    };

    this.engineerService.updateEngineer(this.engineer.id, updatedEngineer).subscribe(() => {
      alert('Engineer Updated');
    });
  }
}
