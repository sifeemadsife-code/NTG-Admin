import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../../Services/training-service';
import { Training } from '../../Models/Training';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EngineerCards } from '../../Models/engineer-cards';
import { EngineerService } from '../../Services/engineer';
import { Engineer } from '../../Models/engineer';
import { SidebarComponent } from "../sidebar/sidebar";
import { Student } from '../../Services/student'; // إضافة Student Service

@Component({
  selector: 'app-training-program-engineer',
  standalone: true,
  imports: [CommonModule, RouterLink, SidebarComponent],
  templateUrl: './training-program-engineer.html',
  styleUrls: ['./training-program-engineer.css'],
})
export class TrainingProgramEngineer implements OnInit {
  loading = true;

  // ====== Engineer Data ======
  engineer = signal<Engineer>({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    education: '',
    employmentHistory: '',
    numberOfYearsOfExperience: 0,
    birthDate: new Date(),
    gender: '',
    religion: '',
    nationalNumber: 0,
    status: true,
  });

  // ====== Training Data ======
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

  // ====== Cards Data ======
  cards = signal<EngineerCards>({
    students: 0,
    reports: 0,
    rating: 4.8,
  });

  // ====== Search ======
  searchTerm = signal('');

  // ====== Student Counts ======
  totalStudents = signal<number>(0);
  studentsCount = signal<number>(0); // عدد الطلاب في البرنامج
  studentCount = signal<number>(0); // إجمالي عدد الطلاب

  // ====== Engineers Count ======
  engineersCount = signal<number>(1);

  // ====== Program Duration ======
  programDuration = signal<string>('12 Weeks');
  programDurationLabel = signal<string>('Program Duration');

  // ====== Computed Values ======
  studentsPercentage = computed(() => {
    const total = this.totalStudents();
    if (!total) return 0;
    return (this.cards().students / total) * 100;
  });

  // ====== Filtered Engineers ======
  filteredEngineers = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const engineer = this.engineer();
    if (!term) return engineer.id ? [engineer] : [];
    
    const fullName = `${engineer.firstName} ${engineer.lastName}`.toLowerCase();
    if (fullName.includes(term)) {
      return engineer.id ? [engineer] : [];
    }
    return [];
  });

  program_id = 0;

  constructor(
    private service: TrainingService,
    private engineerService: EngineerService,
    private studentService: Student, // إضافة Student Service
    private router: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.program_id = Number(this.router.snapshot.paramMap.get('id'));

    this.service.getProgram(this.program_id).subscribe({
      next: (data) => {
        this.training.set(data);
        this.loading = false;
        console.log('Training Data:', data);

        this.engineerService.getEngineer(data.teacherId).subscribe({
          next: (engineerData) => {
            this.engineer.set(engineerData);
            console.log('Engineer Data:', engineerData);
          },
          error: (err) => {
            console.log('Error fetching engineer:', err);
          },
        });

        this.engineerService.getEngineerCards(data.teacherId).subscribe({
          next: (cardsData) => {
            this.cards.set(cardsData);
            console.log('Cards Data:', cardsData);
          },
          error: (err) => {
            console.log('Error fetching cards:', err);
          },
        });

        this.calculateDuration(data.startDate, data.endDate);
      },
      error: (err) => {
        console.log('Error fetching program:', err);
        this.loading = false;
      },
    });

    this.getTotalStudentsCount();
    
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

  // ====== Get Total Students Count ======
  getTotalStudentsCount(): void {
    this.studentService.getStudentsCount().subscribe({
      next: (value) => {
        this.studentCount.set(Number(value));
        this.totalStudents.set(Number(value));
      },
      error: (err) => console.log('Error fetching total students:', err),
    });
  }

  loadProgramStudents(): void {
    this.loading = true;
    this.service.getProgramStudents(this.program_id).subscribe({
      next: (data) => {
        this.studentsCount.set(data.length);
        this.loading = false;
      },
      error: (err) => {
        console.log('Error fetching program students:', err);
        this.loading = false;
      },
    });
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  getEngineerRating(): number {
    return this.cards().rating || 4.8;
  }

  // ====== Get Experience Years ======
  getExperienceYears(): number {
    return this.engineer().numberOfYearsOfExperience || 0;
  }

  getFullName(): string {
    return `${this.engineer().firstName} ${this.engineer().lastName}`;
  }

  getInitials(): string {
    const first = this.engineer().firstName?.charAt(0) || '';
    const last = this.engineer().lastName?.charAt(0) || '';
    return first + last;
  }
}