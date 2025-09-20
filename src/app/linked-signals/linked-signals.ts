import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LinkedSignalsPagination } from "./linked-signals-pagination/linked-signals-pagination";
import { LinkedSignalsCountries } from "./linked-signals-countries/linked-signals-countries";
import { LinkedSignalsReset } from "./linked-signals-reset/linked-signals-reset";

import { LinkedSignalsEncapsulate } from "./linked-signals-encapsulate/linked-signals-encapsulate";


@Component({
  selector: 'app-linked-signals',
  imports: [
    CommonModule,
    FormsModule,
    LinkedSignalsPagination,
    LinkedSignalsCountries,
    LinkedSignalsReset,
    LinkedSignalsEncapsulate.
],
  template: `
    <h2>Linked Signals -> Pagination</h2>
    <app-linked-signals-pagination></app-linked-signals-pagination>
    <div class="separation">
      <hr>
    </div>
    <h2>Linked Signals -> Countries</h2>
    <app-linked-signals-countries></app-linked-signals-countries>
    <div class="separation">
      <hr>
    </div>
    <h2>Linked Signals -> Show Sizes Reset / Retain </h2>
    <app-linked-signals-reset></app-linked-signals-reset>
    <div class="separation">
      <hr>
    </div>
    <h2>Linked Signals -> Show Sizes Encapsulate in a store </h2>
    <app-linked-signals-encapsulate></app-linked-signals-encapsulate>
  `,
  styles: `
    .separation {
      margin: 3em auto;
      padding: 2em;
    }

    h2 {
      margin: 0.5em auto;
      display: flex;
      justify-content: center;
    }

    hr {
      width: 70%;
      margin: auto;
    }
  `
})
export class LinkedSignals {
  
}
