import { Component, computed, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

const SHOE_SIZES = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];
const SHOE_SIZES2 = [4, 5, 6, 7, 8, 9, 10, 11, 12]

@Component({
  selector: 'app-linked-signals-reset',
  imports: [
    FormsModule,
  ],
  template: `
    <div class="container">
      <h2>Reset linked signal after updating source</h2>
<p>Source: {{ shoeSizes() }}</p>
<p>Shoe size: {{ currentShoeSize() }}</p>
<p>Shoe index: {{ index() }}</p>
<div>
      <button (click)="changeShoeSizes()">Update shoe size source</button>
      <button (click)="updateLargestSize()">Set to the largest size</button>
 </div>
 <div class="select">
  <label for="shoeSize">
      <span>Choose a shoe size: </span>
      <select id="shoeSize" name="shoeSize" [(ngModel)]="currentShoeSize">
        @for (size of shoeSizes(); track size) {
          <option [ngValue]="size">{{ size }}</option>
        }
      </select>
</label>
 </div>
    </div>
  `,
  styles: `
    .container {
      width: 650px;
      margin: 2em auto;
      padding: 1em;
      align-items: center;
    }

    .select {
      margin: 1em auto;
      & select {
        height: 1.5em;
        font-size: 16px;
        background-color: transparent;
        color: #eeeeeea9;

        & option {
          background-color: #1c1c1ce1 !important;
          color: #eeeeeea9;
        }
      }
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
export class LinkedSignalsReset {
  shoeSizes = signal(SHOE_SIZES)
  currentShoeSize = linkedSignal<number[], number>({
    source: this.shoeSizes,
    computation: (options, previous) => {
      if (!previous) {
        return options[0]
      }
      return options.includes(previous.value) ? previous.value : options[0]
    }
  })

  index = computed(() => this.shoeSizes().indexOf(this.currentShoeSize()))

  changeShoeSizes() {
    if (this.shoeSizes()[0] === SHOE_SIZES[0]) {
      this.shoeSizes.set(SHOE_SIZES)
    } else {
      this.shoeSizes.set(SHOE_SIZES2)
    }
  }

  updateLargestSize() {
    const largestSize = this.shoeSizes().at(-1)
    if (typeof largestSize !== 'undefined') {
      this.currentShoeSize.set(largestSize)
    }
  }
}
