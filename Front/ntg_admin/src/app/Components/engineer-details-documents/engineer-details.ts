import { EngineerService } from './../../Services/engineer';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-engineer-details-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './engineer-details.html',
  styleUrls: ['./engineer-details.css']
})
export class ngineerDetails implements OnInit {

  engineerData: any = null;
  documentsList: any[] = [];

  constructor(private EngineerService: EngineerService) {}

  ngOnInit(): void {
    this.loadDocuments();
  }
  loadDocuments(): void {
    this.EngineerService.getDocuments().subscribe({
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
      this.EngineerService.deleteDocument(id).subscribe({
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