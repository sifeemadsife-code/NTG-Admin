import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentEvaluationService } from '../../Services/student-evaluation';
import { TrainingService } from '../../Services/training-service';
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
  private trainingService = inject(TrainingService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private successMessage = inject(SuccessMessageService);

  programId = 0;
  private selectedStudentId = '';
  programName = signal('');

  // NEW: طلاب هذا البرنامج فقط، مش كل الطلاب في النظام
  students = signal<StudentsListInterface[]>([]);
  loadingStudents = signal(true);

  saving = signal(false);
  error = signal('');

  form!: FormGroup;

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.programId = Number(this.route.snapshot.paramMap.get('id'));
    this.selectedStudentId = this.route.snapshot.queryParamMap.get('studentId') || '';

    if (!this.programId) {
      this.error.set('No training program specified. Please open this page from a training program.');
      this.loadingStudents.set(false);
      return;
    }

    this.form = this.fb.group({
      studentId: [this.selectedStudentId, Validators.required],
      evaluationDate: [this.getTodayDate(), Validators.required],
      score: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      evaluationText: ['', Validators.required],
      evaluationNote: [''],
    });

    this.loadProgram();
    this.loadProgramStudents();
  }

  private loadProgram(): void {
    this.trainingService.getProgram(this.programId).subscribe({
      next: (data) => this.programName.set(data.programName),
      error: (err) => console.log(err),
    });
  }

  private loadProgramStudents(): void {
    this.loadingStudents.set(true);
    this.trainingService.getProgramStudents(this.programId).subscribe({
      next: (data) => {
        this.students.set(data);
        this.loadingStudents.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load students for this training program.');
        this.loadingStudents.set(false);
        console.log(err);
      },
    });
  }

  private getTodayDate(): string {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${today.getFullYear()}-${month}-${day}`;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.successMessage.showError(this.successMessage.validationMessage(this.form, {}));
      return;
    }

    const adminId = Number(localStorage.getItem('userId')) || 1;
    this.saving.set(true);

    const payload = {
      studentId: Number(this.form.value.studentId),
      userId: adminId,
      trainingProgramId: this.programId,
      evaluationDate: this.form.value.evaluationDate,
      score: Number(this.form.value.score),
      evaluationText: this.form.value.evaluationText,
      evaluationNote: this.form.value.evaluationNote,
    };

    this.evaluationService.create(payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.successMessage.show('Evaluation saved successfully.');
        this.router.navigate(['/programs', this.programId, 'students']);
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set('Failed to save evaluation');
        this.successMessage.showError(err?.error?.message || 'Failed to save evaluation.');
        console.log(err);
      },
    });
  }
}
