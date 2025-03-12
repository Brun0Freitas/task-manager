import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskBoxComponent } from './task-box.component';
import { TaskService } from 'src/app/service/task-service.service';
import { TaskInterface } from 'src/app/types/taskInterface';
import { ElementRef } from '@angular/core';

class MockTaskService {
  toggleTaskStatus = jasmine.createSpy('toggleTaskStatus');
  changeTaskName = jasmine.createSpy('changeTaskName');
  removeTask = jasmine.createSpy('removeTask');
  tasks$ = of([]);
}

describe('TaskBoxComponent', () => {
  let component: TaskBoxComponent;
  let fixture: ComponentFixture<TaskBoxComponent>;
  let mockService: MockTaskService;

  beforeEach(() => {
    mockService = new MockTaskService();

    TestBed.configureTestingModule({
      declarations: [TaskBoxComponent],
      providers: [{ provide: TaskService, useValue: mockService }]
    });
    fixture = TestBed.createComponent(TaskBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the service to toggle the task status with the correct task ID', () => {
    const mockTask: TaskInterface = { id: '1', text: 'task name', isCompleted: false };
    component.toggleStatusInService(mockTask);
    expect(mockService.toggleTaskStatus).toHaveBeenCalledOnceWith(mockTask.id);
  })

  it('should enable edit mode', () => {
    const mockTask: TaskInterface = { id: '1', text: 'task name', isCompleted: false };
    component.setTaskInEditMode(mockTask);
    expect(component.isEditing).toBe(true);
  })

  it('should set editingTask to selected task', () => {
    const mockTask: TaskInterface = { id: '1', text: 'task name', isCompleted: false };
    component.setTaskInEditMode(mockTask);
    expect(component.editingTask).toBe(mockTask);
  })

  it('should focus and select text in the edit input field', fakeAsync(() => {
    const mockTask: TaskInterface = { id: '1', text: 'task name', isCompleted: false };

    component.editInput = {
      nativeElement: {
        focus: jasmine.createSpy(), select: jasmine.createSpy()
      }
    } as ElementRef

    component.setTaskInEditMode(mockTask);
    tick(); //simulate timeout()

    expect(component.editInput.nativeElement.focus).toHaveBeenCalled();
    expect(component.editInput.nativeElement.select).toHaveBeenCalled();
  }))

  it('should call the service when changed task name is valid, set edit mode to false and set editing task to empty', () => {
    const mockTask: TaskInterface = { id: '1', text: 'old name', isCompleted: false };
    component.editingTask = mockTask;
    component.editInput = {
      nativeElement: { value: 'newName' }
    } as ElementRef;

    component.changeTaskNameInService();
    expect(mockService.changeTaskName).toHaveBeenCalledOnceWith('1', 'newName');
    expect(component.isEditing).toBe(false);
    expect(component.editingTask).toEqual({ id: '', text: '', isCompleted: false });
  })

  it('should NOT call the service if the task name is the same, set edit mode to false and set editing task to empty', () => {
    const mockTask: TaskInterface = { id: '1', text: 'old name', isCompleted: false };
    component.editingTask = mockTask;
    component.editInput = {
      nativeElement: { value: 'old name' }
    } as ElementRef;

    component.changeTaskNameInService();
    expect(mockService.changeTaskName).not.toHaveBeenCalled();
    expect(component.isEditing).toBe(false);
    expect(component.editingTask).toEqual({ id: '', text: '', isCompleted: false });
  })

  it('should NOT call the service if the task name is empty, set edit mode to false and set enditing task to empty', () => {
    const mockTask: TaskInterface = { id: '1', text: 'old name', isCompleted: false };
    component.editingTask = mockTask;
    component.editInput = {
      nativeElement: { value: '     ' }
    } as ElementRef;

    component.changeTaskNameInService();
    expect(mockService.changeTaskName).not.toHaveBeenCalled();
    expect(component.isEditing).toBe(false);
    expect(component.editingTask).toEqual({ id: '', text: '', isCompleted: false });
  })

  it('should request task removal in service with correct task id', () => {
    const mockTaskID = '1';
    component.removeTaskFromService(mockTaskID);
    expect(mockService.removeTask).toHaveBeenCalledWith(mockTaskID)
  })

});
