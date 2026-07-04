import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { Student } from '../../Services/student';
import { StudentsListInterface } from '../../Models/Students_list';
@Component({
  selector: 'app-students-list',
  imports: [CommonModule],
  templateUrl: './students-list.html',
  styleUrl: './students-list.css',
})
export class StudentsList {
students = signal<StudentsListInterface[]>([]);
  constructor(private readonly studentService: Student) {}
  ngOnInit(): void {
    this.loadAllEngineers()
  }
  loadAllEngineers(){
    this.studentService.getAllStudents().subscribe({
      next: (data) => {
        this.students.set(data);
        console.log(data);
      },
      error : (err) => {
        console.log(err);
      }
    })
  }
}
