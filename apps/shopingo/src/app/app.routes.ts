import { Route } from '@angular/router';
import { LayoutComponent } from './core/layout/layout';
import { HomeComponent } from './pages/home/home';
import { ProductListComponent } from './pages/product-list/product-list';

export const appRoutes: Route[] = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: HomeComponent }, // Default page
            { path: 'products', component: ProductListComponent }, // Products page
        ],
    },
];
