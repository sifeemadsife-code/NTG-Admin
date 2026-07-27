export interface NavItem {
  icon: string;
  label: string;
  route: string;
}

// Single source of truth for the sidebar links.
// Add / remove / rename a link ONCE here and every page that uses
// <app-sidebar> updates automatically. No more copy-pasting this
// array into every component.
export const NAV_ITEMS: NavItem[] = [
  { icon: 'fas fa-home', label: 'Dashboard', route: '/dashboard' },
  { icon: 'fas fa-users-cog', label: 'Engineers', route: '/engineersList' },
  { icon: 'fas fa-user-graduate', label: 'Students', route: '/studentsList' },
  { icon: 'fas fa-chart-bar', label: 'Reports', route: '/reports' },
  { icon:'fa-solid fa-envelope' ,label: 'Send Email', route: '/sendEmail' },
  { icon: 'fas fa-book', label: 'Training Program', route: '/trainingProgramsList' },
  { icon: 'fas fa-book-open', label: 'Subjects', route: '/subjects' },
  { icon: 'fas fa-bell', label: 'Notification', route: '/notifications' },
  { icon: 'fas fa-cog', label: 'Settings', route: '/settings' },
  { icon: 'fas fa-user', label: 'Profile', route: '/profile' },
];
