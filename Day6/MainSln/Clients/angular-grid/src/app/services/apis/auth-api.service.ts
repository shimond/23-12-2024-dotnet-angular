import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {

    #baseUrl = 'https://localhost:7274/api/auth';
    #http = inject(HttpClient);

    login(loginDetails: LoginRequest): Observable<{ token: string }> {
        return this.#http.post<{ token: string }>(`${this.#baseUrl}/login`, loginDetails);
    }
}
