import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = []

  constructor() { }

  ngOnInit(): void {
    this.generarProductos()
  }

  generarProductos() {
    let producto1: Producto = {
      id: 1,
      seccion: 'lacteos',
      nombre: 'leche',
      precio: 1.30,
      descripcion: 'loren ipsum',
      imagen: 'windowWhen.gertwtn',
    }
    this.productos.push(producto1)

    let producto2: Producto = {
      id: 2,
      seccion: 'verduras',
      nombre: 'zanahoria',
      precio: 0.80,
      descripcion: 'loren ipsum',
      imagen: 'windowWhen.gertwtn',
    }
    this.productos.push(producto2)
  }

}
