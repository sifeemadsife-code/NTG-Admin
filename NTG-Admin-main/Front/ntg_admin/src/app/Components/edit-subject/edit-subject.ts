import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService, UpdateCourseRequestDTO } from '../../Services/course-service';
import { EngineerService } from '../../Services/engineer';
import { SidebarComponent } from "../sidebar/sidebar";

@Component({
  selector: 'app-edit-subject',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SidebarComponent],
  templateUrl: './edit-subject.html',
  styleUrls: ['./edit-subject.css'],
})
export class EditSubject implements OnInit {
  isSidebarOpen = false;

  courseId = 0;
  loading = signal(true);
  saving = signal(false);
  error = signal('');

  editForm!: FormGroup;
  engineers = signal<any[]>([]);

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private engineerService: EngineerService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.editForm = this.fb.group({
      courseName: ['', Validators.required],
      description: ['', Validators.required],
      studyPlan: [''],
      teacherId: [null, Validators.required],
      termId: [null, Validators.required],
    });
    this.loadEngineers();
    this.loadCourse();
  }
  loadEngineers(): void {
    this.engineerService.getAllEngineers().subscribe({
      next: (data: any[]) => this.engineers.set(data),
      error: (err) => console.log(err),
    });
  }
  loadCourse(): void {
    this.loading.set(true);
    this.error.set('');
    this.courseService.getById(this.courseId).subscribe({
      next: (data) => {
        this.editForm.patchValue({
          courseName: data.courseName,
          description: data.description,
          studyPlan: data.studyPlan,
          teacherId: data.teacherId,
          termId: data.termId,
        });
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load subject.');
        this.loading.set(false);
        console.log(err);
      },
    });
  }
  saveCourse(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.error.set('');
    const payload: UpdateCourseRequestDTO = {
      teacherId: Number(this.editForm.value.teacherId),
      termId: Number(this.editForm.value.termId),
      courseName: this.editForm.value.courseName,
      description: this.editForm.value.description,
      studyPlan: this.editForm.value.studyPlan,
    };
    this.courseService.update(this.courseId, payload).subscribe({
      next: () => {
        this.saving.set(false);
        alert('Subject updated successfully');
        this.router.navigate(['/subjects']);
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set('Failed to update subject. Please try again.');
        console.log(err);
      },
    });
  }
}
