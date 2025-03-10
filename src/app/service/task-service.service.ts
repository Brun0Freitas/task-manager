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

  addTask(taskText: string) {
    const newTask = this.createTask(taskText)
    this.tasksSubject.next(this.tasksSubject.value.concat(newTask))
  }

  private createTask(taskText: string): TaskInterface {
    return {
      id: uuidv4(),
      text: taskText,
      isCompleted: false
    }
  }

  toggleTask(id: string) {
    // const updatedTasks = this.tasksSubject.value.map(task => {
    //   console.log(task)
    //   if (task.id === id) {
    //     return { ...task, isCompleted: !task.isCompleted }
    //   }
    //   return task
    // })
    // this.tasksSubject.next(updatedTasks)
  }


}