import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';
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
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) { }
  ngOnInit() {
    let productId = this.activatedRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.productService.getProduct(productId).subscribe((result) => {
      console.warn(result);
      this.productDetails = result;
      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let cartItems = JSON.parse(cartData);
        let existingItem = cartItems.find((item: Product) => item.id === productId);
        if (existingItem && existingItem) {
          //this.count = existingItem.quantity || 1;
          this.removeCart = true;
        }
        else {
          //this.count = 1;
          this.removeCart = false;
        }
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
      }
    }
  }
  removeFromCart() {
    if (this.productDetails) {
      this.productService.localRemoveFromCart(this.productDetails.id);
      this.removeCart = false;
      this.count = 1;
    }
  }
}
