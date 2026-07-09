import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { EngineerService } from '../../Services/engineer';
import { CourseService } from '../../Services/course-service';

@Component({
  selector: 'app-add-subject',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-subject.html',
  styleUrls: ['./add-subject.css'],
})
export class AddSubject implements OnInit {
  private courseService = inject(CourseService);
  private teacherService = inject(EngineerService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  engineers = signal<any[]>([]);
  loading = signal(false);
  saving = signal(false);
  error = signal('');

  subjectForm!: FormGroup;

  menuItems = [
    { icon: 'fas fa-home', label: 'Dashboard', route: '/dashboard' },
    { icon: 'fas fa-users-cog', label: 'Engineers', route: '/' },
    { icon: 'fas fa-user-graduate', label: 'Students', route: '/studentsList' },
    { icon: 'fas fa-chart-bar', label: 'Reports', route: '/reports' },
    { icon: 'fas fa-book', label: 'Training Program', route: '/trainingProgramsList' },
    { icon: 'fas fa-book-open', label: 'Subjects', route: '/subjects', active: true },
    { icon: 'fas fa-bell', label: 'Notification', route: '/notification' },
    { icon: 'fas fa-cog', label: 'Settings', route: '/settings' },
    { icon: 'fas fa-user', label: 'Profile', route: '/profile' },
  ];

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

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.router.navigate(['/']);
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
      return;
    }

    this.saving.set(true);

    this.courseService.create(this.subjectForm.value).subscribe({
      next: () => {
        this.saving.set(false);

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
