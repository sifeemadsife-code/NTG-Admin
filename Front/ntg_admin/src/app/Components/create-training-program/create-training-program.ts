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
      location: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  createProgram(): void {
  if (this.trainingForm.invalid) {
    this.trainingForm.markAllAsTouched();
    return;
  }

  const formValue = this.trainingForm.value;
  const engineerId = Number(formValue.engineerId);

  const payload = {
    programName: formValue.title,
    description: formValue.description,
    teacherId: engineerId,
    userId: engineerId,
    location: formValue.location,
    startDate: formValue.startDate,
    endDate: formValue.endDate,
  };

  this.service.createProgram(payload).subscribe({
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