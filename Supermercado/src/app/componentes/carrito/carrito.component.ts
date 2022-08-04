import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Product } from 'src/app/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  addedProducts: Product[] = []

  constructor(private cartService: CartService) { 
  }
  
  ngOnInit(): void {
    this.cartService.getAll().subscribe((products) => (this.addedProducts = products))
  }

  removeProduct(product: Product){
    console.log(product)
    this.cartService.delete(product).subscribe((products) => (this.addedProducts = this.addedProducts.filter((prod) => (prod.id !== product.id))))
  }

  increaseQuantity(product:Product){
    this.cartService.plusOne(product).subscribe((product) => (this.addedProducts = this.addedProducts.map((prod) => (prod.id === product.id ? product : prod))))
  }

  decreaseQuantity(product:Product){
    this.cartService.minusOne(product).subscribe((product) => (this.addedProducts = this.addedProducts.map((prod) => (prod.id === product.id ? product : prod))))
  }

}
