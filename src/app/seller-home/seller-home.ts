import { Component, inject } from '@angular/core';
import { ProductService } from '../services/product-service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './seller-home.html',
  styleUrl: './seller-home.css',
})
export class SellerHome {
  constructor(private productService: ProductService) {}
  productList:undefined | Product[];
  actionMsg:undefined | string;
  icon = faTrash;
  editIcon=faEdit;
  http = inject(ProductService);
  router = inject(Router);
  ngOnInit(): void {
    this.findProductList()
  }

  findProductList() {
    this.productService.getProductList().subscribe((result)=>{
      console.warn(result);
      this.productList=result;
    });
  }

  deleteProduct(id:any){
    this.productService.deleteProduct(id).subscribe((result)=>{
      console.warn(result);
      if(result){
        this.actionMsg="Product is deleted successfully"
      }
     this.findProductList();
    });
    setTimeout(() => {
        this.actionMsg='';
      }, 3000);
  }
  editProduct(id:any){
    console.warn("edit product",id);
    this.router.navigate(['seller-update-product',id]);
  }
}
