import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product-service';
import { Product } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-add-product',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './seller-add-product.html',
  styleUrl: './seller-add-product.css',
})
export class SellerAddProduct {
  constructor(private product: ProductService) { }
  addProductMessage: string | undefined;

  onAddProduct(form: Product) {
    this.product.addProduct(form).subscribe((result) => {
      if (result) {
        this.addProductMessage = "Product is added successfully";
      }
    });
    setTimeout(() => {
      this.addProductMessage = undefined;
    }, 3000);
  }

}
