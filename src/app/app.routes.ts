import { Routes } from '@angular/router';
import { Home } from './home/home';
import { SellerAuth } from './seller-auth/seller-auth';
import { SellerHome } from './seller-home/seller-home';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'seller-auth', component: SellerAuth },
    {path: 'seller-home', component: SellerHome, canActivate: [authGuard]}
];
