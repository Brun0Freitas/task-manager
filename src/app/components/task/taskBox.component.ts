import { Component, Input, OnInit } from '@angular/core';

import { TaskService } from 'src/app/service/task-service.service';
import { TaskInterface } from 'src/app/types/taskInterface';

@Component({
  selector: 'app-task-box',
  templateUrl: './taskBox.component.html',
  styleUrls: ['./taskBox.component.css']
})

export class TaskBoxComponent implements OnInit {
  tasks: TaskInterface[] = []

  constructor(private service: TaskService) { }

  ngOnInit(): void {
    this.service.tasks$.subscribe(taskList => {
      this.tasks = taskList
    })
  }

  toggleCompletion(task: TaskInterface): void {
    this.service.toggleTask(task.id);
  }
}
