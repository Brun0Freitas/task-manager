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

  //all task completed observable
  it('should return true when all tasks are completed', () => {
    const mockTasks: TaskInterface[] = [
      { id: '1', text: 'Task 1', isCompleted: true },
      { id: '2', text: 'Task 2', isCompleted: true },
    ];
    service['tasksSubject'].next(mockTasks);
    service.allTasksCompleted$.subscribe(result => {
      expect(result).toBe(true);
    })
  })

  it('should return false when at least one task is not completed', () => {
    const mockTasks: TaskInterface[] = [
      { id: '1', text: 'Task 1', isCompleted: true },
      { id: '2', text: 'Task 2', isCompleted: false },
    ];
    service['tasksSubject'].next(mockTasks);
    service.allTasksCompleted$.subscribe(result => {
      expect(result).toBe(false);
    })
  })

  it('should return true when there are no tasks', () => {
    const mockTasks: TaskInterface[] = [];
    service['tasksSubject'].next(mockTasks);
    service.allTasksCompleted$.subscribe(result => {
      expect(result).toBe(true);
    })
  })

  // format task name
  it('should remove spaces at beginning and end of the string', () => {
    const mockTaskName = '   new name    ';
    const result = service.formatTaskName(mockTaskName);
    expect(result).toBe('new name');
  })

  it('should replace multiple spaces between words with a single space', () => {
    const mockTaskName = 'Task    with        multiple spaces';
    const result = service.formatTaskName(mockTaskName);
    expect(result).toBe('Task with multiple spaces');
  })

  it('should return the same string if already formatted correctly', () => {
    const mockTaskName = 'correct name';
    const result = service.formatTaskName(mockTaskName);
    expect(result).toBe(mockTaskName);
  })

  it('should return null when given an empty string', () => {
    const mockTaskName = '  ';
    const result = service.formatTaskName(mockTaskName);
    expect(result).toBeNull();
  })


  // add task
  it('should add a new task to the tasks list', () => {
    service.addTask('new task');
    service.tasks$.subscribe((tasksList) => {
      expect(tasksList.length).toBe(1)
      expect(tasksList[0].text).toBe('new task')
    })
  });

  it('should assing a unique ID to each new task', () => {
    const mockTask1 = 'first task'
    const mockTask2 = 'second task'
    service.addTask(mockTask1)
    service.addTask(mockTask2)

    service.tasks$.subscribe((taskList) => {
      const firsTaskId = taskList[0].id
      const secondTaskId = taskList[1].id

      expect(firsTaskId).not.toBe(secondTaskId)
    })
  })

  it('should create a task with the correct structure', () => {
    const mockTask = ' new task '
    const task = service['createTask'](mockTask)

    expect(typeof task.id).toBe('string')
    expect(task.text).toBe(mockTask)
    expect(task.isCompleted).toBe(false)
  })

  it('should keep existing tasks when adding a new one', () => {
    service.addTask('First task');
    service.addTask('Second task');

    service.tasks$.subscribe(updatedTaskList => {
      expect(updatedTaskList.length).toBe(2);
      expect(updatedTaskList.map(task => task.text)).toEqual(['First task', 'Second task']);
    })
  })

  // toggle task status
  it('should toggle the completion status from false to true', () => {
    const mockTask: TaskInterface = { id: '1', text: 'old name', isCompleted: false };
    service['tasksSubject'].next([mockTask]);

    service.toggleTaskStatus(mockTask.id);
    service.tasks$.subscribe(updatedTasksList => {
      const updatedTask = updatedTasksList.find(task => task.id === mockTask.id);
      expect(updatedTask?.isCompleted).toBe(true);
    });
  });

  it('should toggle the completion status from true to false', () => {
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
      { id: '1', text: 'first task', isCompleted: false },
      { id: '2', text: 'second task', isCompleted: false },
      { id: '3', text: 'third task', isCompleted: false },
    ];
    service['tasksSubject'].next(mockTaskList);

    service.toggleTaskStatus('2');
    service.tasks$.subscribe(updatedTasks => {
      expect(updatedTasks[0].isCompleted).toBe(false);
      expect(updatedTasks[1].isCompleted).toBe(true);
      expect(updatedTasks[2].isCompleted).toBe(false);
    });
  });

  it('should do nothing if the task ID does not exist', () => {
    const mockTask: TaskInterface = { id: '1', text: 'old name', isCompleted: false };
    service['tasksSubject'].next([mockTask]);

    service.toggleTaskStatus('999');
    service.tasks$.subscribe(updatedTasks => {
      expect(updatedTasks[0].isCompleted).toBe(false);
    })
  })

  // change task name
  it('should update task name when an existing task is modified', () => {
    const mockTask: TaskInterface = { id: '1', text: 'old name', isCompleted: true };
    service['tasksSubject'].next([mockTask]);

    service.changeTaskName(mockTask.id, 'new name');
    service.tasks$.subscribe(updatedTasksList =>
      expect(updatedTasksList[0].text).toBe('new name')
    );
  })

  it('should not change other tasks', () => {
    const mockTaskList: TaskInterface[] = [
      { id: '1', text: 'first task', isCompleted: false },
      { id: '2', text: 'second task', isCompleted: false },
      { id: '3', text: 'third task', isCompleted: false },
    ];
    service['tasksSubject'].next(mockTaskList);

    service.changeTaskName('3', 'new name');
    service.tasks$.subscribe(updatedTasks => {
      expect(updatedTasks[0].text).toBe(mockTaskList[0].text);
      expect(updatedTasks[1].text).toBe(mockTaskList[1].text);
      expect(updatedTasks[2].text).toBe('new name');
    })
  })

  it('should keep the same ID and status when changin the name', () => {
    const mockTask: TaskInterface = { id: '1', text: 'old name', isCompleted: false };
    service['tasksSubject'].next([mockTask]);

    service.changeTaskName('1', 'new name');
    service.tasks$.subscribe(updatedTasks => {
      expect(updatedTasks[0].text).toBe('new name');
      expect(updatedTasks[0].id).toBe('1');
      expect(updatedTasks[0].isCompleted).toBe(false);
    })
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
  it('should remove a specific task when a valid task ID is provided', (done) => {
    const mockTaskList: TaskInterface[] = [
      { id: '1', text: 'first task', isCompleted: false },
      { id: '2', text: 'second task', isCompleted: false },
      { id: '3', text: 'third task', isCompleted: false },
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

  it('should NOT remove other tasks', () => {
    const mockTaskList: TaskInterface[] = [
      { id: '1', text: 'first task', isCompleted: false },
      { id: '2', text: 'second task', isCompleted: false },
    ];
    service['tasksSubject'].next(mockTaskList);

    service.removeTask('1');
    service.tasks$.subscribe(updatedTasks => {
      expect(updatedTasks.length).toBe(1);
      expect(updatedTasks.some(task => task.id === '2')).toBeTrue();
    })
  })

  it('should do nothing if the task ID does not exist', () => {
    const mockTaskList: TaskInterface[] = [
      { id: '1', text: 'first task', isCompleted: false },
      { id: '2', text: 'second task', isCompleted: false },
    ];
    service['tasksSubject'].next(mockTaskList);

    service.removeTask('999');
    service.tasks$.subscribe(updatedTasks => {
      expect(updatedTasks.length).toBe(2);
    })
  })

  it('should remove the only task in the list', () => {
    const mockTaskList: TaskInterface[] = [
      { id: '1', text: 'first task', isCompleted: false },
    ];
    service['tasksSubject'].next(mockTaskList);

    service.removeTask('1');
    service.tasks$.subscribe(updatedTasks => {
      expect(updatedTasks.length).toBe(0);
    })
  })
});