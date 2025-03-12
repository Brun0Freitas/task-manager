import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TaskService } from './task-service.service';
import { TaskInterface } from '../types/taskInterface';
import { Serializer } from '@angular/compiler';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // add task
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

  // toggle task status
  it('should toggle the completion status of an existing task', () => {
    const mockTask: TaskInterface = { id: '1', text: 'old name', isCompleted: true };
    service['tasksSubject'].next([mockTask]);

    service.toggleTaskStatus(mockTask.id);
    service.tasks$.subscribe(updatedTasksList => {
      const updatedTask = updatedTasksList.find(task => task.id === mockTask.id);
      expect(updatedTask?.isCompleted).toBe(false);
    });
  });

  it('should NOT alter other tasks when the ID doesnt match', () => {
    const mockTaskList: TaskInterface[] = [
      { id: '1', text: 'old name', isCompleted: false },
      { id: '2', text: 'other name', isCompleted: false },
      { id: '3', text: 'other name', isCompleted: false },
    ];
    service['tasksSubject'].next(mockTaskList);

    service.toggleTaskStatus(mockTaskList[1].id);
    service.tasks$.subscribe(updatedTasks => {
      expect(updatedTasks[0].isCompleted).toBe(false);
      expect(updatedTasks[1].isCompleted).toBe(true);
      expect(updatedTasks[2].isCompleted).toBe(false);
    });
  });

  // change task name
  it('should update task name when an existing task is modified', () => {
    const mockTask: TaskInterface = { id: '1', text: 'old name', isCompleted: true };
    service['tasksSubject'].next([mockTask]);

    service.changeTaskName(mockTask.id, 'new name');
    service.tasks$.subscribe(updatedTasksList =>
      expect(updatedTasksList[0].text).toBe('new name')
    );
  })

  it('should NOT alter any task when the provided task ID does not exist', () => {
    const mockTask: TaskInterface = { id: '1', text: 'old name', isCompleted: true };
    service['tasksSubject'].next([mockTask]);

    service.changeTaskName('nonExistentId', 'new name');
    service.tasks$.subscribe(updatedTasksList => {
      expect(updatedTasksList[0].text).toBe(updatedTasksList[0].text);
      expect(updatedTasksList.length).toBe(1);
    });
  })

  // remove task
  it('should remove task when a valid task ID is provided', (done) => {
    const mockTaskList: TaskInterface[] = [
      { id: '1', text: 'old name', isCompleted: false },
      { id: '2', text: 'other name', isCompleted: false },
      { id: '3', text: 'other name', isCompleted: false },
    ];
    service['tasksSubject'].next(mockTaskList);

    service.removeTask('3');
    service.tasks$.subscribe(updatedTasksList => {
      expect(updatedTasksList.length).toBe(2);
      const removedTask = updatedTasksList.find(task => task.id === '3');
      expect(removedTask).toBeUndefined();
      done();
    })
  })
});