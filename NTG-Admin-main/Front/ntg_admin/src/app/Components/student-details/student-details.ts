// Front/ntg_admin/src/app/Components/student-details/student-details.ts
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Student } from '../../Services/student';
import { StudentDetails } from '../../Models/StudentSubject ';
import { SidebarComponent } from "../sidebar/sidebar";

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './student-details.html',
  styleUrls: ['./student-details.css'],
})
export class StudentDetailsComponent implements OnInit {
  getAttendanceMessage(): string {
  const rate = this.student().attendanceRate;

  if (rate >= 95) {
    return 'Excellent! Keep it up.';
  } else if (rate >= 80) {
    return 'Very good! Stay consistent.';
  } else if (rate >= 60) {
    return 'Good, but you can improve.';
  } else if (rate >= 40) {
    return 'Your attendance needs improvement.';
  } else {
    return 'Poor attendance. Please attend classes regularly.';
  }
}
getViolationMessage(): string {
  const violations = this.student().violationsCount;

  if (violations === 0) {
    return 'Excellent behavior. Keep it up!';
  } else if (violations <= 2) {
    return 'Good behavior. Be more careful.';
  } else if (violations <= 5) {
    return 'Too many violations. Please improve.';
  } else {
    return 'Critical behavior. Immediate improvement is required.';
  }
}
  getInitials(): string {
  const student = this.student();

  const first = student.firstName?.charAt(0) || '';
  const last = student.lastName?.charAt(0) || '';

  return (first + last).toUpperCase();
}
  private studentService = inject(Student);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  isSidebarOpen = false;
  studentId = 0;
  loading = signal(true);
  error = signal<string | null>(null);
  student = signal<StudentDetails>({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    grade: null,
    studentNumber: 0,
    attendanceRate: 0,
    assignmentsDone: 0,
    violationsCount: 0,
    classRank: 0,
    subjects: [],
   
  });

  currentPage = signal(1);
  itemsPerPage = signal(5);

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.student().subjects.length / this.itemsPerPage()))
  );

  paginatedSubjects = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    return this.student().subjects.slice(start, start + this.itemsPerPage());
  });

  pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  menuItems = [
    { icon: 'fas fa-home', label: 'Dashboard', route: '/dashboard' },
    { icon: 'fas fa-users-cog', label: 'Engineers', route: '/engineersList' },
    { icon: 'fas fa-user-graduate', label: 'Students', route: '/studentsList', active: true },
    { icon: 'fas fa-chart-bar', label: 'Reports', route: '/reports' },
    { icon: 'fas fa-book', label: 'Training Program', route: '/trainingProgramsList' },
    { icon: 'fas fa-book-open', label: 'Subjects', route: '/subjects' },
    { icon: 'fas fa-bell', label: 'Notification', route: '/notification' },
    { icon: 'fas fa-cog', label: 'Settings', route: '/settings' },
    { icon: 'fas fa-user', label: 'Profile', route: '/profile' },
  ];

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStudentDetails();
  }

  loadStudentDetails(): void {
    this.loading.set(true);
    this.error.set(null);

    this.studentService.getStudentDetails(this.studentId).subscribe({
      next: (data) => {
        this.student.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load student details');
        this.loading.set(false);
        console.log(err);
      },
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.router.navigate(['/']);
  }
}
