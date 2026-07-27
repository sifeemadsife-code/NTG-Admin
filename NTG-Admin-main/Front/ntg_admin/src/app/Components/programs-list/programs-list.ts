import { Component, signal, OnInit, inject, computed } from '@angular/core';
import { TrainingService } from '../../Services/training-service';
import { TrainingProgramList } from '../../Models/training_program_list';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar';

@Component({
  selector: 'app-programs-list',
  imports: [RouterLink, CommonModule, SidebarComponent],
  templateUrl: './programs-list.html',
  styleUrl: './programs-list.css',
})
export class ProgramsList implements OnInit {
  isSidebarOpen = false;

  programs = signal<TrainingProgramList[]>([]);

  constructor(private trainingService: TrainingService) {}
  private router = inject(Router);
  searchTerm = signal('');
  ngOnInit(): void {
    this.getAllPrograms();
    this.getProgramsCount();
  }
  count = 0;
  getProgramsCount() {
    this.trainingService.getProgramsCount().subscribe({
      next: (value) => {
        this.count = value;
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getAllPrograms() {
    this.trainingService.getTrainingPrograms().subscribe({
      next: (data) => {
        this.programs.set(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteEngineer(id: number) {
    if (!confirm('Are you sure you want to delete this Program?')) {
      return;
    }
    this.trainingService.deleteProgram(id).subscribe({
      next: () => {
        alert('Program deleted successfully');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  filteredPrograms = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();

    return this.programs().filter(
      (program) => search === '' || program.program_name.toLowerCase().includes(search),
    );
  });
}
