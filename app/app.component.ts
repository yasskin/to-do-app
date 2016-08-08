import { Component } from 'angular2/core';

@Component({
  selector: 'my-app',
  template: `
    <div class="container">
      <h1>To-Do List</h1>
      <h3 *ngFor="#task of tasks" (click)="taskWasSelected(task)">
        {{ task.description }}
      </h3>
    </div>
  `
})
export class AppComponent {
  public tasks: Task[];
  constructor(){
    this.tasks = [
      new Task("Create To-Do List app.", 0),
      new Task("Learn Kung Fu.", 1),
      new Task("Rewatch LOTR movies.", 2),
      new Task("Make Cameron Do the laundry.", 3)
    ];
  }
  taskWasSelected(clickedTask: Task): void {
    console.log(clickedTask.description);
  }
}

export class Task {
  public done: boolean = false;
  constructor(public description: string, public id: number) {

  }
}
