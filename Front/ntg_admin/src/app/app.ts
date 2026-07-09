import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EngineerDetailsOverView } from './Components/engineer-details-overview/engineer-details';
import { Dashboard } from './Components/dashboard/dashboard';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dashboard, EngineerDetailsOverView],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ntg_admin');
}
