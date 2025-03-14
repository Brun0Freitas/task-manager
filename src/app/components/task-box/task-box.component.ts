import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { TaskService } from 'src/app/service/task-service.service';
import { TaskInterface } from 'src/app/types/taskInterface';

@Component({
  selector: 'app-task-box',
  templateUrl: './task-box.component.html',
  styleUrls: ['./task-box.component.css']
})

export class TaskBoxComponent implements OnInit {
  taskList: TaskInterface[] = []

  isEditing: boolean = false
  editingTask: TaskInterface = { id: '', text: '', isCompleted: false }

  @ViewChild('editInput') editInput?: ElementRef

  constructor(private service: TaskService) { }

  ngOnInit(): void {
    this.service.tasks$.subscribe(taskList => {
      this.taskList = taskList
    })
  }

  toggleStatusInService(task: TaskInterface): void {
    this.service.toggleTaskStatus(task.id);
  }

  setTaskInEditMode(task: TaskInterface) {
    this.isEditing = true;
    this.editingTask = task

    setTimeout(() => {
      this.editInput?.nativeElement.focus();
      this.editInput?.nativeElement.select();
    }, 0)
  }

  changeTaskNameInService() {
    const id = this.editingTask.id;
    const oldName = this.editingTask.text;
    const newName = this.editInput?.nativeElement.value;
    const formattedNewName = this.service.formatTaskName(newName);

    if (formattedNewName && formattedNewName !== oldName) {
      this.service.changeTaskName(id, formattedNewName);
    }

    this.isEditing = false
    this.editingTask = { id: '', text: '', isCompleted: false }
  }

  removeTaskFromService(taskId: string) {
    this.service.removeTask(taskId);
  }
}
