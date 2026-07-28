import { Component, OnInit, signal, computed, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CourseResponseDTO, CourseService } from '../../Services/course-service';
import { SidebarComponent } from "../sidebar/sidebar";
import { SuccessMessageService } from '../../Services/success-message';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SidebarComponent],
  templateUrl: './subject.html',
  styleUrls: ['./subject.css'],
})
export class Subject implements OnInit {
      isSidebarOpen = false;

  private courseService = inject(CourseService);
  private successMessage = inject(SuccessMessageService);
  courses = signal<CourseResponseDTO[]>([]);
  loading = signal(false);
  error = signal('');
  searchText = signal('');

  currentPage = signal(1);
  itemsPerPage = signal(5);
  private router = inject(Router);
  menuItems = [
    { icon: 'fas fa-home', label: 'Dashboard', route: '/dashboard' },
    { icon: 'fas fa-users-cog', label: 'Engineers', route: '/engineersList' },
    { icon: 'fas fa-user-graduate', label: 'Students', route: '/studentsList' },
    { icon: 'fas fa-chart-bar', label: 'Reports', route: '/reports' },
    { icon: 'fas fa-book', label: 'Training Program', route: '/trainingProgramsList' },
    { icon: 'fas fa-book-open', label: 'Subjects', route: '/subjects', active: true },
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

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loading.set(true);

    this.courseService.getAll().subscribe({
      next: (data) => {
        this.courses.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }

  // Filtered courses
  filteredCourses = computed(() => {
    let result = this.courses();

    const text = this.searchText().trim().toLowerCase();

    if (text) {
      result = result.filter(
        (course) =>
          course.courseName.toLowerCase().includes(text) ||
          course.courseType.toLowerCase().includes(text) ||
          course.description.toLowerCase().includes(text) ||
          course.teacherFirstName.toLowerCase().includes(text) ||
          course.teacherLastName.toLowerCase().includes(text),
      );
    }

    return result;
  });

  // Total pages
  totalPages = computed(() => {
    return Math.max(1, Math.ceil(this.filteredCourses().length / this.itemsPerPage()));
  });

  // Paginated courses
  paginatedCourses = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();

    return this.filteredCourses().slice(start, start + this.itemsPerPage());
  });

  // Page numbers
  pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  getTeacherFullName(course: CourseResponseDTO): string {
    return `${course.teacherFirstName} ${course.teacherLastName}`;
  }

  async deleteCourse(id: number): Promise<void> {
    if (!(await this.successMessage.confirm('Are you sure you want to delete this course?', 'Delete course?'))) return;

    this.courseService.delete(id).subscribe({
      next: () => {
        this.courses.update((courses) => courses.filter((c) => c.id !== id));
        this.successMessage.show('Course deleted successfully.');
      },

      error: (err) => {
        this.error.set(err.message);
        this.successMessage.showError(err?.error?.message || 'Failed to delete course.');
      },
    });
  }

  editCourse(id: number): void {
    this.router.navigate(['/edit-course', id]);
  }
}
