import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from './Components/dashboard/dashboard';
import { EngineerDetailsOverView } from './Components/engineer-overview/engineer-details';
import { SuccessMessageComponent } from './Components/success-message/success-message';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SuccessMessageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ntg_admin');
}
