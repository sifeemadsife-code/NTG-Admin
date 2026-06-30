import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../../Services/training-service';
import { Training } from '../../Models/Training';

@Component({
  selector: 'app-training-program-overveiw',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './training-program-overveiw.html',
  styleUrls: ['./training-program-overveiw.css']
})
export class TrainingProgramOverveiw implements OnInit {

  program!: Training;
  loading = true;

  constructor(private service: TrainingService) {}

  ngOnInit() {

    this.service.getProgram().subscribe({
      next: (res) => {
        this.program = res;
        this.loading = false;
      }
    });

  }

}
