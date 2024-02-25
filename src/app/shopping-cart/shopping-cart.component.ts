import { Component, HostListener, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { CartItem } from '../cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.cartItems = this.service.getCartItems();
  }
  
  
  removeFromCart(product: any): void {
    this.service.removeFromCart(product);
    this.cartItems = this.service.getCartItems(); 
  }
  listCartDetails() {

    // get a handle to the cart items
    this.cartItems = this.service.cartItems;

    // subscribe to the cart totalPrice
    this.service.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to the cart totalQuantity
    this.service.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    // compute cart total price and quantity
    this.service.computeCartTotals();
  }

  incrementQuantity(theCartItem: CartItem) {
    this.service.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem) {
    this.service.decrementQuantity(theCartItem);
  }

  remove(theCartItem: CartItem) {
    this.service.remove(theCartItem);
  }
}
