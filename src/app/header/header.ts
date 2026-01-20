import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductService } from '../services/product-service';
import { Product } from '../data-type';
import { Seller } from '../services/seller';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  router = inject(Router);
  menuType: string = 'default';
  sellerName: string = '';
  username: string = '';
  private productService = inject(ProductService);
  private sellerService = inject(Seller);
  searchResult: undefined | Product[];
  cartItems = 0;

  ngOnInit(): void {

    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.warn("in seller home");
          this.menuType = 'seller';
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore);
          this.sellerName = Array.isArray(sellerData) ? sellerData[0].name : sellerData.name;
        } else if (localStorage.getItem('user')) {
          console.warn("in user/home area");
          this.menuType = 'user';
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.username = userData.name;
          console.warn("in user home ", userStore);
          this.productService.getCartList(userData.id);
        }
        else {
          console.warn("default area");
          this.menuType = 'default';
        }
      }
    })
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.productService.cartData.subscribe((items) => {
      this.cartItems = items.length;
    });
  }
  //seller logout
  logout() {
    localStorage.removeItem('seller');
    this.router.navigateByUrl('');
    this.sellerService.isSellerLoggedIn.next(false);
    //this.route.navigate(['/'])
  }
  userLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
    this.productService.cartData.emit([]);
  }

  searchProducts(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      (element.value.toString().trim() != '') && this.productService.searchProducts(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5; //limiting to 5 results
        }
        this.searchResult = result;
      });
    }
  }

  searchSubmit(query: string) {
    console.warn(query);
   this.router.navigate([`search/${query}`]);
  }

  redirectProdDetails(productId: string) {
    this.router.navigate([`details/${productId}`]);
  }
}
