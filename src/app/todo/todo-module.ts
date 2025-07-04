import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTask } from './add-task/add-task';
import { Tasks } from './tasks/tasks';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Todos } from './todos/todos';

@NgModule({
  declarations: [AddTask, Tasks, Todos],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [AddTask, Tasks, Todos],
})
export class TodoModule {}
