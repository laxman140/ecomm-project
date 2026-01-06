import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbCarousel, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product-service';
import { Product } from '../data-type';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgbCarousel, NgbSlide, CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private productService = inject(ProductService);
  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProducts: Product[] = [];
  trendyProducts: undefined | Product[];

  ngOnInit(): void {
    this.productService.popularProducts().subscribe((data: Product[]) => {
      this.popularProducts = data;
    });
    this.productService.trendyProducts().subscribe((data: Product[]) => {
      console.log(data);
      this.trendyProducts = data;
    });
  }
}
