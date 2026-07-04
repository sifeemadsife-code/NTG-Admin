import { Component, signal, OnInit } from '@angular/core';
import { TrainingService } from '../../Services/training-service';
import { TrainingProgramList } from '../../Models/training_program_list';

@Component({
  selector: 'app-programs-list',
  imports: [],
  templateUrl: './programs-list.html',
  styleUrl: './programs-list.css',
})
export class ProgramsList implements OnInit {
  programs = signal<TrainingProgramList[]>([]);

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.getAllPrograms();
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
}
