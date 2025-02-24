import { Component, effect, input, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../models/product.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-product-details',
    imports: [MatCardModule, MatButtonModule],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
    product = input.required<Product>();


    constructor() {
        effect(() => console.log(this.product().name + " Changed"));
    }
}
