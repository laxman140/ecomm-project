import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  http = inject(HttpClient);

  getProduct(productId: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${productId}`);
  }

  addProduct(data: Product) {
    return this.http.post('http://localhost:3000/products', data);
  }

  getProductList() {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  deleteProduct(id: any) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(`http://localhost:3000/products/${product.id}`, product);
  }

}