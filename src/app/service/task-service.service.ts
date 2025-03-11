import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { TaskInterface } from '../types/taskInterface';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private tasksSubject = new BehaviorSubject<TaskInterface[]>([])
  public tasks$ = this.tasksSubject.asObservable()

  private createTask(taskText: string): TaskInterface {
    return {
      id: uuidv4(),
      text: taskText,
      isCompleted: false
    }
  }

  addTask(taskText: string) {
    const newTask = this.createTask(taskText)
    this.tasksSubject.next(this.tasksSubject.value.concat(newTask))
  }

  toggleTaskStatus(id: string) {
    const tasks = this.tasksSubject.getValue();
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    this.tasksSubject.next(updatedTasks);
  }

  changeTaskName(id: string, newName: string) {
    const tasks = this.tasksSubject.getValue();
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, text: newName } : task
    );
    this.tasksSubject.next(updatedTasks);
  }
}