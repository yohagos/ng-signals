import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

type Menu = {
  name: string,
  uri: string
}

@Component({
  selector: 'app-toolbar',
  imports: [
    CommonModule,
    RouterModule,
  ],
  template: `
    <div class="toolbar">
      <button class="menus" (click)="naviagteTo(overview.uri)"> {{overview.name}} </button>
      @for (item of menu; track $index) {
        <button class="menus" (click)="naviagteTo(item.uri)"> {{item.name}} </button>
      }
    </div>
  `,
  styles: `
  .menus {
    padding: 4px 12px;
    border: 0px; 
    border-radius: 8px;
    background-color: transparent;
  }

  .menus:hover {
    scale: 1.25;

    background-color: #ffaa34a5;

    transition: scale 1s ease-in-out, background-color 1s ease-in-out;
  }

  .toolbar {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 1.5em;
    border-bottom: 2px solid #ffaa34;
    background-image: linear-gradient(to bottom, transparent, #ffaa3431);
  }
  `
})
export class Toolbar {
  private router: Router = inject(Router)
  overview: Menu = {
    name: 'Overview',
    uri: ''
  }

  menu: Menu[] = [
    {
      name: 'Resource',
      uri: 'resources',
    },
  ]

  naviagteTo(uri: string) {
    this.router.navigate([uri])
  }

}
