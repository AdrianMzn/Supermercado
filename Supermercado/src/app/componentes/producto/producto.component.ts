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
    this.cartService.add(producto).subscribe((prod) => (this.productosCarrito.push(prod)))
  }

}
