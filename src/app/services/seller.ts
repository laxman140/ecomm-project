import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable } from '@angular/core';
import { LogIn, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Seller {
  http = inject(HttpClient);
  router = inject(Router);
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter(false);

  userSignUp(data: SignUp) {
    console.warn("Service call");
    this.http.post("http://localhost:3000/seller", data, { observe: 'response' }).
      subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home']);
      });
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: LogIn) {
    console.log("login data", data)
    //api call will be here
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' }
    ).subscribe((result: any) => {
      console.warn("result", result);
      if (result && result.body && result.body.length) {
        console.log("user logged in")
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home']);
      }
      else {
        console.warn("Logged in failed")
        this.isLoginError.emit(true);
      }
    })
  }
}
