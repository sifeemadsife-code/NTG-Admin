import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Engineer } from '../../Models/engineer';
import { TrainingService } from '../../Services/training-service';
import { EngineerService } from '../../Services/engineer';
@Component({
  selector: 'app-create-training-program',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-training-program.html',
  styleUrl: './create-training-program.css',
})
export class CreateTrainingProgramComponent implements OnInit {
  engineers = signal<Engineer[]>([]);
  trainingForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: TrainingService,
    private engineerService: EngineerService,
  ) {}
  loadAllEngineers() {
    this.engineerService.getAllEngineers().subscribe({
      next: (data) => {
        this.engineers.set(data);
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    this.loadAllEngineers();
    this.trainingForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      engineerId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  createProgram(): void {
    if (this.trainingForm.invalid) {
      this.trainingForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('title', this.trainingForm.value.title);
    formData.append('description', this.trainingForm.value.description);
    formData.append('engineerId', this.trainingForm.value.engineerId);
    formData.append('startDate', this.trainingForm.value.startDate);
    formData.append('endDate', this.trainingForm.value.endDate);
    this.service.createProgram(formData).subscribe({
      next: (res) => {
        console.log(res);

        alert('Training Program Created Successfully');

        this.trainingForm.reset();
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
