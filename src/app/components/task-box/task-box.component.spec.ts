import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskBoxComponent } from './task-box.component';
import { TaskService } from 'src/app/service/task-service.service';
import { TaskInterface } from 'src/app/types/taskInterface';

class MockTaskService {
  toggleTask = jasmine.createSpy('toggleTask');
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

  it('should call toggleTask() on service with the correct task ID', () => {
    const mockTask: TaskInterface = { id: '1', text: 'task name', isCompleted: false };
    component.toggleCompletion(mockTask);
    expect(mockService.toggleTask).toHaveBeenCalledOnceWith(mockTask.id);
  })
});
