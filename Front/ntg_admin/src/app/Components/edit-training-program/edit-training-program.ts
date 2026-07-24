import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TrainingService } from '../../Services/training-service';
import { SidebarComponent } from "../sidebar/sidebar";
import { SuccessMessageService } from '../../Services/success-message';

@Component({
  selector: 'app-edit-training-program',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SidebarComponent],
  templateUrl: './edit-training-program.html',
  styleUrl: './edit-training-program.css',
})
export class EditTrainingProgram implements OnInit {
  isSidebarOpen = false;

  programId = 0;
  loading = signal(true);
  saving = signal(false);
  error = signal('');

  editForm!: FormGroup;

  menuItems = [
    { icon: 'fas fa-home', label: 'Dashboard', route: '/dashboard' },
    { icon: 'fas fa-users-cog', label: 'Engineers', route: '/engineersList' },
    { icon: 'fas fa-user-graduate', label: 'Students', route: '/studentsList' },
    { icon: 'fas fa-chart-bar', label: 'Reports', route: '/reports' },
    {
      icon: 'fas fa-book',
      label: 'Training Program',
      route: '/trainingProgramsList',
      active: true,
    },
    { icon: 'fas fa-book-open', label: 'Subjects', route: '/subjects' },
    { icon: 'fas fa-bell', label: 'Notification', route: '/notification' },
    { icon: 'fas fa-cog', label: 'Settings', route: '/settings' },
    { icon: 'fas fa-user', label: 'Profile', route: '/profile' },
  ];

  constructor(
    private fb: FormBuilder,
    private service: TrainingService,
    private route: ActivatedRoute,
    private router: Router,
    private successMessage: SuccessMessageService,
  ) {}

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.programId = Number(this.route.snapshot.paramMap.get('id'));

    this.editForm = this.fb.group({
      programName: ['', Validators.required],
      description: [''],
      location: [''],
      startDate: ['', Validators.required],
      endDate: [''],
    });

    this.loadProgram();
  }

  // Converts whatever date shape the API returns (Date, ISO string, etc.)
  // into the yyyy-MM-dd format the <input type="date"> control expects.
  private toDateInputValue(value: unknown): string {
    if (!value) return '';
    const d = new Date(value as string);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().slice(0, 10);
  }

  loadProgram(): void {
    this.loading.set(true);
    this.error.set('');

    this.service.getProgram(this.programId).subscribe({
      next: (data: any) => {
        this.editForm.patchValue({
          programName: data.programName,
          description: data.description,
          location: data.location,
          startDate: this.toDateInputValue(data.startDate),
          endDate: this.toDateInputValue(data.endDate),
        });
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load training program.');
        this.loading.set(false);
        console.log(err);
      },
    });
  }

  saveProgram(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      this.successMessage.showError(this.successMessage.validationMessage(this.editForm, {
        programName: 'Program Name', startDate: 'Start Date',
      }));
      return;
    }

    this.saving.set(true);
    this.error.set('');

    const payload = {
      programName: this.editForm.value.programName,
      description: this.editForm.value.description,
      startDate: this.editForm.value.startDate,
      endDate: this.editForm.value.endDate,
      location: this.editForm.value.location,
    };

    this.service.updateProgram(this.programId, payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.successMessage.show('Training Program updated successfully');
        this.router.navigate(['/programs', this.programId]);
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set('Failed to update training program. Please try again.');
        console.log(err);
      },
    });
  }
}
