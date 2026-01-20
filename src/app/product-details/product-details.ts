import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, Product } from '../data-type';
import { ProductService } from '../services/product-service';
import { CommonModule } from '@angular/common';
import { count } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  productDetails: undefined | Product;
  count: number = 1;
  removeCart: boolean = false;
  cartData: Product | undefined;
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) { }
  ngOnInit() {
    let productId = this.activatedRoute.snapshot.paramMap.get('productId');
    productId && this.productService.getProduct(productId).subscribe((result) => {
      this.productDetails = result;
      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let cartItems = JSON.parse(cartData);
        let existingItem = cartItems.find((item: Product) => item.id === productId);
        if (existingItem) {
          //this.count = existingItem.quantity || 1;
          this.removeCart = true;
        }
        else {
          //this.count = 1;
          this.removeCart = false;
        }
      }
      //after refresh also check in database cart list & update removeCart button-(need to check not working 
      // even product is available in db for a user then remove button is not shown)
      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.productService.getCartList(userId);
        this.productService.cartData.subscribe((result) => {
          let items = result.filter((item: Product) => productId?.toString === item.productId?.toString)
          if (items.length) {
            this.cartData = items[0];
            this.removeCart = true;
          }
          else {
            this.removeCart = false;
          }
        });
      }
    });

  }
  handleQuantity(val: string) {
    (val === 'plus') ? this.count < 20 && this.count++ : val === 'minus' && this.count > 1 ? this.count-- : null;
  }

  addToCart() {
    if (this.productDetails) {
      this.productDetails.quantity = this.count;
      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.productDetails);
        this.removeCart = true;
      }
      else {
        console.warn("user is logged in");
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: Cart
          = {
          ...this.productDetails,
          userId,
          productId: this.productDetails.id
        };
        delete cartData.id;
        console.warn(cartData);
        this.productService.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.productService.getCartList(userId);
           // this.removeCart = true;
          }
        });
      }
    }
  }
  removeFromCart() {
    if (!localStorage.getItem('user')) {
      this.productDetails && this.productService.localRemoveFromCart(this.productDetails.id);
      this.removeCart = false;
      this.count = 1;
    } else {
      console.warn(this.cartData);
      this.cartData && this.productService.removeToCart(this.cartData.id).subscribe((result) => {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        this.productService.getCartList(userId);
      });
      this.removeCart = false;
      this.count = 1;
      console.warn("remove from cart"+this.removeCart);
    }
  }
}
