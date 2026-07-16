import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Student } from '../../Services/student';
import { StudentsListInterface } from '../../Models/Students_list';
import { SidebarComponent } from "../sidebar/sidebar";
@Component({
  selector: 'app-students-list',
  imports: [CommonModule, RouterLink, SidebarComponent],
  templateUrl: './students-list.html',
  styleUrl: './students-list.css',
})
export class StudentsList {
      isSidebarOpen = false;
  students = signal<StudentsListInterface[]>([]);
  searchTerm = signal('');
  statusFilter = signal('active');
  constructor(private readonly studentService: Student) {}
  private router = inject(Router);
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
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
    this.loadAllEngineers();
  }
  loadAllEngineers() {
    this.studentService.getAllStudents().subscribe({
      next: (data) => {
        this.students.set(data);
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  filteredStudents = computed(() => {
    const search = this.searchTerm().trim();
    const status = this.statusFilter();

    return this.students().filter((student) => {
      // Search by ID
      const matchesSearch = search === '' || student.id.toString().includes(search);

      // Filter by status
      const matchesStatus =
        status === 'all' ? true : status === 'active' ? !student.status : student.status;

      return matchesSearch && matchesStatus;
    });
  });
}
