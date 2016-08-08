import { Component, EventEmitter } from 'angular2/core';
import { TaskListComponent } from './task-list.component';
import { Task } from './task.model';

@Component({
  selector: 'my-app',
  directives: [TaskListComponent],
  template: `
    <div class="container">
      <h1>To-Do List</h1>
      <task-list
        [taskList]="tasks"
        (onTaskSelect)="taskWasSelected($event)">
      </task-list>
    </div>
  `
})
export class AppComponent {
  public tasks: Task[];
  constructor(){
    this.tasks = [
      new Task("Create To-Do List app.", 0),
      new Task("Learn Kung Fu to .", 1),
      new Task("Rewatch LOTR movies.", 2),
      new Task("Make Cameron Do the laundry.", 3)
    ];
  }
  taskWasSelected(clickedTask: Task): void {
    console.log(clickedTask, "parent");
  }
}
