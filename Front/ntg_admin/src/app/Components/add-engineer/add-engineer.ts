import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EngineerService } from '../../Services/engineer';
import { CreateEngineer } from '../../Models/create_engineer';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../sidebar/sidebar";
import { SuccessMessageService } from '../../Services/success-message';

@Component({
  selector: 'app-add-engineer',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, SidebarComponent],
  templateUrl: './add-engineer.html',
  styleUrl: './add-engineer.css',
})
export class AddEngineer {




    isSidebarOpen = false;
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
  menuItems = [
    { icon: 'fas fa-home', label: 'Dashboard', route: '/dashboard'},
    { icon: 'fas fa-users-cog', label: 'Engineers', route: '/engineersList' , active: true },
    { icon: 'fas fa-user-graduate', label: 'Students', route: '/studentsList' },
    { icon: 'fas fa-chart-bar', label: 'Reports', route: '/reports' },
    { icon: 'fas fa-book', label: 'Training Program', route: '/trainingProgramsList' },
    { icon: 'fas fa-book-open', label: 'Subjects', route: '/subjects' },
    { icon: 'fas fa-bell', label: 'Notification', route: '/notfications' },
    { icon: 'fas fa-cog', label: 'Settings', route: '/settings' },
    { icon: 'fas fa-user', label: 'Profile', route: '/profile' },
  ];
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.router.navigate(['/']);
  }

  constructor(
    private readonly engineerService: EngineerService,
    private readonly router: Router,
    private readonly successMessage: SuccessMessageService,
  ) {}

  addEngineer(engineerForm: NgForm): void {
    const engineer = this.newEngineer();
    const missingFields = [
      !engineer.firstName && 'First Name', !engineer.lastName && 'Last Name',
      !engineer.firstNameInArabic && 'First Name in Arabic', !engineer.lastNameInArabic && 'Last Name in Arabic',
      !engineer.email && 'Email', !engineer.password && 'Password', !engineer.address && 'Address',
      !engineer.nationality && 'Nationality', !engineer.birthDate && 'Birth Date',
      engineer.nationalNumber == null && 'National Number', !engineer.religion && 'Religion', !engineer.gender && 'Gender',
      !engineer.education && 'Education', engineer.numberOfYearsOfExperience == null && 'Years of Experience',
      !engineer.employmentHistory && 'Employment History',
    ].filter(Boolean) as string[];

    if (engineerForm.invalid || missingFields.length) {
      engineerForm.control.markAllAsTouched();
      const fieldLabels: Record<string, string> = {
        firstName: 'First Name', lastName: 'Last Name', firstNameInArabic: 'First Name in Arabic',
        lastNameInArabic: 'Last Name in Arabic', email: 'Email', password: 'Password', address: 'Address',
        nationality: 'Nationality', birthDate: 'Birth Date', nationalNumber: 'National Number', religion: 'Religion',
        gender: 'Gender', education: 'Education', numberOfYearsOfExperience: 'Years of Experience',
        employmentHistory: 'Employment History',
      };
      const invalidFields = Object.entries(engineerForm.controls)
        .filter(([, control]) => control.invalid)
        .map(([name]) => fieldLabels[name] ?? name);
      const fields = [...new Set([...missingFields, ...invalidFields])];
      this.successMessage.showError(
        fields.length ? `Please complete the following fields: ${fields.join(', ')}.` : 'Please review the form fields and try again.',
      );
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);

    this.engineerService.addEngineer(engineer).subscribe({
     next: () => {
  this.submitting.set(false);

  this.successMessage.show('Engineer added successfully!', 2000);



  setTimeout(() => {
    this.router.navigate(['/engineersList']);
  }, 2000);
},
      error: (err) => {
        this.submitting.set(false);
        this.errorMessage.set('Failed to add engineer. Please try again');
        if (err.status === 500) {
          this.successMessage.showError('The email you entered is already in use.');
        } else {
          this.successMessage.showError('Failed to add engineer. Please try again.');
        }
      },
    });
  }
}
