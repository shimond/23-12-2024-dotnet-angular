import { Component, inject } from '@angular/core';
import { ProductSearchStore } from './store/product-search.store';
import { ProductsApiService } from '../../services/apis/products-api.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, debounceTime, interval, map, of, switchMap, tap } from 'rxjs';
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
    //    providers:[ProductSearchStore] ,
    templateUrl: './product-search.component.html',
    styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent {
    displayedColumns: string[] = ['id', 'name', 'price', 'description', 'action'];
    store = inject(ProductSearchStore);
    searchFormControl = new FormControl<string>('')
    #dialog = inject(MatDialog);

    getValueOf(num: number): Observable<number> {
        return of(num * 2);
    }

    constructor() {
        const changes = this.searchFormControl.valueChanges.pipe(
            debounceTime(150), map(x => x!));

        this.store.setKeyword(changes);
        
        // changes.subscribe(x=>{
        //     this.store.setKeyword(x);
        // });

    }

    addNewProduct() {
        this.#dialog.open(ProductAddEditComponent, { minWidth: '880px' })
            .afterClosed()
            .subscribe((p: Product) => {

            });
    }
}



// this.store.changeIsBusy(true);
// this.store.filteredProducts
// this.store.changeIsBusyWithNgrx(true);
// this.store.changeIsBusyWithNgrx(of(true));
// const rs = interval(1000).pipe(map(x=> x * 2), tap(c=> console.log(2)));
// const rs = interval(1000).pipe(map(x => 'The number is : ' + x * 2));
// const rs = interval(1000).pipe(switchMap(x=> this.getValueOf(x)));
