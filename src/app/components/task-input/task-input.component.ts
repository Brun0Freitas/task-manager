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
    const taskText = this.inputValue.trim()
    if (taskText !== '') {
      this.service.addTask(taskText)
      this.inputValue = ''
    }
  }
}
