// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';

// import { EngineerService } from '../../Services/engineer';
// import { Engineer as FullEngineer } from '../../Models/engineer';
// import { Engineer } from './models/engineer';

// @Component({
//   selector: 'app-update-data',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './update-data.html',
//   styleUrls: ['./update-data.scss']
// })
// export class UpdateDataComponent implements OnInit {

//   engineer: Engineer = {
//     id: 0,
//     fullName: '',
//     email: '',
//     phone: '',
//     subject: '',
//     experience: '',
//     joinDate: '',
//     password: '',
//     imageUrl: ''
//   };
//   imageSrc = 'assets/images/avatar.png';
//   private fullEngineer: FullEngineer | null = null;

//   constructor(
//     private engineerService: EngineerService
//   ) {}

//   ngOnInit(): void {

//     this.engineerService
//       .getEngineer(1)
//       .subscribe(data => {
//         this.fullEngineer = data;
//         this.engineer = {
//           id: data.id,
//           fullName: data.fullName,
//           email: data.email,
//           phone: data.phone,
//           subject: data.subject ?? data.subjects ?? '',
//           experience: data.experience,
//           joinDate: data.joinDate,
//           password: '',
//           imageUrl: data.imageUrl ?? ''
//         };
//         this.imageSrc = data.imageUrl ?? 'assets/images/avatar.png';
//       });
//   }

//   saveEngineer(): void {
//     if (!this.fullEngineer) {
//       return;
//     }

//     const updatedEngineer: FullEngineer = {
//       ...this.fullEngineer,
//       subject: this.engineer.subject,
//       fullName: this.engineer.fullName,
//       email: this.engineer.email,
//       phone: this.engineer.phone,
//       experience: this.engineer.experience,
//       joinDate: this.engineer.joinDate,
//       imageUrl: this.engineer.imageUrl,
//       password: this.engineer.password
//     };

//     this.engineerService
//       .updateEngineer(
//         this.engineer.id,
//         updatedEngineer
//       )
//       .subscribe(() => {
//         alert('Engineer Updated');
//       });
//   }

//   onImageSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     const file = input?.files?.[0];
//     if (!file) {
//       return;
//     }
//     this.engineer.imageUrl = URL.createObjectURL(file);
//     this.imageSrc = this.engineer.imageUrl;
//   }
// }