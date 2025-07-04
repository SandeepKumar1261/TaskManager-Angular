import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todos } from '../../models/todos';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://todobackend-f6ze.onrender.com/todos';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return { headers };
  }

  addTodo(todo: { title: string; description: string }): Observable<any> {
    const body = {
      ...todo,
      completed: false,
    };
    return this.http.post(this.apiUrl, body, this.getAuthHeaders());
  }

  getTodos(): Observable<Todos[]> {
    return this.http.get<Todos[]>(this.apiUrl, this.getAuthHeaders());
  }

  updateTodo(id: string, updatedData: Partial<Todos>): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      updatedData,
      this.getAuthHeaders()
    );
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }
  getTaskById(id: string): Observable<Todos> {
    return this.http.get<Todos>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }

  updateTask(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, this.getAuthHeaders());
  }
}
