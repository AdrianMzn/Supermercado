import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/servicios/carrito.service';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  nombre: string = ''
  apellidos: string = ''
  direccion: string = ''
  telefono: string = ''
  productosCarrito: Producto[] = []
  totalPrice: number = 0
  getTotalPrice(array: Producto[]):number {return Math.round(array.reduce((acc, prod) => (acc + prod.precio * prod.cantidad), 0) * 100) / 100;}


  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getAll().subscribe(prods => {
      this.productosCarrito = prods
      this.totalPrice = this.getTotalPrice(this.productosCarrito)
    })
    
  }

  onSubmit(){
    console.log('submitted')
  }

  returnHome(){
    this.router.navigateByUrl('')
  }
}
