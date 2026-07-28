import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

export type AppLanguage = 'en' | 'ar';

const translations: Record<AppLanguage, Record<string, string>> = {
  en: {
    Dashboard: 'Dashboard', Engineers: 'Engineers', Students: 'Students', Reports: 'Reports',
    'Send Email': 'Send Email', 'Training Program': 'Training Program', Subjects: 'Subjects',
    Notification: 'Notification', Settings: 'Settings', Profile: 'Profile', 'Log Out': 'Log Out',
    Setting: 'Setting', Language: 'Language', 'Choose system language': 'Choose system language',
    'Notification Setting': 'Notification Setting', 'Manage your notification': 'Manage your notification',
    'Change Password': 'Change Password', 'Update your account password': 'Update your account password',
    Support: 'Support', 'Get support information': 'Get support information',
    'About System': 'About System', 'View system information and version': 'View system information and version',
    'Sign out from your account': 'Sign out from your account',
  },
  ar: {
    Dashboard: '\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645',
    Engineers: '\u0627\u0644\u0645\u0647\u0646\u062F\u0633\u0648\u0646', Students: '\u0627\u0644\u0637\u0644\u0627\u0628',
    Reports: '\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631', 'Send Email': '\u0625\u0631\u0633\u0627\u0644 \u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A',
    'Training Program': '\u0627\u0644\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629', Subjects: '\u0627\u0644\u0645\u0648\u0627\u062F',
    Notification: '\u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A', Settings: '\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A',
    Profile: '\u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062E\u0635\u064A', 'Log Out': '\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C',
    Setting: '\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A', Language: '\u0627\u0644\u0644\u063A\u0629',
    'Choose system language': '\u0627\u062E\u062A\u0631 \u0644\u063A\u0629 \u0627\u0644\u0646\u0638\u0627\u0645',
    'Notification Setting': '\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A',
    'Manage your notification': '\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A',
    'Change Password': '\u062A\u063A\u064A\u064A\u0631 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631',
    'Update your account password': '\u062A\u062D\u062F\u064A\u062B \u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631 \u0627\u0644\u062D\u0633\u0627\u0628',
    Support: '\u0627\u0644\u062F\u0639\u0645', 'Get support information': '\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062F\u0639\u0645',
    'About System': '\u0639\u0646 \u0627\u0644\u0646\u0638\u0627\u0645',
    'View system information and version': '\u0639\u0631\u0636 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0648\u0625\u0635\u062F\u0627\u0631 \u0627\u0644\u0646\u0638\u0627\u0645',
    'Sign out from your account': '\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C \u0645\u0646 \u0627\u0644\u062D\u0633\u0627\u0628',
  },
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  readonly language = signal<AppLanguage>(this.getSavedLanguage());

  constructor() {
    this.applyDocumentLanguage(this.language());
  }

  setLanguage(language: AppLanguage): void {
    this.language.set(language);
    localStorage.setItem('app-language', language);
    this.applyDocumentLanguage(language);
  }

  translate(key: string): string {
    return translations[this.language()][key] || key;
  }

  private getSavedLanguage(): AppLanguage {
    return localStorage.getItem('app-language') === 'ar' ? 'ar' : 'en';
  }

  private applyDocumentLanguage(language: AppLanguage): void {
    this.document.documentElement.lang = language;
    this.document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }
}
