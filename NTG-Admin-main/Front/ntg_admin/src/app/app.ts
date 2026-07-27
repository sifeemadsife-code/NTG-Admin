import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from './Components/dashboard/dashboard';
import { EngineerDetailsOverView } from './Components/engineer-details-overview/engineer-details';
import { ToastComponent } from './Components/toast-component/toast-component';
import { ConfirmDialogComponent } from './Components/confirm-dialog-component/confirm-dialog-component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ToastComponent,ConfirmDialogComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ntg_admin');
}
