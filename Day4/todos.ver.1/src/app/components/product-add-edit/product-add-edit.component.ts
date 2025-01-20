import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductSearchStore } from '../../pages/product-serach/store/product-search.store';
import { Product } from '../../models/product.model';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-product-add-edit',
    imports: [
        JsonPipe,
        MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
    templateUrl: './product-add-edit.component.html',
    styleUrl: './product-add-edit.component.scss'
})
export class ProductAddEditComponent {

    #dialog = inject(MatDialogRef<ProductAddEditComponent>)
    store = inject(ProductSearchStore);

    productForm = inject(FormBuilder).group({
        name: new FormControl<string>('', [Validators.required]),
        description: new FormControl<string>('', [Validators.required]),
        price: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    });


    constructor() {
    }

    onSubmit() {
        console.log('onsubmit');
        this.store.addNewProduct({
            product: this.productForm.value as Product, closer: (val: any) => {
                this.#dialog.close();
            }
        });
        console.log('onsubmit2');
    }


}
