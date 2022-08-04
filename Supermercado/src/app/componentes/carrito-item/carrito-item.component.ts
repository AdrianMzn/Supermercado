import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: '[app-carrito-item]',
  templateUrl: './carrito-item.component.html',
  styleUrls: ['./carrito-item.component.css']
})
export class CarritoItemComponent implements OnInit {

  @Input() prod!: Producto
  @Output() onDeleteProduct: EventEmitter<Producto> = new EventEmitter()
  @Output() onDecreaseProduct: EventEmitter<Producto> = new EventEmitter()
  @Output() onIncreaseProduct: EventEmitter<Producto> = new EventEmitter()


  constructor() { }

  ngOnInit(): void {
  }

  onDelete(product: Producto){
    this.onDeleteProduct.emit(product)
  }

  onDecrease(product: Producto){
    if (product.cantidad-1 >= 0){
      this.onDecreaseProduct.emit(product)
    }
  }

  onIncrease(product: Producto){
    if (product.cantidad+1 <= product.cantidadMaxima){
      this.onIncreaseProduct.emit(product)
    }
  }

}