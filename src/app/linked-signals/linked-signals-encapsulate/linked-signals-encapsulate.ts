import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShoeSizesStore } from './shoe-size.store';

@Component({
  selector: 'app-linked-signals-encapsulate',
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
      <select id="shoeSize" name="shoeSize" [ngModel]="currentShoeSize()" (ngModelChange)="updateShoeSize($event)">
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
export class LinkedSignalsEncapsulate {
  currentShoeSize = ShoeSizesStore.currentShoeSizes
  shoeSizes = ShoeSizesStore.shoeSizes

  index = computed(() => this.shoeSizes().indexOf(this.currentShoeSize()))

  constructor() {
    this.updateShoeSize(5)
  }

  updateShoeSize(value: number) {
    ShoeSizesStore.updateShoeSizes(value)
  }

  changeShoeSizes = ShoeSizesStore.changeShoeSizes
  updateLargestSize = ShoeSizesStore.updateLargestSize
}
