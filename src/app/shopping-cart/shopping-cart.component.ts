import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

  cartItems = [
    { name: 'Product 1', price: 10 },
    { name: 'Product 2', price: 20 }
  ];

  removeFromCart(item: any) {
    console.log('Removed from cart:', item);
  }
}
