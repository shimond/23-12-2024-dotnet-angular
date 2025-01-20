import { computed, inject } from "@angular/core";
import { Product } from "../../../models/product.model";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

import { ProductsApiService } from "../../../services/apis/products-api.service";
import { catchError, of, switchMap, tap } from "rxjs";

export interface ProductSearchState {
    readonly keyword: string;
    readonly isBusy: boolean;
    readonly results: Product[];
    readonly selectedProduct: Product | null;
    readonly addNewProductsError: any;
    readonly closer: ((val: any) => void) | null;
}

const initState: ProductSearchState = {
    keyword: '',
    isBusy: false,
    results: [],
    selectedProduct: null,
    addNewProductsError: null,
    closer: null
}


export const ProductSearchStore = signalStore(
    {
        providedIn: 'root'
    },
    withDevtools('ProductSearchStore'),
    withState(initState),
    withMethods((state, apiService = inject(ProductsApiService)) => ({
        
        changeIsBusy: (isBusy: boolean) => setItBusy(state, isBusy),
        
        // changeIsBusyWithNgrx: rxMethod<boolean>(isBusy$=> isBusy$.pipe(
        //     tap(isBusy => setItBusy(state, isBusy)))),
        
        load: rxMethod<void>(p$ => p$.pipe(
            tap(x => patchState(state, { isBusy: true })),
            switchMap(() => apiService.getAllProducts()),
            tap(results => patchState(state, { results: results, isBusy: false }))
        )),

        setSelectedItem: rxMethod<number>(id$ => id$.pipe(
            tap(id => patchState(state, { selectedProduct: state.results().find(o => o.id == id) }))
        )),
        
        setKeyword: rxMethod<string>(keyWordToUpdate =>
            keyWordToUpdate.pipe(tap(k => patchState(state, { keyword: k })))),
        
        addNewProduct: rxMethod<{ product: Product, closer: (val: any) => void }>(p$ => p$.pipe(
            tap(x => patchState(state, { isBusy: true, closer: x.closer, addNewProductsError: null })),
            switchMap((p) => apiService.addNewProduct(p.product).pipe(catchError((e) => {
                patchState(state, { addNewProductsError: e })
                return of(null);
            }))),
            tap(results => {
                if (results) {
                    const theCloser = state.closer();
                    if (theCloser) {
                        theCloser(results);
                    }
                    patchState(state, { results: [...state.results(), results], isBusy: false, closer: null, addNewProductsError: null });
                }
                else {
                    patchState(state, { isBusy: false, closer: null })
                }
            })
        ))
    })),
    withComputed((state) => ({
        filteredProducts: computed(() => 
            state.results().filter(x => x.name.toLowerCase().includes(state.keyword().toLowerCase())))
    })),
    withHooks((state) => ({
        onInit() {
            state.load();
        },
        onDestroy() {
        }
    }))


);

function setItBusy(state: any, isBusy: boolean) {
    patchState(state, { isBusy })
}