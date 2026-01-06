import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable } from '@angular/core';
import { Product } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  http = inject(HttpClient);
  cartData = new EventEmitter<Product[] | []>();

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

  popularProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=3');
  }

  trendyProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=8');
  }
  
  searchProducts(query: string) {
    return this.http.get<Product[]>(`http://localhost:3000/products?q=${query}`);
  }

  localAddToCart(productDetails: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      cartData.push(productDetails);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(productDetails);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }
  localRemoveFromCart(productId: string) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item: Product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items); //check where we are using this cartData field for this service file
    }
  }
}