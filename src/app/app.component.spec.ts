import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { TaskInputComponent } from './components/task-input/task-input.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent, TaskInputComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
