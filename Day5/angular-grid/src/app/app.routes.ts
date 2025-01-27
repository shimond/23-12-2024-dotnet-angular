import { Routes } from '@angular/router';



export const routes: Routes = [
    { path: 'products', loadComponent: () => import('./pages/product-serach/product-search.component') },
    { path: 'counter', loadComponent: () => import('./components/coutner/coutner.component') },
    { path: '', pathMatch: 'full', redirectTo: 'products' }
];
