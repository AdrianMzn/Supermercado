import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { CartService } from 'src/app/servicios/carrito.service';
import { Router } from '@angular/router';
import { User } from 'src/app/User';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  loggedUser: string | null | undefined = ''
  addedProducts: Producto[] = []
  totalPrice: number = 0
  getTotalPrice(array: Producto[]):number {return Math.round(array.reduce((acc, prod) => (acc + prod.precio * prod.cantidad), 0) * 100) / 100;}

  constructor(private cartService: CartService, private router: Router, private loginService: LoginService) { 
  }
  
  ngOnInit(): void {
    this.cartService.getRefreshCart.subscribe(() => {
      this.getAllCartItems()
    })
    this.getAllCartItems()
  }

  getAllCartItems(){
    this.loginService.comprobar().subscribe(data => {
      this.loggedUser = data?.email
      
      if (this.loggedUser){
        console.log('hay alguien conectado')
        this.cartService.getAllFromUser().subscribe(users => {
          let user = users.find(user => user.email == this.loggedUser)
          let userID = user ? user.id : 0
          this.addedProducts = users[userID].carrito
          this.totalPrice = this.getTotalPrice(this.addedProducts)
        })
      } else {
        console.log('nadie conectado')
        this.cartService.getAllFromGuest().subscribe((products) => {
          this.addedProducts = products
          this.totalPrice = this.getTotalPrice(this.addedProducts)
        })
      }
    })

  }
  removeProduct(product: Producto){
    this.cartService
      .delete(product)
      .subscribe((products) => {
        this.addedProducts = this.addedProducts.filter((prod) => (prod.id !== product.id))
        this.totalPrice = this.getTotalPrice(this.addedProducts)
      })
  }

  increaseQuantity(product:Producto){
    this.cartService
    .plusOne(product)
    .subscribe((product) => {
      this.addedProducts = this.addedProducts.map((prod) => (prod.id === product.id ? product : prod))
      this.totalPrice = this.getTotalPrice(this.addedProducts)
    })
  }

  decreaseQuantity(product:Producto){
    this.cartService
    .minusOne(product)
    .subscribe((product) => {
      this.addedProducts = this.addedProducts.map((prod) => (prod.id === product.id ? product : prod))
      this.totalPrice = this.getTotalPrice(this.addedProducts)
    })
  }

  placeOrder(){
    this.router.navigateByUrl('checkout')
  }

}
