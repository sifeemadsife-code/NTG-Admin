import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EngineerService } from '../../Services/engineer';
import { Engineer } from '../../Models/engineer';

@Component({
  selector: 'app-update-data',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-data.html',
  styleUrls: ['./update-data.css'],
})
export class UpdateDataComponent implements OnInit {

  engineer = signal<Engineer>({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    education: '',
    employmentHistory: '',
    numberOfYearsOfExperience: 0,
  });

  engineer_id!: number;

  constructor(
    private readonly engineerService: EngineerService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.engineer_id = Number(this.route.snapshot.paramMap.get('id'));

    this.engineerService.getEngineer(this.engineer_id).subscribe({
      next: (data) => {
        this.engineer.set(data);
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  saveEngineer(): void {

    this.engineerService
      .updateEngineer(this.engineer_id, this.engineer())
      .subscribe({
        next: () => {
          alert('Engineer Updated Successfully');
        },
        error: (err) => {
          console.error(err);
        }
      });

  }

}