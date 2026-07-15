import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from './Components/dashboard/dashboard';
import { EngineerDetailsOverView } from './Components/engineer-details-overview/engineer-details';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dashboard, EngineerDetailsOverView],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ntg_admin');
}
