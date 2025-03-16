import { Component } from '@angular/core';

import { TaskService } from 'src/app/service/task-service.service';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.css']
})

export class TaskInputComponent {
  inputValue: string = ''

  constructor(private service: TaskService) { }

  addTaskToService() {
    const taskName = this.inputValue;
    const formattedTaskName = this.service.formatTaskName(taskName);
    if (formattedTaskName) {
      this.service.addTask(formattedTaskName)
      this.inputValue = ''
    }
  }
}
