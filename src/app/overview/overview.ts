import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Toolbar } from '../toolbar/toolbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-overview',
  imports: [
    CommonModule,
    RouterOutlet,
  ],
  template: `
    <router-outlet/>
  `,
  styles: ``
})
export class Overview {

}
