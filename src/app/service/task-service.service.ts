import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Task } from '../types/task';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([])
  public tasks$ = this.tasksSubject.asObservable()

  addTask(text: string) {
    const currentTasks = this.tasksSubject.value
    const newTask: Task = {
      id: Math.floor(Math.random() * 100),
      text,
      isCompleted: false
    }
    this.tasksSubject.next([...currentTasks, newTask])
    console.table(this.tasksSubject.value)
  }
}
