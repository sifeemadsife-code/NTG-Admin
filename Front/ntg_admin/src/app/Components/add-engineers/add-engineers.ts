import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-add-engineers',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-engineers.html',
  styleUrls: ['./add-engineers.css']
})
export class AddEngineersComponent implements OnInit {

  engineerForm!: FormGroup;

  loading = false;

  sidebarItems = [
    { icon: 'dashboard', label: 'Dashboard', active: false },
    { icon: 'engineering', label: 'Engineers', active: true },
    { icon: 'school', label: 'Students', active: false },
    { icon: 'analytics', label: 'Reports', active: false },
    { icon: 'model_training', label: 'Training Program', active: false },
    { icon: 'menu_book', label: 'Subjects', active: false },
    { icon: 'notifications', label: 'Notification', active: false },
    { icon: 'settings', label: 'Settings', active: false },
    { icon: 'account_circle', label: 'Profile', active: false },
    { icon: 'logout', label: 'Log Out', active: false }
  ];

  // بيانات وهمية كأنها جاية من Database
  subjects = [
    {
      id: 1,
      name: 'Programming'
    },
    {
      id: 2,
      name: 'Mathematics'
    },
    {
      id: 3,
      name: 'Physics'
    },
    {
      id: 4,
      name: 'Chemistry'
    },
    {
      id: 5,
      name: 'English'
    }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    this.engineerForm = this.fb.group({

      fullName: [
        '',
        Validators.required
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{11}$')
        ]
      ],

      subject: [
        '',
        Validators.required
      ],

      experience: [
        '',
        Validators.required
      ],

      joinDate: [
        '',
        Validators.required
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ]

    });

  }

  onSubmit(): void {

    if (this.engineerForm.invalid) {

      this.engineerForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    this.fakeApi(this.engineerForm.value).subscribe({

      next: (response) => {

        console.log(response);

        alert("Engineer Added Successfully");

        this.loading = false;

        this.engineerForm.reset();

      },

      error: (error) => {

        console.log(error);

        this.loading = false;

        alert("Something Went Wrong");

      }

    });

  }

  // Fake API كأن البيانات راجعة من Backend
  fakeApi(data: any): Observable<any> {

    console.log("Sending Data...");

    console.log(data);

    return of({

      success: true,

      message: "Engineer Saved Successfully"

    });

  }

}