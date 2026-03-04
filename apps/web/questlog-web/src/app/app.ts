import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './presentation/app.html',
  styleUrl: './presentation/app.scss'
})
export class App {
  protected readonly title = signal('questlog-web');
}
