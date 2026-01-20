import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cart, LogIn, Product, SignUp } from '../data-type';
import { UserService } from '../services/user-service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product-service';

@Component({
  selector: 'app-user-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-auth.html',
  styleUrl: './user-auth.css',
})
export class UserAuth {
  showLogin: boolean = true;
  authError: string = '';
  constructor(private userService: UserService, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.userService.userAuthReload();
  }
  signUp(data: SignUp) {
    this.userService.userSignUp(data);
    // this.router.navigate(['/']);
  }
  login(data: LogIn) {
    this.userService.userLogin(data);
    this.userService.invalidUserAuth.subscribe((isInvalid: boolean) => {
      if (isInvalid) {
        this.authError = 'Invalid email or password';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let userStore = localStorage.getItem('user');
    console.warn("user", userStore);
    let userId = userStore && JSON.parse(userStore).id;
    if (data) {
      let cartDataList: Product[] = JSON.parse(data);
      cartDataList.forEach((product: Product, index: number) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          userId
        };
        delete cartData.id;
        console.warn(cartData);
        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn("Item stored in DB");
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }
    setTimeout(() => {
      this.productService.getCartList(userId);
    }, 2000);
  }
}
