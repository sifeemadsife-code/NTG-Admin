import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Notification } from '../Models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  getNotifications(): Observable<Notification[]> {

    return of([

      {
        id: 1,
        title: 'New Student Registered',
        message: "A new student 'Ali Ahmed' has been registered.",
        time: 'Just now',
        icon: 'person_add',
        color: '#DFF5E2'
      },

      {
        id: 2,
        title: 'New Grade Added',
        message: "A new grade 'Grade 12' has been added.",
        time: '10 min ago',
        icon: 'school',
        color: '#E6EAFF'
      },

      {
        id: 3,
        title: 'New Assignment',
        message: "You have a new assignment.",
        time: '1 hour ago',
        icon: 'assignment',
        color: '#FFF4D8'
      },

      {
        id: 4,
        title: 'Training Program Updated',
        message: "Training program has been updated.",
        time: '3 hours ago',
        icon: 'event',
        color: '#F4E7FF'
      },

      {
        id: 5,
        title: 'New Report Generated',
        message: "Student report is ready.",
        time: '1 day ago',
        icon: 'description',
        color: '#FFE5E5'
      },

      {
        id: 6,
        title: 'System Maintenance',
        message: "Maintenance scheduled.",
        time: '2 days ago',
        icon: 'settings',
        color: '#FFEED7'
      }

    ]);

  }

}