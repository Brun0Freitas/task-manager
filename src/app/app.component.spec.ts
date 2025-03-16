import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { TaskInputComponent } from './components/task-input/task-input.component';
import { TaskBoxComponent } from './components/task-box/task-box.component';
import { TaskToolbarComponent } from './components/task-toolbar/task-toolbar.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent, TaskInputComponent, TaskBoxComponent, TaskToolbarComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
