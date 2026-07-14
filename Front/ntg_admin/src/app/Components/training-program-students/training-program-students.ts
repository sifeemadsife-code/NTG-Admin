import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../../Services/training-service';
import { Training } from '../../Models/Training';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentsListInterface } from '../../Models/Students_list';

@Component({
  selector: 'app-training-program-students',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './training-program-students.html',
  styleUrls: ['./training-program-students.css']
})
export class TrainingProgramStudents implements OnInit {
  loading = true;

  constructor(private service: TrainingService, private route: ActivatedRoute) {}

  training = signal<Training>({
    id: 1,
    teacherId: 1,
    teacherFirstName: '',
    teacherLastName: '',
    gradeId: 0,
    gradeName: '',
    programName: '',
    description: '',
    startDate: new Date('0-0-0'),
    endDate: new Date('0-0-0'),
    location: '',
    createdAt: new Date('0-0-0'),
    totalStudents: 0,
  });

  students = signal<StudentsListInterface[]>([]);
  searchTerm = signal('');

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
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.loadProgramStudents();
  }

  loadProgramStudents(): void {
    this.loading = true;
    this.service.getProgramStudents(this.program_id).subscribe({
      next: (data) => {
        this.students.set(data);
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }
}