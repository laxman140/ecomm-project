import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product-service';
import { Cart, priceSummary } from '../data-type';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage implements OnInit {
  constructor(private product: ProductService, private router: Router) { }
  currectCartData: undefined | Cart[];
  priceSummary: priceSummary = {
    price: 0,
    tax: 0,
    discount: 0,
    delivery: 0,
    total: 0

  }

  ngOnInit(): void {
    this.loadDetails();
  }

  loadDetails(){
    this.product.currentCart().subscribe((result) => {
      this.currectCartData = result;
      let price = 0;
      result.forEach((item) => {
        if(item.quantity)
        price = price + (+item.price*+item.quantity);
      })
      this.priceSummary.price=price
      this.priceSummary.discount=price/10
      this.priceSummary.tax=price/10
      this.priceSummary.discount=100
      this.priceSummary.total=price+(price/10)+100-(price/10)
      if(!this.currectCartData.length){
        this.router.navigate(['/'])
      }
    });
  }

  checkout(){
    this.router.navigate(['/checkout'])
  }

  removeCart(cartId:string | undefined){
    // Use the provided cartId (single cart item id) instead of treating currectCartData as a single object
    cartId && this.product.removeToCart(cartId).subscribe((result) => {
       this.loadDetails();
      });
  }

}
