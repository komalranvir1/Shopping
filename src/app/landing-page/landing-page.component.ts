import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  products = [
    { name: 'Product 1', price: 10 },
    { name: 'Product 2', price: 20 },
    { name: 'Product 3', price: 15 }
  ];

  addToCart(product: any) {
    console.log('Added to cart:', product);
  }

}
