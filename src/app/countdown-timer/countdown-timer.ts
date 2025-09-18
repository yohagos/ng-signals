import { CommonModule } from '@angular/common';
import { Component, computed, effect, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  imports: [
    CommonModule,

  ],
  template: `
    <div class="container">
      <div class="time-display"> {{ formattedTime() }} </div>

      <div class="progress-container">
        <div class="progress-bar" [style.width.%]="progressPercentage()"></div>
      </div>

      <div class="controls">
        <button (click)="running() ? stop() : start()" [disabled]="isCompleted()">
          {{ buttonText() }}
        </button>

        <button (click)="reset()"> Reset </button>
      </div>

      <div class="presets">
        <button (click)="setTime(30)" [disabled]="running()"> 30s </button>
        <button (click)="setTime(60)" [disabled]="running()"> 1min </button>
        <button (click)="setTime(300)" [disabled]="running()"> 5min </button>
        <button (click)="setTime(600)" [disabled]="running()"> 10min </button>
      </div>
    </div>
  `,
  styles: `
    .container {
      max-width: 600px;
      margin: 5em auto;
      padding: 2em;
      text-align: center;

      border: 2px solid #eeeeee53;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(210,210,210, 0.3);
    }

    .time-display {
      font-size: 4rem;
      font-weight: bold;
      color: #eeeeeeaf;
      margin-bottom: 1.5rem;
    }

    .progress-container {
      width: 100%;
      height: 8px;
      background-color: #1c1c1c5f;
      border-radius: 4px;
      margin-bottom: 2rem;
      overflow: hidden;
    }

    .progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #28a745, #ffc107, #dc3545);
      transition: width 0.3s ease;
    }

    .controls, 
    .presets {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 1rem;
    }

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      background: #1c1c1c5f;
      font-weight: 500;
      transition: background-color 0.2s;
    }

    button:hover:not(:disabled) {
      background: #55edaaa1 ; 
    }

    button:disabled {
      background: #aaa;
      cursor: not-allowed;
    }

    h1 {
      margin-bottom: 2em;
    }
  `
})
export class CountdownTimer implements OnDestroy {
  private timeRemaining = signal(60)
  private isRunning = signal(false)
  private initialTime = signal(60)

  readonly timeLeft = this.timeRemaining.asReadonly()
  readonly running = this.isRunning.asReadonly()

  private intervalId: number | null = null

  constructor() {
    console.log("Timer initialized with : ", this.timeLeft)

    effect(() => {
      console.log(
        `Timer state : ${this.formattedTime()}, \nRunning: ${this.running()}`
      )
    })

    effect(() => {
      if (this.isCompleted()) {
        this.onTimerCompleted()
      }
    })
  }

  ngOnDestroy(): void {
    this.stop()
  }

  private onTimerCompleted() {
    console.log("Timer has completed - handle completion here.")
  }

  start() {
    if(this.isRunning()) return

    this.isRunning.set(true)
    this.intervalId = window.setInterval(() => {
      this.timeRemaining.update((time) => {
        if (time <= 1) {
          this.stop()
          return 0
        }
        return time - 1
      })
    }, 1000)
  }

  stop() {
    this.isRunning.set(false)
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  reset() {
    this.stop()
    this.timeRemaining.set(this.initialTime())
  }

  setTime(seconds: number) {
    this.stop()
    this.initialTime.set(seconds)
    this.timeRemaining.set(seconds)
  }

  readonly formattedTime = computed(() => {
    const time = this.timeLeft()
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  })

  readonly progressPercentage = computed(() => {
    const initial = this.initialTime()
    const remaining = this.timeLeft()
    if (initial === 0) return 0
    return ((initial - remaining) / initial) * 100
  })

  readonly isCompleted = computed(() => this.timeLeft() === 0)
  readonly buttonText = computed(() => (this.running() ? "Pause" : "Start"))
}
