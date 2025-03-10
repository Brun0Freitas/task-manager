import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TaskInputComponent } from './task-input.component';
import { TaskService } from 'src/app/service/task-service.service';

class MockTaskService {
  addTask(taskText: string): void { }
}

describe('TaskInputComponent', () => {
  let component: TaskInputComponent;
  let fixture: ComponentFixture<TaskInputComponent>;
  let mockService: MockTaskService;

  beforeEach(() => {
    mockService = new MockTaskService();

    TestBed.configureTestingModule({
      declarations: [TaskInputComponent],
      imports: [FormsModule],
      providers: [{ provide: TaskService, useValue: mockService }],
    });

    fixture = TestBed.createComponent(TaskInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addTask on the service when input is not empty', () => {
    spyOn(mockService, 'addTask')
    component.inputValue = 'new task'
    component.addTaskToService();
    expect(mockService.addTask).toHaveBeenCalledWith('new task')
  })

  it('should NOT call addTask on the service when input is only spaces', () => {
    spyOn(mockService, 'addTask')
    component.inputValue = '   '
    component.addTaskToService()
    expect(mockService.addTask).not.toHaveBeenCalled()
  })

  it('should NOT call addTask on the service when input is empty', () => {
    spyOn(mockService, 'addTask')
    component.inputValue = ''
    component.addTaskToService()
    expect(mockService.addTask).not.toHaveBeenCalled()
  })

  it('should clear inputValue after adding a taks', () => {
    component.inputValue = 'test'
    component.addTaskToService()
    expect(component.inputValue).toBe('')
  })

  it('should call addTask on the service with long input', () => {
    spyOn(mockService, 'addTask')
    const longText = 'A'.repeat(10)
    component.inputValue = longText
    component.addTaskToService()
    expect(mockService.addTask).toHaveBeenCalledWith(longText)
  })
});
