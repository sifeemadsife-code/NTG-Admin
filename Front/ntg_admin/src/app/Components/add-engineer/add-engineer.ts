import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EngineerService } from '../../Services/engineer';
import { CreateEngineer } from '../../Models/create_engineer';

@Component({
  selector: 'app-add-engineer',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './add-engineer.html',
  styleUrl: './add-engineer.css',
})
export class AddEngineer {
  newEngineer = signal<CreateEngineer>({
    firstName: '',
    lastName: '',
    firstNameInArabic: '',
    lastNameInArabic: '',
    address: '',
    gender: '',
    nationality: '',
    birthDate: '',
    nationalNumber: null,
    religion: '',
    email: '',
    password: '',
    education: '',
    employmentHistory: '',
    numberOfYearsOfExperience: null,
  });

  submitting = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(
    private readonly engineerService: EngineerService,
    private readonly router: Router,
  ) {}

  addEngineer(): void {
    const engineer = this.newEngineer();
    if (
      !engineer.firstName ||
      !engineer.lastName ||
      !engineer.email ||
      !engineer.password ||
      !engineer.employmentHistory ||
      !engineer.numberOfYearsOfExperience ||
      !engineer.education ||
      !engineer.firstNameInArabic ||
      !engineer.lastNameInArabic ||
      !engineer.nationalNumber
    ) {
      alert('Please Fill All Required Fildes');
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);

    this.engineerService.addEngineer(engineer).subscribe({
      next: () => {
        this.submitting.set(false);
        alert('Engineer added successfully');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.submitting.set(false);
        this.errorMessage.set('Failed to add engineer. Please try again');
        if (err.status === 500) {
          alert('The email you entered is already in use.');
        } else {
          alert('Something went wrong. Please try again.');
        }
      },
    });
  }
}
