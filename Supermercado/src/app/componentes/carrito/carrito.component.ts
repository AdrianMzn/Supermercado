import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { CartService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  addedProducts: Producto[] = []

  constructor(private cartService: CartService) { 
  }
  
  ngOnInit(): void {
    this.cartService.getAll().subscribe((products) => (this.addedProducts = products))
  }

  removeProduct(product: Producto){
    console.log(product)
    this.cartService.delete(product).subscribe((products) => (this.addedProducts = this.addedProducts.filter((prod) => (prod.id !== product.id))))
  }

  increaseQuantity(product:Producto){
    this.cartService.plusOne(product).subscribe((product) => (this.addedProducts = this.addedProducts.map((prod) => (prod.id === product.id ? product : prod))))
  }

  decreaseQuantity(product:Producto){
    this.cartService.minusOne(product).subscribe((product) => (this.addedProducts = this.addedProducts.map((prod) => (prod.id === product.id ? product : prod))))
  }

}
