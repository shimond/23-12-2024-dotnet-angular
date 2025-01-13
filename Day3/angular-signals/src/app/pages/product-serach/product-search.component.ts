import { Component, inject } from '@angular/core';
import { ProductSearchStore } from './store/product-search.store';
import { ProductsApiService } from '../../services/apis/products-api.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounceTime, map } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { ProductDetailsComponent } from '../../components/product-details/product-details.component';
import { ProductAddEditComponent } from '../../components/product-add-edit/product-add-edit.component';
import { Product } from '../../models/product.model';



@Component({
    selector: 'app-product-search',
    imports: [
        MatIconModule,
        MatDialogModule,
        ProductDetailsComponent,
        MatInputModule, MatFormFieldModule, ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatProgressSpinnerModule],
    templateUrl: './product-search.component.html',
    styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent {
    displayedColumns: string[] = ['id', 'name', 'price', 'description', 'action'];
    store = inject(ProductSearchStore);
    searchFormControl = new FormControl<string>('')
    #dialog = inject(MatDialog);
    constructor() {
        const changes = this.searchFormControl.valueChanges.pipe(
            debounceTime(150), map(x => x!!));

        this.store.setKeyword(changes)
    }

    addNewProduct() {
        this.#dialog.open(ProductAddEditComponent, { minWidth: '880px' })
            .afterClosed()
            .subscribe((p: Product) => {
                
            });
    }
}