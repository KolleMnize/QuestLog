import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppStore } from '../application/app.store';

@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet],
  templateUrl: 'app.html',
  styleUrl: 'app.scss'
})

export class App implements OnInit{
  protected readonly title = signal('questlog-web');

  private appStore = inject(AppStore);

  async ngOnInit() {
    await this.appStore.init();
  }
}
