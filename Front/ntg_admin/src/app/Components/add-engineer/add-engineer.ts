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
    private readonly router: Router
  ) {}

  addEngineer(): void {
    const engineer = this.newEngineer();

    if (!engineer.firstName || !engineer.lastName || !engineer.email || !engineer.password) {
      this.errorMessage.set('Please fill in first name, last name, email and password');
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
        console.error(err);
      },
    });
  }
}