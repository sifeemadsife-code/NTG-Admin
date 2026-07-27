import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../sidebar/sidebar";
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notification-settings',
  standalone: true,
  imports: [CommonModule, SidebarComponent, FormsModule],
 templateUrl: './notication-setting.html',
  styleUrl: './notication-setting.css',
})
export class NotificationSettings {
  emailNotifications = signal(true);
  pushNotifications = signal(true);
  smsNotifications = signal(false);
  newEngineerAdded = signal(true);
  newStudentAdded = signal(true);
  newReportGenerated = signal(false);
  systemUpdates = signal(true);
  savePreferences(): void {
    const preferences = {
      channels: {
        email: this.emailNotifications(),
        push: this.pushNotifications(),
        sms: this.smsNotifications()
      },
      types: {
        newEngineer: this.newEngineerAdded(),
        newStudent: this.newStudentAdded(),
        newReport: this.newReportGenerated(),
        systemUpdates: this.systemUpdates()
      }
    }; 
    console.log('Saving preferences:', preferences);
    alert('Notification preferences saved successfully!');
  }
  resetToDefault(): void {
    this.emailNotifications.set(true);
    this.pushNotifications.set(true);
    this.smsNotifications.set(false);
    this.newEngineerAdded.set(true);
    this.newStudentAdded.set(true);
    this.newReportGenerated.set(false);
    this.systemUpdates.set(true);
  }
  cancel(): void {
    this.resetToDefault();
    alert('Changes cancelled');
  }
}