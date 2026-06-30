import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineerService } from '../../Services/engineer';
import { Engineer } from '../../Models/engineer';
import { EngineerCards } from '../../Models/engineer-cards';
import { EngineerList } from '../../Models/engineer_list';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-students-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './students-list.html',
  styleUrl: './students-list.css',
})
export class StudentsList {
engineers = signal<EngineerList[]>([]);
  constructor(private readonly engineerService: EngineerService) {}
  ngOnInit(): void {
    this.loadAllEngineers()
  }
  loadAllEngineers(){
    this.engineerService.getAllEngineers().subscribe({
      next: (data) => {
        this.engineers.set(data);
        console.log(data);
      },
      error : (err) => {
        console.log(err);
      }
    })
  }
  deleteEngineer(id: number){
    if(!confirm("Are you sure you want to delete this engineer?")){
      return;
    }
    this.engineerService.deleteEngineer(id).subscribe({
      next: () => {
        alert("Engineer deleted successfully");
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
