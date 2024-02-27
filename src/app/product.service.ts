import { Injectable } from '@angular/core';
import { Product } from './product';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CartItem } from './cart-item';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cart = [];
  cartItems: CartItem[] = [];
  private products: Product[] = [
    { id: 1, name: 'Watch', price: 100,img:"/assets/Products/watch.jpg" },
    { id: 2, name: 'headPhone', price: 200 ,img:"/assets/Products/HeadPhone.jpg"},
    { id: 3, name: 'Laptop', price: 300 ,img:"/assets/Products/Laptop.jpg"},
    { id: 4, name: 'Mobile', price: 440 ,img:"/assets/Products/Mobile.jpg"},

  ];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  existingCartItem!: CartItem;
   storage: Storage = sessionStorage;
  constructor( ) {

    let tempItems: any = this.storage.getItem("cartItems");
    let data = JSON.parse(tempItems);


    if (data != null) {
      this.cartItems = data;

      // compute totals based on the data that is read from storage
      this.computeCartTotals();
    }

   }

  
  addToCart(theCartItem: CartItem) {

    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;


    if (this.cartItems.length > 0) {

      let existingItems: any = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);

      this.existingCartItem = existingItems;
      if (existingItems != null || existingItems != undefined) {
        alreadyExistsInCart = true;
      }

    }

    if (alreadyExistsInCart) {
      // increment the quantity
      this.existingCartItem.quantity++;
    }
    else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  getProducts(): Product[]  {
    return this.products;
  }
 

  removeFromCart(product: Product): void {
    const index = this.cartItems.findIndex((item: { id: number; }) => item.id === product.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  
  getCart(): any[] {
    return this.cart;
  }


  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.salePrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);

    // persist cart data
    this.persistCartItems();
  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.salePrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, salePrice=${tempCartItem.salePrice}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----');
  }

  decrementQuantity(theCartItem: CartItem) {

    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotals();
    }
  }
  remove(theCartItem: CartItem) {

    // get index of item in the array
    const itemIndex = this.cartItems.findIndex((tempCartItem: { id: number; }) => tempCartItem.id === theCartItem.id);

    // if found, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }

}
