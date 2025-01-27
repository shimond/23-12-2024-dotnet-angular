import { computed, inject } from "@angular/core";
import { Product } from "../../../models/product.model";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { ProductsApiService } from "../../../services/apis/products-api.service";
import { catchError, of, switchMap, tap } from "rxjs";
const PAGE_SIZE = 5;

export interface ProductSearchState {
    keyword: string;
    isBusy: boolean;
    closer: ((val: any) => void) | null;
    addNewProductsError: any;
    results: Product[];
    selectedProduct: Product | null;
    pageIndex: number;
}

const initState: ProductSearchState = {
    closer: null,
    keyword: '',
    addNewProductsError: null,
    isBusy: false,
    results: [],
    selectedProduct: null,
    pageIndex: 1
}


export const ProductSearchStore = signalStore({
    providedIn: 'root'
},
    withState(initState),
    withMethods((state, apiService = inject(ProductsApiService)) => ({
        changeIsBusy: (isBusy: boolean) => setItBusy(state, isBusy),
        load: rxMethod<void>(p$ => p$.pipe(
            tap(x => patchState(state, { isBusy: true })),
            switchMap(() => apiService.getAllProducts()),
            tap(results => patchState(state, { results, isBusy: false }))
        )),
        addNewProduct: rxMethod<{ product: Product, closer: (val: any) => void }>(p$ => p$.pipe(
            tap(x => patchState(state, { isBusy: true, closer: x.closer, addNewProductsError: null })),
            switchMap((p) => apiService.addNewProduct(p.product)),
            catchError((e) => {
                patchState(state, { addNewProductsError: e })
                return of(null);
            }),
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
        )),
        setSelectedItem: rxMethod<number>(id$ => id$.pipe(
            tap(id => patchState(state, { selectedProduct: state.results().find(o => o.id == id) }))
        )),
        setKeyword: rxMethod<string>(keyWordToUpdate =>
            keyWordToUpdate.pipe(tap(k => patchState(state, { keyword: k, pageIndex: 1 })))),
        setPageIndex: rxMethod<number>(pageIndex$ => pageIndex$.pipe(
            tap(index => patchState(state, { pageIndex: index + 1 }))
        ))
    })),
    withComputed((state) => ({
        filteredProducts: computed(() => {
            let result = state.results().filter(x => x.name.toLowerCase().includes(state.keyword().toLowerCase()));
            const skipCount = (state.pageIndex() - 1) * PAGE_SIZE;
            return { items: result.splice(skipCount, 5), totalCount: result.length };
        })
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