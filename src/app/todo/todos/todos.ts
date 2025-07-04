import { Component } from '@angular/core';
import { TodoService } from '../../core/service/todo';
import { Todos as TodoModel } from '../../models/todos';

@Component({
  selector: 'app-todos',
  standalone: false,
  templateUrl: './todos.html',
  styleUrl: './todos.css',
})
export class Todos {
  taskss: any[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe({
      next: (todos: any[]) => {
        this.taskss = todos;
      },
      error: (err: any) => console.error('Error loading todos:', err),
    });
  }

  onTodoAdded(newTodo: any) {
    this.taskss = [...this.taskss, newTodo];
  }
  onTasksUpdated(updatedTasks: TodoModel[]) {
    this.taskss = updatedTasks;
  }
}
