import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable } from '@angular/core';
import { Cart, Order, Product } from '../data-type';

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
      //this.cartData.emit(cartData);
    } else {
      console.warn("else part");
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
      !items.length ? localStorage.removeItem('localCart') :localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items); //check where we are using this cartData field for this service file
    }
  }

  addToCart(cartData: Cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: string) {
    return this.http.get<Product[]>(`http://localhost:3000/cart?userId=${userId}`, { observe: 'response' })
      .subscribe((res) => {
        console.warn("cartList",res);
        
        if (res && res.body) {
          this.cartData.emit(res.body);
        } else {
          this.cartData.emit([]);
        }
      });
  }

  removeToCart(cartId: String) {
    return this.http.delete(`http://localhost:3000/cart/${cartId}`);
  }

  currentCart(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Cart[]>(`http://localhost:3000/cart?userId=${userData.id}`);
  }

  orderNow(data:Order){
    return this.http.post('http://localhost:3000/orders',data)
  }

  orderList(){
     let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Order[]>(`http://localhost:3000/orders?userId=${userData.id}`);
  }

  deleteCartItems(cartId:string){
    this.http.delete(`http://localhost:3000/cart/${cartId}`,{observe:'response'}).subscribe((res)=>{
      res && this.cartData.emit([]);
    })
  }

  deleteOrder(orderId:string){
    return this.http.delete(`http://localhost:3000/orders/${orderId}`)
  }
}