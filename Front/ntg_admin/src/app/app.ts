import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashBoard } from "./Components/dash-board/dash-board";
import { EngineerDetailsOverView } from './Components/engineer-details-overview/engineer-details';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DashBoard, EngineerDetailsOverView],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ntg_admin');
}
