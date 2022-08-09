import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { CartService } from 'src/app/servicios/carrito.service';
import { ProductsService } from 'src/app/servicios/productos.service';
import { LoginService } from 'src/app/servicios/login.service';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-spam',
  templateUrl: './spam.component.html',
  styleUrls: ['./spam.component.css']
})
export class SpamComponent implements OnInit {

  preferencia: string = ''
  productosSugeridos: Producto[] = []
  productosCarrito: Producto[] = []
  loggedUser: string | null | undefined = ''
 
  analizarPreferencias(array: Producto[]): string {
    const recuentoSecciones:any = {}
    const secciones = 
      array
        .map(producto => producto.seccion)
        .forEach(x => recuentoSecciones[x] = (recuentoSecciones[x] | 0) + 1)
    const preferencia = Object.keys(recuentoSecciones).reduce((a,b) => recuentoSecciones[a]>recuentoSecciones[b] ? a : b)
    return preferencia
  }

  constructor(private cartService: CartService, private prodService: ProductsService, private loginService: LoginService, private userService: UserService) { }

 /*  ngOnInit(): void {
    this.cartService.getAll().subscribe((productos) => {
      if (productos.length >= 1) {
        this.productosCarrito = productos
        const preferencia = this.analizarPreferencias(productos)
        this.preferencia = preferencia
        this.prodService.getAll().subscribe((productos) => {
          const productosPreferidos =
            productos
              .filter(x => x.seccion == preferencia)
              .filter(prod => !this.productosCarrito.find(producto => producto.id == prod.id))
          this.productosSugeridos = productosPreferidos.slice(0, 3)
        })
      }

    })
  } */

  ngOnInit():void {
    this.loginService.comprobar().subscribe(data => this.loggedUser = data?.email)
    if (this.loggedUser){
      this.cartService.getAllFromUser().subscribe(users => {
        let user = users.find(user => user.email == this.loggedUser)
          let userID = user ? user.id : 0
          this.productosCarrito = users[userID].carrito
        const preferencia = this.analizarPreferencias(this.productosCarrito)
            this.preferencia = preferencia
            this.prodService.getAll().subscribe((productos) => {
              const productosPreferidos =
                productos
                  .filter(x => x.seccion == preferencia)
                  .filter(prod => !this.productosCarrito.find(producto => producto.id == prod.id))
              this.productosSugeridos = productosPreferidos.slice(0, 3)
            })
        
      })
     
    } else {
      this.cartService.getAllFromGuest().subscribe((productos) => {
        if (productos.length >= 1) {
          this.productosCarrito = productos
          const preferencia = this.analizarPreferencias(productos)
          this.preferencia = preferencia
          this.prodService.getAll().subscribe((productos) => {
            const productosPreferidos =
              productos
                .filter(x => x.seccion == preferencia)
                .filter(prod => !this.productosCarrito.find(producto => producto.id == prod.id))
            this.productosSugeridos = productosPreferidos.slice(0, 3)
          })
        }
      })
    }
  }

  addProducto(producto: Producto) {
    this.loginService.comprobar().subscribe(data => this.loggedUser = data?.email)
    if (this.loggedUser) {
      this.cartService.getAllFromUser().subscribe(users => {
        let user = users.find(user => user.email == this.loggedUser)
        let userID = user ? user.id : 0
        this.productosCarrito = users[userID].carrito

        const productoExiste: Producto | undefined = this.productosCarrito.find(p => producto.nombre == p.nombre)

        if (productoExiste) {
          const updatedProduct = { ...productoExiste, cantidad: productoExiste.cantidad + 1 }
          user!.carrito = user!.carrito.map(prod => prod.id == updatedProduct.id ? updatedProduct : prod)
          this.productosCarrito = this.productosCarrito.map(p1 => (updatedProduct.nombre == p1.nombre ? updatedProduct : p1))
          this.userService.put(user!).subscribe((user) => (console.log(user)))
          
        } else {
          const nuevoProducto = {
            ...producto, cantidad: 1
          }
          user!.carrito.push(nuevoProducto)
          this.cartService.addToUser(user!).subscribe((user) => (console.log(user)))
          
        }
      })
      this.ngOnInit()
    } else {
      this.cartService.getAllFromGuest().subscribe((devuelveprod) => (this.productosCarrito = devuelveprod))
      const productoExiste: Producto | undefined = this.productosCarrito.find(p => producto.nombre == p.nombre)

      if (productoExiste) {
        this.cartService.plusOne(productoExiste).subscribe((prodActual) => (
          this.productosCarrito = this.productosCarrito.map(p1 => (prodActual.nombre == p1.nombre ? prodActual : p1))
        ))
      } else {
        const nuevoProducto = {
          ...producto, cantidad: 1
        }
        this.cartService.add(nuevoProducto).subscribe((prod) => (this.productosCarrito.push(prod)))
        
      }
    }
    this.ngOnInit()
  }

  getColor(seccion: string){
    if(seccion == 'frutas'){
      return 'mediumseagreen';
    }

    else if( seccion == 'carnes'){
      return 'khaki';
    }

    else if( seccion == 'pescado'){
      return 'cadetblue';
    }

    return '';
      
  }

}

 /*   this.cartService.getAll().subscribe((devuelveprod) => (this.productosCarrito = devuelveprod))
      const productoExiste: Producto|undefined= this.productosCarrito.find(p => producto.nombre==p.nombre)
      
      if(productoExiste){
        this.cartService.plusOne(productoExiste).subscribe((prodActual) => (
          this.productosCarrito = this.productosCarrito.map(p1 => (prodActual.nombre==p1.nombre? prodActual: p1))
          ))
        }else{
          const nuevoProducto={
            ...producto,cantidad:1
          }
          this.cartService.add(nuevoProducto).subscribe((prod) => (this.productosCarrito.push(prod)))
        } */

        
      /*const productoExiste: Producto | undefined = this.productosCarrito.find(p => producto.nombre == p.nombre)
 
      if (productoExiste) {
        this.cartService.plusOne(productoExiste).subscribe((prodActual) => (
          this.productosCarrito = this.productosCarrito.map(p1 => (prodActual.nombre == p1.nombre ? prodActual : p1))
        ))
      } else {
        const nuevoProducto = {
          ...producto, cantidad: 1
        }
        this.cartService.add(nuevoProducto).subscribe((prod) => (this.productosCarrito.push(prod)))
      } */