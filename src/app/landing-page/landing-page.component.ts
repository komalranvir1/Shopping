import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../product';
import { CartItem } from '../cart-item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {
  product: Product = { id: 0, name: '', price: 0, img: '' };
  products: Product[] = [];
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private service: ProductService, private router: Router) {
    this.productForm = this.fb.group({
      id: ['', Validators.required],
      img: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],

    })
  }

  ngOnInit(): void {
    this.products = this.service.getProducts();

  }

  submit() {
    let tempForm = this.productForm.value
    let imageName = this.productForm.get("img")?.value;

    tempForm.img = "/assets/Products/" + imageName.substring(12, imageName.length);
    // let productData = sessionStorage.setItem('Products', JSON.stringify(tempForm));
    // this.products.push(productData);
    this.products.push(tempForm);

  }

  addToCart(theProduct: Product) {

    const theCartItem = new CartItem(theProduct);

    this.service.addToCart(theCartItem);
    this.router.navigateByUrl('/shoppingCart');

  }
}
