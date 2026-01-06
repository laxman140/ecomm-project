import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../services/product-service';
import { Product } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [CommonModule,  RouterModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {

  private productService = inject(ProductService);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);
  searchResults: undefined | Product[];
  ngOnInit() {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.warn(query);
    query && this.productService.searchProducts(query).subscribe((result) => {
      console.warn(result);
      this.searchResults = result;
    });
  }
}
