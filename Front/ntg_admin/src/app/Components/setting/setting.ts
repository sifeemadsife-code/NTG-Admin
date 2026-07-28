import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../sidebar/sidebar";
import { AuthService } from '../../Services/auth';
import { AppLanguage, LanguageService } from '../../Services/language';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.html',
  styleUrls: ['./setting.css'],
  imports: [RouterLink, CommonModule, SidebarComponent],
})
export class SettingComponent implements OnInit {
  isSidebarOpen = false;
  settings = {
    language: 'English',
    appearance: 'Light',
  };

  languages: string[] = ['English', 'Arabic'];

  appearances: string[] = ['Light', 'Dark'];
  private auth = inject(AuthService);
  readonly languageService = inject(LanguageService);
  readonly languageModalOpen = signal(false);
  readonly pendingLanguage = signal<AppLanguage>(this.languageService.language());
  menuItems = [
    { icon: 'fas fa-home', label: 'Dashboard', route: '/dashboard' },
    { icon: 'fas fa-users-cog', label: 'Engineers', route: '/engineersList' },
    { icon: 'fas fa-user-graduate', label: 'Students', route: '/studentsList' },
    { icon: 'fas fa-chart-bar', label: 'Reports', route: '/reports' },
    { icon: 'fas fa-book', label: 'Training Program', route: '/trainingProgramsList' },
    { icon: 'fas fa-book-open', label: 'Subjects', route: '/subjects' },
    { icon: 'fas fa-bell', label: 'Notification', route: '/notification' },
    { icon: 'fas fa-cog', label: 'Settings', route: '/settings', active: true },
    { icon: 'fas fa-user', label: 'Profile', route: '/profile' },
  ];
  logout(): void {
    this.auth.logout();
  }

  constructor() {}

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    console.log('Settings Loaded');
  }

  openLanguageModal(): void { this.pendingLanguage.set(this.languageService.language()); this.languageModalOpen.set(true); }
  selectLanguage(language: AppLanguage): void { this.pendingLanguage.set(language); }
  confirmLanguage(): void { this.languageService.setLanguage(this.pendingLanguage()); this.languageModalOpen.set(false); }
  changeLanguage(language: string): void { this.languageService.setLanguage(language as AppLanguage); }

  changeAppearance(theme: string): void {
    this.settings.appearance = theme;
    console.log('Appearance Changed:', theme);
  }

  openSupport(): void {
    console.log('Support Clicked');
  }

  changePassword(): void {
    console.log('Change Password Clicked');
  }

  openAbout(): void {
    console.log('About Clicked');
  }
}
     
