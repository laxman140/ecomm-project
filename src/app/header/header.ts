import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  route=inject(Router);

  ngOnInit(): void {
    this.route.events.subscribe((val:any)=>{
      console.warn('val',val.url)
    })
  }

}
