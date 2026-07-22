import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
constructor(private location: Location) {}
goBack(): void {
  this.location.back();
}
}
