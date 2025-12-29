import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCarousel, NgbSlide } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  imports: [NgbCarousel, NgbSlide,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
