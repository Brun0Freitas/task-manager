import { Component, OnInit } from '@angular/core';

import { TaskService } from 'src/app/service/task-service.service';
import { IFilter } from 'src/app/types/filterInterface';
import { TaskInterface } from 'src/app/types/taskInterface';

@Component({
  selector: 'app-task-toolbar',
  templateUrl: './task-toolbar.component.html',
  styleUrls: ['./task-toolbar.component.css']
})
export class TaskToolbarComponent implements OnInit {
  tasks: TaskInterface[] = []
  allTasksCompleted: boolean = false
  currentFilterType: IFilter = { type: 'all' }

  constructor(private service: TaskService) { }

  ngOnInit(): void {
    this.service.tasks$.subscribe(tasksList => this.tasks = tasksList)
    this.service.allTasksCompleted$.subscribe(status => this.allTasksCompleted = status)
  }

  toggleAllTasks() {
    const newStatus = !this.allTasksCompleted
    this.tasks.forEach(task => {
      if (task.isCompleted !== newStatus) {
        this.service.toggleTaskStatus(task.id)
      }
    })
  }

  setFilterinService(filter: IFilter) {
    this.service.setFilter(filter)
    this.currentFilterType = filter
  }
}
