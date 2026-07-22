import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EngineerService } from '../../Services/engineer';
import { CreateEngineer } from '../../Models/create_engineer';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../sidebar/sidebar";

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
  successMessage = signal<string | null>(null);
  showSuccess = signal(false);
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

  this.successMessage.set('Engineer added successfully!');
  this.showSuccess.set(true);



  setTimeout(() => {
    this.showSuccess.set(false);
    this.router.navigate(['/engineersList']);
  }, 2000);
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
