import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overview } from './overview/overview';
import { Toolbar } from './toolbar/toolbar';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Overview, Toolbar],
  template: `
    <app-toolbar></app-toolbar>
    <app-overview></app-overview>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('ng-signals');
}
