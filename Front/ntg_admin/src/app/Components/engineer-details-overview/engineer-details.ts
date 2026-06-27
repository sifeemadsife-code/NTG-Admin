import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngineerService } from '../../Services/engineer';
import { Engineer } from '../../Models/engineer';

@Component({
  selector: 'app-engineer-details-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './engineer-details.html',
  styleUrls: ["./engineer-details.css"],
})
export class EngineerDetailsOverView implements OnInit {
  engineer: Engineer = {
    status: '',
    fullName: '',
    specialization: '',
    salary: '',
    email: '',
    phone: '',
    joinDate: '',
    experience: '',
    students: 0,
    reports: 0,
    rating: 0,
    projects: 0,
    projectsPercent: 0,
    reportsPercent: 0,
    attendancePercent: 0,
    about: '',
    subjects: '',
    skills: [],
    performance: 0,
  };

  constructor(private readonly engineerService: EngineerService) {}

  ngOnInit(): void {
    this.engineerService.getEngineer(1).subscribe({
      next: (data) => {
        this.engineer = {
          ...data,
          projectsPercent: data.projectsPercent ?? data.projects ?? 0,
          reportsPercent: data.reportsPercent ?? data.reports ?? 0,
          attendancePercent: data.attendancePercent ?? 0,
        };
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  get performanceGradient(): string {
    const value = Math.max(0, Math.min(100, this.engineer.performance ?? 0));
    const degrees = Math.round(value * 3.6);
    return `conic-gradient(#2d6df6 0deg ${degrees}deg, #e5e7eb ${degrees}deg 360deg)`;
  }
}
