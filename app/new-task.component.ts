import { Component, EventEmitter } from 'angular2/core';
import { Task } from './task.model';

@Component({
  selector: 'new-task',
  outputs: ['onSubmitNewTask', 'onSubmitNewPriority'],
  template: `
  <div class="task-form">
    <h3>Create Task (Priority | Description):</h3>
    <select #newPriority>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <input placeholder="Description" class="col-sm-8 input-lg" #newDescription>
    <button (click)="addTask(newDescription, newPriority)" class="btn-success btn-lg add-button">Add</button>
  </div>
  `
})

export class NewTaskComponent {
  public onSubmitNewTask: EventEmitter<String>;
  public onSubmitNewPriority: EventEmitter<String>;
  constructor(){
    this.onSubmitNewTask = new EventEmitter();
    this.onSubmitNewPriority = new EventEmitter();
  }
  addTask(userDescription: HTMLInputElement, userPriority: HTMLSelectElement){
    this.onSubmitNewTask.emit(userDescription.value);
    this.onSubmitNewPriority.emit(userPriority.value);
    userDescription.value = "";
    userPriority.value = "low";
  }
}
