import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Engineer } from '../../Models/engineer';
import { GradeModel } from '../../Models/grade';
import { TrainingService } from '../../Services/training-service';
import { EngineerService } from '../../Services/engineer';
import { GradeService } from '../../Services/grade';
import { Router, RouterLink } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar";
import { SuccessMessageService } from '../../Services/success-message';

@Component({
  selector: 'app-create-training-program',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SidebarComponent],
  templateUrl: './create-training-program.html',
  styleUrl: './create-training-program.css',
})
export class CreateTrainingProgramComponent implements OnInit {
  engineers = signal<Engineer[]>([]);
  grades = signal<GradeModel[]>([]);
  trainingForm!: FormGroup;
  isSidebarOpen = false;


  constructor(
    private fb: FormBuilder,
    private service: TrainingService,
    private engineerService: EngineerService,
    private gradeService: GradeService,
    private router: Router,
    private successMessage: SuccessMessageService,
  ) {}
  menuItems = [
    { icon: 'fas fa-home', label: 'Dashboard', route: '/dashboard' },
    { icon: 'fas fa-users-cog', label: 'Engineers', route: '/engineersList' },
    { icon: 'fas fa-user-graduate', label: 'Students', route: '/studentsList' },
    { icon: 'fas fa-chart-bar', label: 'Reports', route: '/reports', active: true },
    { icon: 'fas fa-book', label: 'Training Program', route: '/trainingProgramsList' },
    { icon: 'fas fa-book-open', label: 'Subjects', route: '/subjects' },
    { icon: 'fas fa-bell', label: 'Notification', route: '/notifications' },
    { icon: 'fas fa-cog', label: 'Settings', route: '/settings' },
    { icon: 'fas fa-user', label: 'Profile', route: '/profile' },
  ];
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.router.navigate(['/']);
  }

  loadAllEngineers() {
    this.engineerService.getAllEngineers().subscribe({
      next: (data) => {
        this.engineers.set(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadAllGrades() {
    this.gradeService.getAllGrades().subscribe({
      next: (data) => {
        this.grades.set(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.loadAllEngineers();
    this.loadAllGrades();
    this.trainingForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      engineerId: ['', Validators.required],
      gradeId: ['', Validators.required],
      location: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  createProgram(): void {
    if (this.trainingForm.invalid) {
      this.trainingForm.markAllAsTouched();
      this.successMessage.showError(this.successMessage.validationMessage(this.trainingForm, {
        title: 'Program Name', description: 'Description', engineerId: 'Engineer', gradeId: 'Grade',
        location: 'Location', startDate: 'Start Date', endDate: 'End Date',
      }));
      return;
    }

    const formValue = this.trainingForm.value;
    const engineerId = Number(formValue.engineerId);
    const gradeId = Number(formValue.gradeId);

    const payload = {
      programName: formValue.title,
      description: formValue.description,
      teacherId: engineerId,
      userId: engineerId,
      gradeId: gradeId,
      location: formValue.location,
      startDate: formValue.startDate,
      endDate: formValue.endDate,
    };

    this.service.createProgram(payload).subscribe({
      next: (res) => {
        console.log(res);
        this.successMessage.show('Training Program created successfully!');
        this.trainingForm.reset();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
