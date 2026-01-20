import { CanActivateFn} from '@angular/router';
import { Seller } from './services/seller';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const sellerService = inject(Seller);
  if(localStorage.getItem('seller')){
    return true;
  }
  return sellerService.isSellerLoggedIn;
};


// Which type of guard would you like to create?
// ❯◉ CanActivate
//  ◯ CanActivateChild
//  ◯ CanDeactivate
//  ◯ CanMatch