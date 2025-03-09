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

  addTaskToService(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value

    if (this.inputValue.trim() !== '') {
      this.service.addTask(this.inputValue)
      this.inputValue = ''
    }
  }
}
