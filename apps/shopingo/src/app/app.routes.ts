import { Route } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: HomeComponent }, // Default page
            { path: 'products', component: ProductListComponent }, // Products page
            { path: 'products/:id', component: ProductDetailComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
        ],
    },
];
