import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentEvaluationService } from '../../Services/student-evaluation';
import { StudentEvaluationModel } from '../../Models/student-evaluation';
import { SidebarComponent } from "../sidebar/sidebar";

@Component({
  selector: 'app-student-evaluations-view',
  standalone: true,
  imports: [CommonModule, RouterLink, SidebarComponent],
  templateUrl: './student-evaluations-view.html',
  styleUrl: './student-evaluations-view.css',
})
export class StudentEvaluationsView implements OnInit {
  private route = inject(ActivatedRoute);
  private evaluationService = inject(StudentEvaluationService);

  studentId = 0;
  evaluations = signal<StudentEvaluationModel[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEvaluations();
  }

  loadEvaluations(): void {
    this.loading.set(true);
    this.evaluationService.getByStudent(this.studentId).subscribe({
      next: (data) => {
        this.evaluations.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load evaluations');
        this.loading.set(false);
        console.log(err);
      },
    });
  }

  ratingLabel(score: number | null): string {
    if (score === null) return '-';
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Very Good';
    if (score >= 60) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Poor';
  }
}