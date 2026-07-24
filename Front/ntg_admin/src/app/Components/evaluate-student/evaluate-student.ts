import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StudentEvaluationService } from '../../Services/student-evaluation';
import { Student } from '../../Services/student';
import { StudentsListInterface } from '../../Models/Students_list';
import { SidebarComponent } from "../sidebar/sidebar";
import { SuccessMessageService } from '../../Services/success-message';

@Component({
  selector: 'app-evaluate-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SidebarComponent],
  templateUrl: './evaluate-student.html',
  styleUrl: './evaluate-student.css',
})
export class EvaluateStudent implements OnInit {
  private fb = inject(FormBuilder);
  private evaluationService = inject(StudentEvaluationService);
  private studentService = inject(Student);
  private router = inject(Router);
  private successMessage = inject(SuccessMessageService);
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

  students = signal<StudentsListInterface[]>([]);
  saving = signal(false);
  error = signal('');

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      studentId: ['', Validators.required],
      evaluationDate: ['', Validators.required],
      score: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      evaluationText: ['', Validators.required],
      evaluationNote: [''],
    });

    this.studentService.getAllStudents().subscribe({
      next: (data) => this.students.set(data),
      error: (err) => console.log(err),
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.successMessage.showError(this.successMessage.validationMessage(this.form, {
        studentId: 'Student', evaluationDate: 'Evaluation Date', score: 'Score', evaluationText: 'Evaluation',
      }));
      return;
    }

    const adminId = Number(localStorage.getItem('userId')) || 1;
    this.saving.set(true);

    const payload = {
      studentId: Number(this.form.value.studentId),
      userId: adminId,
      evaluationDate: this.form.value.evaluationDate,
      score: Number(this.form.value.score),
      evaluationText: this.form.value.evaluationText,
      evaluationNote: this.form.value.evaluationNote,
    };

    this.evaluationService.create(payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.successMessage.show('Evaluation saved successfully');
        this.router.navigate(['/studentsList']);
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set('Failed to save evaluation');
        console.log(err);
      },
    });
  }
}
