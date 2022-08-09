import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/servicios/carrito.service';
import { Producto } from 'src/app/models/producto.model';
import { LoginService } from 'src/app/servicios/login.service';

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
  loggedUser: string | null | undefined = ''
  getTotalPrice(array: Producto[]):number {return Math.round(array.reduce((acc, prod) => (acc + prod.precio * prod.cantidad), 0) * 100) / 100;}


  constructor(private router: Router, private cartService: CartService, private loginService:LoginService) { }

  ngOnInit(): void {
    this.loginService.comprobar().subscribe(data => this.loggedUser = data?.email)
    if (this.loggedUser){
      this.cartService.getAllFromUser().subscribe(users => {
        let user = users.find(user => user.email == this.loggedUser)
        let userID = user ? user.id : 0
        this.productosCarrito = users[userID].carrito
        this.totalPrice = this.getTotalPrice(this.productosCarrito)
      })
    } else {
      this.cartService.getAllFromGuest().subscribe((products) => {
        this.productosCarrito = products
        this.totalPrice = this.getTotalPrice(this.productosCarrito)
      })
    }
    
  }

  onSubmit(){
    console.log('submitted')
  }

  returnHome(){
    this.router.navigateByUrl('')
  }
}
