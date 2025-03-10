import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { TaskService } from './service/task-service.service';
import { AppComponent } from './app.component';
import { TaskInputComponent } from './components/task-input/task-input.component';
import { TaskBoxComponent } from './components/task/taskBox.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskInputComponent,
    TaskBoxComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})

export class AppModule { }
