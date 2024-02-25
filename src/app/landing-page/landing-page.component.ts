import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../product';
import { CartItem } from '../cart-item';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{
  product: Product []=[];
  products: any[]=[];
  // private products: Product[] = [
  //   { id: 1, name: 'Watch', price: 100,img:"/assets/Products/watch.jpg" },
  //   { id: 2, name: 'headPhone', price: 200 ,img:"/assets/Products/HeadPhone.jpg"},
  //   { id: 3, name: 'Laptop', price: 300 ,img:"/assets/Products/Laptop.jpg"},
  //   { id: 3, name: 'Mobile', price: 440 ,img:"/assets/Products/Mobile.jpg"},

  // ];

  constructor(private service:ProductService, private router:Router){

  }
 
  ngOnInit(): void {
    this.products = this.service.getProducts();

  }

  addToCart(theProduct: Product) {

    const theCartItem = new CartItem(theProduct);

    this.service.addToCart(theCartItem);
         this.router.navigateByUrl('/shoppingCart');

  }
}
