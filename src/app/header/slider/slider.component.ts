import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngbmodule/material-carousel';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  constructor() { }

  slides = [
    'https://www.thebudgetfashionista.com/wp-content/uploads/2015/04/fashion-sales-fi.jpg',
    'https://c8.alamy.com/comp/CPXFP9/clothes-on-sale-in-shop-with-30-per-cent-off-ticket-uk-CPXFP9.jpg'
  ];

  ngOnInit(): void {
   
  }

}
