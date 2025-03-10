import { TestBed } from '@angular/core/testing';

import { TaskService } from './task-service.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new task to the tasks list', () => {
    service.addTask('new task');
    service.tasks$.subscribe((tasksList) => {
      expect(tasksList.length).toBe(1)
      expect(tasksList[0].text).toBe('new task')
    })
  });

  it('should assing a unique ID to each new task', () => {
    const newTask1 = 'first task'
    const newTask2 = 'second task'
    service.addTask(newTask1)
    service.addTask(newTask2)

    service.tasks$.subscribe((taskList) => {
      const firsTaskId = taskList[0].id
      const secondTaskId = taskList[1].id

      expect(firsTaskId).not.toBe(secondTaskId)
    })
  })

  it('should create a task with the correct structure', () => {
    const newTask = ' new task '
    const task = service['createTask'](newTask)

    expect(typeof task.id).toBe('string')
    expect(task.text).toBe(newTask)
    expect(task.isCompleted).toBe(false)
  })
});
