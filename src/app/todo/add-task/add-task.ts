import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../core/service/todo';
import { Todos } from '../../models/todos';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: false,
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask implements OnInit {
  todoForm: FormGroup;
  editingId: string | null = null;

  @Output() todoAdded = new EventEmitter<Todos>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private todoService: TodoService,
    private route: ActivatedRoute
  ) {
    this.todoForm = this.fb.group({
      task: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.editingId = params['id'];
      if (this.editingId) {
        console.log('ont he ');
        this.todoService.getTaskById(this.editingId).subscribe((todo) => {
          this.todoForm.patchValue({
            task: todo.title,
            description: todo.description,
          });
        });
      }
    });
  }

  onAddTodo() {
    if (this.todoForm.invalid) return;

    const { task, description } = this.todoForm.value;

    const todoData = {
      title: task,
      description: description,
    };

    if (this.editingId) {
      this.todoService.updateTask(this.editingId, todoData).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          console.error('Error updating todo:', err);
        },
      });
    } else {
      this.todoService.addTodo(todoData).subscribe({
        next: (newTodo: Todos) => {
          this.todoForm.reset();
          this.router.navigate(['/']);
          this.todoAdded.emit(newTodo);
        },
        error: (err) => {
          console.error('Error adding todo:', err);
        },
      });
    }
  }
}
