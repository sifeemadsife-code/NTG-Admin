import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-write-report',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './repot-wight.html',
  styleUrls: ['./repot-wight.css'],
})
export class WriteReportComponent implements OnInit {
  report: any = {};

  reportTypes: any[] = [];
  students: any[] = [];
  engineers: any[] = [];
  programs: any[] = [];

  uploadedFiles: File[] = [];

  isLoading = false;
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

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
  }


  //=========================
  // REPORT TYPES
  //=========================


  //=========================
  // STUDENTS


  //=========================
  // ENGINEERS
  //=========================



  //=========================
  // PROGRAMS
  //=========================


  //=========================
  // FILE UPLOAD
  //=========================

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.uploadedFiles = Array.from(input.files);
  }

  //=========================
  // REMOVE FILE
  //=========================

  removeFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
  }

  //=========================
  // PREVIEW REPORT
  //=========================

  previewReport(): void {
    console.log('Preview Report');

    console.log(this.report);
  }

  //=========================
  // SAVE DRAFT
  //=========================


  //=========================
  // SUBMIT REPORT
  //=========================


  //=========================
  // RESET FORM
  //=========================

  resetForm(): void {
    this.report = {};

    this.uploadedFiles = [];
  }
}
