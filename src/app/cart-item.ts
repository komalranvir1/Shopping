import { Product } from "./product";




export class CartItem {
    id: number;
    name: string;
    imageUrl: string;
    salePrice: number;
    quantity: number;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.imageUrl = product.img;
        this.salePrice = product.price;
        this.quantity = 1;
    }
    
   
}