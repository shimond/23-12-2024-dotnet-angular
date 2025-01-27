import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductsApiService {

    #baseUrl = 'https://localhost:7274/api/products';
    #http = inject(HttpClient);

    getAllProducts(): Observable<Product[]> {
        return this.#http.get<Product[]>(this.#baseUrl);
    }

    addNewProduct(product: Product): Observable<Product> {
        return this.#http.post<Product>(this.#baseUrl, product);
    }
    
    constructor() { }
}
