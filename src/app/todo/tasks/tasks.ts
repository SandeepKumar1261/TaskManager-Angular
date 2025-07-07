import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todos } from '../../models/todos';
import { Router } from '@angular/router';
import { TodoService } from '../../core/service/todo';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  @Input() taskss: Todos[] = [];
  @Output() tasksUpdated = new EventEmitter<Todos[]>();
  filteredtasks: Todos[] = [];
  searchTerm: string = '';

  constructor(private router: Router, private todoService: TodoService) {}

  ngOnInit() {
    this.filteredtasks = this.taskss;
  }

  ngOnChanges() {
    this.filterTasks();
  }

  filterTasks() {
    const term = this.searchTerm.toLowerCase();
    this.filteredtasks = this.taskss.filter(
      (task) =>
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term)
    );
  }

  navigateToAddTask(): void {
    this.router.navigate(['/addtask']);
  }

  navigateToEditTask(todo: Todos): void {
    this.router.navigate(['/addtask'], { queryParams: { id: todo._id } });
  }

  deleteTask(id: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.todoService.deleteTodo(id).subscribe({
        next: () => {
          this.taskss = this.taskss.filter((task) => task._id !== id);
          this.filteredtasks = this.filteredtasks.filter(
            (task) => task._id !== id
          );
          this.tasksUpdated.emit(this.taskss);
          this.filterTasks();
        },
        error: (error) => {
          console.error('Error deleting task:', error);
        },
      });
    }
  }
}
