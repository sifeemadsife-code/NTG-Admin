import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { EngineerService } from '../../Services/engineer';
import { CourseService } from '../../Services/course-service';
import { SidebarComponent } from "../sidebar/sidebar";
import { SuccessMessageService } from '../../Services/success-message';

@Component({
  selector: 'app-add-subject',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SidebarComponent],
  templateUrl: './add-subject.html',
  styleUrls: ['./add-subject.css'],
})
export class AddSubject implements OnInit {
  private courseService = inject(CourseService);
  private teacherService = inject(EngineerService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private successMessage = inject(SuccessMessageService);

  engineers = signal<any[]>([]);
  loading = signal(false);
  saving = signal(false);
  error = signal('');
  subjectForm!: FormGroup;
  ngOnInit(): void {
    this.subjectForm = this.fb.group({
      courseName: ['', Validators.required],
      description: ['', Validators.required],
      courseType: [''],
      studyPlan: [''],
      teacherId: [null, Validators.required],
      termId: [null, Validators.required],
    });
    this.loadTeachers();
  }
  loadTeachers(): void {
    this.loading.set(true);
    this.teacherService.getAllEngineers().subscribe({
      next: (data: any[]) => {
        this.engineers.set(data);
        this.loading.set(false);
      },
      error: (err: any) => {
        this.error.set(err.message);
        this.loading.set(false);
        console.log(err);
      },
    });
  }
  saveSubject(): void {
    if (this.subjectForm.invalid) {
      this.subjectForm.markAllAsTouched();
      this.successMessage.showError(this.successMessage.validationMessage(this.subjectForm, {
        courseName: 'Subject Name', description: 'Description', teacherId: 'Engineer', termId: 'Term',
      }));
      return;
    }
    this.saving.set(true);
    this.courseService.create(this.subjectForm.value).subscribe({
      next: () => {
        this.saving.set(false);
        this.successMessage.show('Subject created successfully!');
        this.router.navigate(['/subjects']);
      },
      error: (err: any) => {
        this.error.set(err.message);
        this.saving.set(false);
        console.log(err);
      },
    });
  }
}
