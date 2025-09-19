import { Component, computed, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-linked-signals-countries',
  imports: [
    FormsModule,
  ],
  template: `
    <div class="linked-signals-countries-container">
      <h2>Update the shorthand version of the linked signal. Set and update the signal</h2>
    <p>Update country: <input [(ngModel)]="country" /></p>
    <p>Update favorite country: <input [(ngModel)]="favoriteCountry" /></p>
    <button (click)="country.set('United States of America')">Reset</button>
    <button (click)="changeCountry()">Update source and linked signal</button>
    <p>Country: {{ country() }}</p>
    <p>Favorite Country: {{ favoriteCountry() }}</p>
    <p>Reversed Country: {{ reversedFavoriteCountry() }}</p>
    </div>
  `,
  styles: `
    .linked-signals-countries-container {
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
export class LinkedSignalsCountries {
  country = signal('USA')
  favoriteCountry = linkedSignal(() => this.country())

  reversedFavoriteCountry = computed(() => this.favoriteCountry().split("").reverse().join())

  changeCountry() {
    this.country.set("Canada")
    this.favoriteCountry.update((c) => c.toUpperCase())
  }
}
