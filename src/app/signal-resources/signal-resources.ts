import { CommonModule } from '@angular/common';
import { Component, computed, inject, resource } from '@angular/core';
import { Resources } from './resources';
import { ToDo } from './todo.model';

@Component({
  selector: 'app-signal-resources',
  imports: [
    CommonModule,
  ],
  template: `
    <div class="grid">
      @for (todo of todos(); track todo.id) {
      <div class="todo todo-{{todo.completed}}">
        <span>{{ todo.title }}</span>
      </div>
    }
    </div>
  `,
  styles: `
    .grid {
      margin: 1em;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1em; 
    }

    .todo {
      padding: 20px;
      &.todo-false {
        background-image: linear-gradient(140deg, rgba(230, 30, 30, 0.8) 0%, rgba(230, 30, 30, 0.4) 20%, transparent 100%);
      }
      &.todo-true {
        background-image: linear-gradient(220deg, rgba(30, 230, 30, 0.8) 0%, rgba(30, 230, 30, 0.4) 20%, transparent 100%);
      }
    }
  `
})
export class SignalResources {
  private resourcesService = inject(Resources);

  public todoResources = resource({
    loader: () => {
      return fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=10'
      ).then((response) => response.json() as Promise<ToDo[]>);
    }
  });

  public todos = computed(() => this.todoResources.value() || []);
}
