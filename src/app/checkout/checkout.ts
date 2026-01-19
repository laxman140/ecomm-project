import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product-service';
import { Cart, Order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  constructor(private product: ProductService) { }
  router = inject(Router);
  cartData: Cart[] | undefined;
  totalPrice: number | undefined;
  orderMsg: string | undefined
  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity)
          price = price + (+item.price * +item.quantity);
      })
      this.totalPrice = price + (price / 10) + 100 - (price / 10)
      console.warn(this.totalPrice);

    });
  }

  orderNow(data: { email: string, address: string, contact: string }) {
    console.warn(data);
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: Order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }
      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 600)
      })
      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          // alert("Order Placed")
          this.orderMsg = 'Your order has been placed'
          setTimeout(() => {
            this.router.navigate(['/my-order']);
            this.orderMsg = undefined
          },4000)
        }
      })
    }
  }

}
