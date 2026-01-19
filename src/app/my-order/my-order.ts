import { Component } from '@angular/core';
import { ProductService } from '../services/product-service';
import { Order } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-order',
  imports: [CommonModule],
  templateUrl: './my-order.html',
  styleUrl: './my-order.css',
})
export class MyOrder {
  constructor(private product: ProductService) { }

  orderData: Order[] | undefined;

  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId: string | undefined) {
    orderId && this.product.deleteOrder(orderId).subscribe((res) => {
      this.getOrderList();
    })
  }

  getOrderList() {
    this.product.orderList().subscribe((result) => {
      this.orderData = result;
    })
  }
}
