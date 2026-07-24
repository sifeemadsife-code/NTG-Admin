import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EngineerService } from '../../Services/engineer';
import { Engineer } from '../../Models/engineer';
import { SidebarComponent } from "../sidebar/sidebar";
import { SuccessMessageService } from '../../Services/success-message';

@Component({
  selector: 'app-update-data',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, SidebarComponent],
  templateUrl: './update-data.html',
  styleUrls: ['./update-data.css'],
})
export class UpdateDataComponent implements OnInit {
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

  engineer_id!: number;
  isSidebarOpen = false;
  loading = signal(false);
  saving = signal(false);
  errorMessage = signal<string | null>(null);
  menuItems = [
    { icon: 'fas fa-home', label: 'Dashboard', route: '/dashboard' },
    { icon: 'fas fa-users-cog', label: 'Engineers', route: '/engineersList', active: true },
    { icon: 'fas fa-user-graduate', label: 'Students', route: '/studentsList' },
    { icon: 'fas fa-chart-bar', label: 'Reports', route: '/reports' },
    { icon: 'fas fa-book', label: 'Training Program', route: '/trainingProgramsList' },
    { icon: 'fas fa-book-open', label: 'Subjects', route: '/subjects' },
    { icon: 'fas fa-bell', label: 'Notification', route: '/notifications' },
    { icon: 'fas fa-cog', label: 'Settings', route: '/settings' },
    { icon: 'fas fa-user', label: 'Profile', route: '/profile' },
  ];

  constructor(
    private readonly engineerService: EngineerService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly successMessage: SuccessMessageService,
  ) {}

  ngOnInit(): void {
    this.engineer_id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading.set(true);

    this.engineerService.getEngineer(this.engineer_id).subscribe({
      next: (data) => {
        this.engineer.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set('Failed to load engineer data.');
        this.loading.set(false);
      },
    });
  }

  saveEngineer(engineerForm: NgForm): void {
    if (engineerForm.invalid) {
      engineerForm.control.markAllAsTouched();
      const fieldLabels: Record<string, string> = {
        firstName: 'First Name', lastName: 'Last Name', email: 'Email', address: 'Address', education: 'Education',
      };
      const invalidFields = Object.entries(engineerForm.controls)
        .filter(([, control]) => control.invalid)
        .map(([name]) => fieldLabels[name] ?? name);
      this.successMessage.showError(`Please complete the following fields: ${invalidFields.join(', ')}.`);
      return;
    }

    this.saving.set(true);
    this.errorMessage.set(null);

    this.engineerService.updateEngineer(this.engineer_id, this.engineer()).subscribe({
      next: () => {
        this.saving.set(false);
        this.successMessage.show('Engineer updated successfully');
        this.router.navigate(['/engineersList']);
      },
      error: (err) => {
        this.saving.set(false);
        console.error(err);
        if (err.status === 500) {
          this.errorMessage.set('The email you entered is already in use.');
        } else {
          this.errorMessage.set('Failed to update engineer. Please try again.');
        }
      },
    });
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.router.navigate(['/']);
  }
}
