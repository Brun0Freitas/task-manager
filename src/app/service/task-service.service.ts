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

  formatTaskName(taskName: string): string {
    return taskName.trim().replace(/\s+/g, ' ')
  }

  addTask(taskName: string) {
    const newTask = this.createTask(taskName)
    this.tasksSubject.next(this.tasksSubject.value.concat(newTask))
  }

  toggleTaskStatus(id: string) {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    this.tasksSubject.next(updatedTasks);
  }

  changeTaskName(id: string, newName: string) {
    const formattedTaskName = this.formatTaskName(newName);
    const currentTasks = this.tasksSubject.getValue();

    const updatedTasks = currentTasks.map(task =>
      task.id === id ? { ...task, text: formattedTaskName } : task
    );
    this.tasksSubject.next(updatedTasks);
  }

  removeTask(taskID: string) {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.filter(task =>
      task.id !== taskID);
    this.tasksSubject.next(updatedTasks);
  }
}