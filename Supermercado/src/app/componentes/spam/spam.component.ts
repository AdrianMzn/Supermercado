import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { CartService } from 'src/app/servicios/carrito.service';
import { ProductsService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-spam',
  templateUrl: './spam.component.html',
  styleUrls: ['./spam.component.css']
})
export class SpamComponent implements OnInit {

  preferencia: string = ''
  productosSugeridos: Producto[] = []
  productosCarrito: Producto[] = []
 
  analizarPreferencias(array: Producto[]): string {
    const recuentoSecciones:any = {}
    const secciones = 
      array
        .map(producto => producto.seccion)
        .forEach(x => recuentoSecciones[x] = (recuentoSecciones[x] | 0) + 1)
    const preferencia = Object.keys(recuentoSecciones).reduce((a,b) => recuentoSecciones[a]>recuentoSecciones[b] ? a : b)
    return preferencia
  }

  constructor(private cartService: CartService, private prodService: ProductsService) { }

  ngOnInit(): void {
    this.cartService.getAll().subscribe((productos) => {
        if (productos.length>=1){
          this.productosCarrito = productos
          const preferencia = this.analizarPreferencias(productos)
          this.preferencia = preferencia
          this.prodService.getAll().subscribe((productos) => {
          const productosPreferidos = productos.filter(x => x.seccion == preferencia)
          this.productosSugeridos = productosPreferidos.slice(0,3)
        })
        }
        
    })
  }

  addProducto(producto: Producto){
    this.cartService.add(producto).subscribe((prod) => (this.productosCarrito.push(prod)))
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
