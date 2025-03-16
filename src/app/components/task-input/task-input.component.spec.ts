import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TaskInputComponent } from './task-input.component';
import { TaskService } from 'src/app/service/task-service.service';

class MockTaskService {
  addTask = jasmine.createSpy('addTask');
  formatTaskName = jasmine.createSpy('formatTaskName');
}

describe('TaskInputComponent', () => {
  let component: TaskInputComponent;
  let fixture: ComponentFixture<TaskInputComponent>;
  let service: MockTaskService;

  beforeEach(() => {
    service = new MockTaskService();

    TestBed.configureTestingModule({
      declarations: [TaskInputComponent],
      imports: [FormsModule],
      providers: [{ provide: TaskService, useValue: service }],
    });

    fixture = TestBed.createComponent(TaskInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call add Task on the service when input is not empty', () => {
    const inputTask = '   new     task    ';
    const formattedTask = 'new task'

    component.inputValue = inputTask;
    service.formatTaskName.and.returnValue(formattedTask);
    component.addTaskToService();
    expect(service.addTask).toHaveBeenCalledWith(formattedTask);
  })

  it('should NOT call addTask on the service when input is only spaces', () => {
    component.inputValue = '   '
    component.addTaskToService()
    expect(service.addTask).not.toHaveBeenCalled()
  })

  it('should NOT call addTask on the service when input is empty', () => {
    component.inputValue = ''
    component.addTaskToService()
    expect(service.addTask).not.toHaveBeenCalled()
  })

  it('should clear inputValue after adding a taks', () => {
    const inputTask = 'test';
    const formattedTask = inputTask
    service.formatTaskName.and.returnValue(formattedTask)

    component.inputValue = inputTask
    component.addTaskToService()
    expect(component.inputValue).toBe('')
  })

  it('should call addTask on the service with long input', () => {
    const longText = 'A'.repeat(10)
    const formattedTask = longText

    component.inputValue = longText
    service.formatTaskName.and.returnValue(formattedTask)

    component.addTaskToService()
    expect(service.addTask).toHaveBeenCalledWith(longText)
  })
});
