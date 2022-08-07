import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductsService } from 'src/app/servicios/productos.service';
import { CartService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = []
  productosCarrito: Producto[] = []

  constructor(private prodService: ProductsService, private cartService: CartService) { }

  ngOnInit(): void {
    this.prodService.getAll().subscribe((productos) => (this.productos = productos))
  }

  addProducto(producto: Producto){
    this.cartService.getAll().subscribe((devuelveprod) => (this.productosCarrito = devuelveprod))
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
    }
    
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
