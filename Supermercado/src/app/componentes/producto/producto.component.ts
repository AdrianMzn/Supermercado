import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductsService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = []

  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    this.prodService.getAll().subscribe((productos) => (this.productos = productos))
  }

}
