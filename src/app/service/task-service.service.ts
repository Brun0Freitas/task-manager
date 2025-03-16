import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { TaskInterface } from '../types/taskInterface';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private tasksSubject = new BehaviorSubject<TaskInterface[]>([])
  public tasks$ = this.tasksSubject.asObservable()
  public allTasksCompleted$ = this.tasks$.pipe(
    map(tasksList => tasksList.every(task => task.isCompleted)))

  private createTask(taskText: string): TaskInterface {
    return {
      id: uuidv4(),
      text: taskText,
      isCompleted: false
    }
  }

  formatTaskName(taskName: string): string | null {
    const formattedTaskName = taskName.trim().replace(/\s+/g, ' ');
    return formattedTaskName ? formattedTaskName : null;
  }

  addTask(taskName: string) {
    const newTask = this.createTask(taskName);
    this.tasksSubject.next(this.tasksSubject.value.concat(newTask));
  }

  toggleTaskStatus(id: string) {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    this.tasksSubject.next(updatedTasks);
  }

  changeTaskName(id: string, newName: string) {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.map(task =>
      task.id === id ? { ...task, text: newName } : task
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