import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Seller } from './services/seller';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecomm-project');
  // seller = inject(Seller);
  // // ngOnInit():void{
  // //   this.seller.reloadSeller();
  // // }
}
