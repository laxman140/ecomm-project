import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterOutlet,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  route=inject(Router);
  menuType: string = 'default';
  sellerName:string='';

  ngOnInit(): void {
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        console.warn(val.url);
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          console.warn("in seller home");
          this.menuType='seller';
          let sellerStore=localStorage.getItem('seller');
          let sellerData=sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName=sellerData.name;
        }
        else{
          console.warn("not in seller home");
          this.menuType='default';
        }
      }
    })
  }
  logout(){
    localStorage.removeItem('seller');
    this.route.navigateByUrl('');
    //this.route.navigate(['/'])
  }

}
