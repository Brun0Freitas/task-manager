import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskToolbarComponent } from './task-toolbar.component';
import { TaskService } from 'src/app/service/task-service.service';
import { BehaviorSubject, map } from 'rxjs';
import { TaskInterface } from 'src/app/types/taskInterface';

class MockTaskService {
  toggleTaskStatus = jasmine.createSpy('toggleTaskStatus');
  tasksSubject = new BehaviorSubject<TaskInterface[]>([]); // BehaviorSubject for dynamic control
  tasks$ = this.tasksSubject.asObservable();
  allTasksCompleted$ = this.tasks$.pipe(map(tasksList => tasksList.every(task => task.isCompleted)))
}

describe('TaskToolbarComponent', () => {
  let component: TaskToolbarComponent;
  let fixture: ComponentFixture<TaskToolbarComponent>;
  let service: MockTaskService;

  beforeEach(() => {
    service = new MockTaskService();

    TestBed.configureTestingModule({
      declarations: [TaskToolbarComponent],
      providers: [{ provide: TaskService, useValue: service }]
    });
    fixture = TestBed.createComponent(TaskToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the service only for incompleted tasks if newStatus = true', () => {
    component.allTasksCompleted = false; // newStatus = true
    component.tasks = [
      { id: '1', text: 'first task', isCompleted: true },
      { id: '2', text: 'second task', isCompleted: false },
      { id: '3', text: 'third task', isCompleted: false },
    ]
    component.toggleAllTasks();
    expect(service.toggleTaskStatus).toHaveBeenCalledWith('2');
    expect(service.toggleTaskStatus).toHaveBeenCalledWith('3');
    expect(service.toggleTaskStatus).toHaveBeenCalledTimes(2);
  })

  it('should call the service only for completed tasks if newStatus = false', () => {
    component.allTasksCompleted = true; // newStatus = false
    component.tasks = [
      { id: '1', text: 'first task', isCompleted: true },
      { id: '2', text: 'second task', isCompleted: false },
      { id: '3', text: 'third task', isCompleted: false },
    ]
    component.toggleAllTasks();
    expect(service.toggleTaskStatus).toHaveBeenCalledWith('1');
    expect(service.toggleTaskStatus).toHaveBeenCalledTimes(1);
  })

  it('should NOT call the service if the tasks status is the same as newStatus', () => {
    component.allTasksCompleted = false; // newStatus = true
    component.tasks = [
      { id: '1', text: 'first task', isCompleted: true },
      { id: '2', text: 'second task', isCompleted: true },
      { id: '3', text: 'third task', isCompleted: true },
    ]
    component.toggleAllTasks();
    expect(service.toggleTaskStatus).not.toHaveBeenCalled();
  })
});
