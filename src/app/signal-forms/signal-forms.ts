import { CommonModule, JsonPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signal-forms',
  imports: [
    CommonModule,
    FormsModule,
    JsonPipe,
  ],
  template: `
    <div class="container">
      <form class="form">
        <label for="firstName"> Firstname </label>
          <input type="text" id="firstName" name="firstName" [(ngModel)]="firstName" required>
        
        <label for="lastName"> Lastname </label>
          <input type="text" id="lastName" name="lastName" [(ngModel)]="lastName" required>
        
        <label for="email"> Email </label>
          <input type="text" id="email" name="email" [(ngModel)]="email" required email>
        

        <div id="phone">
          <label for="phone"> Phone </label>
            @for (p of phone(); track i; let i = $index) {
              <div>
                <input for="phone" name="phone-{{ i }}" [(ngModel)]="phone" required>
                <button type="button" (click)="removePhoneNumber(i)">Remove</button>
              </div>
            }
            <button type="button" (click)="addPhoneNumber()">Add Phonenumber</button>
          
        </div>

        <label for="street">Street</label> 
        <input type="text" id="street" name="street" [(ngModel)]="street" required>

        @if (!formValid()) {
          <div class="message message-error">Form is invalid!</div>
        } @else {
          <div class="message message-success">Form is valid!</div>
        }
        <pre>
          {{formValue() | json}}
        </pre>
      </form>
    </div>
  `,
  styles: `
    .container {
      width: 600px;
      margin: 3em auto;
    }

    .form {
      display: flex;
      flex-direction: column;
      margin: auto;

      & input {
        margin-bottom: 1em;
        background-color: transparent;
        height: 1.7em;
      }
    }

    .message {
      display: flex;
      justify-content: center;

      &.message-error {
        color: red;
      }
      &.message-success {
        color: green;
      }
    }
  
  `
})
export class SignalForms {
  public firstName = signal("")
  public lastName = signal("")
  public email = signal("")

  public phone = signal([signal("")])
  public street = signal("")

  public formValue = computed(() => {
    return {
      firstName: this.firstName(),
      lastName: this.lastName(),
      email: this.email(),
      phone: this.phone().map((num) => num()),
      address: {
        street: this.street(),
      },
    }
  })

  public formValid = computed(() => {
    const { firstName, lastName, email, phone, address } = this.formValue()

    const EMAIL_REGEX = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    const isEmailFormatValid = EMAIL_REGEX.test(email)

    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      email.length > 0 &&
      isEmailFormatValid &&
      phone.length > 0 &&
      phone.every((num) => num.length > 0) &&
      address.street.length > 0
    )
  })

  addPhoneNumber() {
    this.phone.update((num) => {
      num.push(signal(""))
      return [...num]
    })
  }

  removePhoneNumber(index: number) {
    this.phone.update((num) => {
      num.splice(index, 1)
      return [...num]
    })
  }
}
