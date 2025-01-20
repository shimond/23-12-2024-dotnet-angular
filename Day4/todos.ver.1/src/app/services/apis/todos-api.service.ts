import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { Observable, map } from 'rxjs';
import { Todo, TodoResponse, UserInfo, UserResponse } from '../../models/todos.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
    providedIn: 'root'
})
export class TodosApiService {

    #baseUrl = 'https://dummyjson.com';
    #http = inject(HttpClient);

    getAllTodos(): Observable<Todo[]> {
        return this.#http.get<TodoResponse>(this.#baseUrl).pipe(map(x => x.todos));
    }

    getTodosByUser(userId: number): Observable<Todo[]> {
        return this.#http.get<TodoResponse>(`${this.#baseUrl}/users/${userId}/todos`).pipe(map(x => x.todos));
    }

    markAsCompleted(todoId: number): Observable<any> {
        return this.#http.patch<Todo>(`${this.#baseUrl}/todos/${todoId}`, {
            completed: true
        });

    }

    getAllUsers(): Observable<UserInfo[]> {
        return this.#http.get<UserResponse>(`${this.#baseUrl}/users?limit=5&skip=10`).pipe(map(x => x.users));
    }

    constructor() { }
}
