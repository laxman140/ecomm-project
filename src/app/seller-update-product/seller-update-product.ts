import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product-service';
import { Product } from '../data-type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-update-product.html',
  styleUrl: './seller-update-product.css',
})
export class SellerUpdateProduct {
  updateProductMessage: undefined | string;
  productData!: Product | undefined;
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId && this.productService.getProduct(productId).subscribe((data: Product) => {
      console.warn(data);
      this.productData = data;
    }
    );
  }

  onUpdateProduct(data: Product) {
   if(this.productData) data.id = this.productData?.id;
    this.productService.updateProduct(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.updateProductMessage = "Product is updated successfully";
      }
    });
    setTimeout(() => {
      this.updateProductMessage = '';
    }, 3000);
  }
}
