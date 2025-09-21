import { CommonModule, JsonPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './auth-service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-signal-forms',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="container">
      <form 
        [formGroup]="form"
        (ngSubmit)="onSubmit()"
      >
        <h2>Login</h2>

        <div class="form-inputs">
          <input type="email" formControlName="email" placeholder="Email">
          @if (form.get('email')?.invalid) {
            <div class="invalid-feedback">Please enter a valid email.</div>
          }
        </div>

        <div class="form-inputs">
          <input type="password" formControlName="password" placeholder="Password">
          @if (form.get("password")?.invalid) {
            <div class="invalid-feedback">Password must be at least 6 characters long.</div>
          }
        </div>

        @if (errorMessage()) {
          <div class="message-error"> {{ errorMessage() }} </div>
        } @else if (isLoggedIn()) {
          <div class="message-success">Logged in successfully.</div>
        }

        <button type="submit" [disabled]="isLoading() || !isFormValid">
          @if (isLoading()) {
            Loading
          }
          Login
        </button>
      </form>
    </div>
  `,
  styles: `
    .container {
      width: 600px;
      margin: 3em auto;
    }

    button {
      padding: 1.3em 1.5em;
      background-color: transparent;
      margin: 10px;
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

    .form-inputs {
        margin-bottom: 1.7em;
      }

    .message-error {
        color: #ff1212a1;
      }
    .message-success {
      color: #12ff12a1;
    }
  `
})
export class SignalForms {
  private readonly authService = inject(AuthService)
  private readonly fb = inject(FormBuilder)  
  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  readonly isLoading = signal(false)
  readonly errorMessage = signal<string | null>(null)

  readonly formValue = toSignal(this.form.valueChanges, {
    initialValue: this.form.value,
  })

  readonly formStatus = toSignal(this.form.statusChanges, {
    initialValue: this.form.status,
  })

  readonly isFormValid = computed(() => this.formStatus() === 'VALID')

  readonly isLoggedIn = signal(false)

  onSubmit() {
    if (!this.isFormValid()) return

    const {email, password} = this.form.getRawValue()
    if (!email || !password) return

    this.isLoading.set(true)
    this.errorMessage.set(null)

    this.authService
      .login({email, password})
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.isLoading.set(false)
          this.isLoggedIn.set(true)
        },
        error: (err) => {
          this.isLoading.set(false)
          const message = err?.error?.message || 'Login failed. Please try again.'
          this.errorMessage.set(message)
        }
      })
  }
}
