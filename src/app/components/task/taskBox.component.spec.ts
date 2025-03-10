import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBoxComponent } from './taskBox.component';

describe('TaskBoxComponent', () => {
  let component: TaskBoxComponent;
  let fixture: ComponentFixture<TaskBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskBoxComponent]
    });
    fixture = TestBed.createComponent(TaskBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
