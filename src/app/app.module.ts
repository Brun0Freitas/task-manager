import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TaskInputComponent } from './components/task-input/task-input.component';
import { TaskService } from './service/task-service.service';

@NgModule({
  declarations: [
    AppComponent,
    TaskInputComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})

export class AppModule { }
