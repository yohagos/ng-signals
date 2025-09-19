import { CommonModule } from '@angular/common';
import { Component, computed, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

const LAST_PAGE = 200;

@Component({
  selector: 'app-linked-signals-pagination',
  imports: [
    CommonModule,
    FormsModule,
  ],
  template: `
    <div class="container">
      <h2>Update the shorthand version of the linked signal</h2>
    <div>
      <button (click)="pageNumber.set(1)">First</button>
      <button (click)="changePageNumber(-1)">Prev</button>
      <button (click)="changePageNumber(1)">Next</button>
      <button (click)="pageNumber.set(lastPage)">Last</button>
      <p>Go to: <input type="number" [(ngModel)]="pageNumber" /></p>
    </div>
    <p>Page Number: {{ pageNumber() }}</p>
    <p>Current Page Number: {{ currentPageNumber() }}</p>
    <p>Percentage of completion: {{ precentageOfCompletion() }}</p>
    </div> 
  `,
  styles: `
    .container {
      width: 650px;
      margin: 2em auto;
      padding: 1em;
      align-items: center;
    }

    button {
      margin: auto 0.4em;
      padding: 1em 3em;
      border: 2px solid #e5a323a1;
      color: #eeeeeea9;
      background-color: transparent;
    }

    input {
      background-color: transparent;
      height: 1.5em;
      color: #eeeeeea9;
      font-size: 1.3em;
    }

    button:hover {
      background-color: #e5a323a1;

      transition: background-color 1.5s ease;
    }

    p {
      font-size: 1.2em;
    }
  `
})
export class LinkedSignalsPagination {
lastPage = LAST_PAGE
  pageNumber = signal(1)

  currentPageNumber = linkedSignal<number, number>({
    source: this.pageNumber,
    computation: (pageNumber, previous) => {
      if (!previous) {
        return pageNumber
      }
      return (pageNumber < 1 || pageNumber > LAST_PAGE) ? previous.value : pageNumber
    }
  })

  precentageOfCompletion = computed(() => `${((this.currentPageNumber() * 1.0) * 100 / LAST_PAGE).toFixed(2)}%`)

  changePageNumber(offset: number) {
    this.pageNumber.update((val) => Math.max(1, Math.min(LAST_PAGE, val + offset)))
  }
}
