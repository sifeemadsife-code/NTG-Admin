import { GradeService } from './../../Services/grade';
import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Student } from '../../Services/student';
import { StudentsListInterface } from '../../Models/Students_list';
import { SidebarComponent } from '../sidebar/sidebar';
import { GradeModel } from '../../Models/grade';
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
  gradeFilter = signal('all');
  grades = signal<GradeModel[]>([]);
  constructor(
    private readonly studentService: Student,
    private readonly gradeService: GradeService,
  ) {}
  ngOnInit(): void {
    this.loadAllEngineers();
    this.loadGrades();
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
  loadGrades() {
    this.gradeService.getAllGrades().subscribe({
      next: (data) => this.grades.set(data),
      error: (err) => console.error(err),
    });
  }
  filteredStudents = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const status = this.statusFilter();
    const grade = this.gradeFilter();
    return this.students().filter((student) => {
      const matchesSearch = search === '' || student.id.toString().includes(search);
      const matchesStatus =
        status === 'all' ? true : status === 'active' ? !student.status : student.status;
      const matchesGrade = grade === 'all' || student.grade === grade;
      return matchesSearch && matchesStatus && matchesGrade;
    });
  });
}
