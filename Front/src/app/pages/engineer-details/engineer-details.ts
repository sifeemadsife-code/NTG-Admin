import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineerService } from '../../core/services/engineer.service';

@Component({
  selector: 'app-engineer-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './engineer-details.html',
  styleUrls: ['./engineer-details.css']
})
export class EngineerDetails implements OnInit {

  engineerData: any = null;
  documentsList: any[] = [];

  constructor(private engineerService: EngineerService) {}

  ngOnInit(): void {
    this.loadEngineerProfile();
    this.loadDocuments();
  }

  loadEngineerProfile(): void {
    this.engineerService.getEngineerProfile().subscribe({
      next: (data) => {
        this.engineerData = data;
      },
      error: (err) => {
        console.error('Error loading engineer profile:', err);
      }
    });
  }

  loadDocuments(): void {
    this.engineerService.getDocuments().subscribe({
      next: (data) => {
        this.documentsList = data;
      },
      error: (err) => {
        console.error('Error loading documents:', err);
      }
    });
  }

  onDeleteDocument(id: number): void {
    if (confirm('Are you sure you want to delete this document?')) {
      this.engineerService.deleteDocument(id).subscribe({
        next: () => {
          this.loadDocuments();
        },
        error: (err) => {
          console.error('Error deleting document:', err);
        }
      });
    }
  }
}