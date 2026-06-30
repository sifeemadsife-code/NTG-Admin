import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineerService } from '../../Services/engineer';
import { Student } from '../../Services/student';
import { Engineer } from '../../Models/engineer';
import { EngineerCards } from '../../Models/engineer-cards';
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
  selector: 'app-engineer-details-overview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './engineer-details.html',
  styleUrls: ['./engineer-details.css'],
})
export class EngineerDetailsOverView implements OnInit {

  engineer = signal<Engineer>({
    id: 1,
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    education: '',
    employmentHistory: '',
    numberOfYearsOfExperience: 0,
  });

  cards = signal<EngineerCards>({
    students: 0,
    reports: 0,
    rating: 0,
  });

  totalStudents = signal<number>(0);

  studentsPercentage = computed(() => {
    const total = this.totalStudents();
    if (!total) return 0;
    return (this.cards().students / total) * 100;
  });

  engineer_id = 0;
  constructor(
    private readonly engineerService: EngineerService,
    private readonly studentService: Student,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.engineer_id = Number(this.route.snapshot.paramMap.get('id'));

    this.engineerService.getEngineer(this.engineer_id).subscribe({
      next: (data) => this.engineer.set(data),
      error: (err) => console.log(err)
    });

    this.engineerService.getEngineerCards(this.engineer_id).subscribe({
      next: (data) => this.cards.set(data),
      error: (err) => console.log(err)
    });

    this.studentService.getAllStudents().subscribe({
      next: (data: any) => this.totalStudents.set(Array.isArray(data) ? data.length : 0),
      error: (err) => console.log(err)
    });
  }
}