import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../../Services/training-service';
import { Student } from '../../Services/student'; // إضافة import للـ Student Service
import { Training } from '../../Models/Training';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentsListInterface } from '../../Models/Students_list';
import { SidebarComponent } from "../sidebar/sidebar";

@Component({
  selector: 'app-training-program-students',
  standalone: true,
  imports: [CommonModule, RouterLink, SidebarComponent],
  templateUrl: './training-program-students.html',
  styleUrls: ['./training-program-students.css']
})
export class TrainingProgramStudents implements OnInit {
  loading = true;

  constructor(
    private service: TrainingService, 
    private studentService: Student, // إضافة Student Service
    private route: ActivatedRoute
  ) {}

  training = signal<Training>({
    id: 1,
    teacherId: 1,
    teacherFirstName: '',
    teacherLastName: '',
    gradeId: 0,
    gradeName: '',
    programName: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    location: '',
    createdAt: new Date(),
    totalStudents: 0,
  });

  students = signal<StudentsListInterface[]>([]);
  searchTerm = signal('');
  studentsCount = signal(0); 
  studentCount = signal(0); 

  engineersCount = signal<number>(1);
  programDuration = signal<string>('12 Weeks');
  programDurationLabel = signal<string>('Program Duration');

  filteredStudents = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.students();
    return this.students().filter(s =>
      `${s.first_name} ${s.last_name}`.toLowerCase().includes(term)
    );
  });

  program_id = 0;

  ngOnInit() {
    this.program_id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getProgram(this.program_id).subscribe({
      next: (data) => {
        this.training.set(data);
        this.calculateDuration(data.startDate, data.endDate);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.getStudentsCount();
    
    this.loadProgramStudents();
  }

  calculateDuration(startDate: Date, endDate: Date): void {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
      this.programDuration.set(`${diffWeeks} Weeks`);
    }
  }

  loadProgramStudents(): void {
    this.loading = true;
    this.service.getProgramStudents(this.program_id).subscribe({
      next: (data) => {
        this.students.set(data);
        this.studentsCount.set(data.length); 
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  getStudentsCount(): void {
    this.studentService.getStudentsCount().subscribe({
      next: (value) => {
        this.studentCount.set(Number(value));
      },
      error: (err) => console.log(err),
    });
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }
}