import { CanActivateFn} from '@angular/router';
import { Seller } from './services/seller';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Seller);

   if(localStorage.getItem('seller')){
      return true;
     // return false;
    }
  return authService.isSellerLoggedIn;
 //return false;
};


// Which type of guard would you like to create?
// ❯◉ CanActivate
//  ◯ CanActivateChild
//  ◯ CanDeactivate
//  ◯ CanMatch