import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/Product';

@Component({
  selector: '[app-cart-item]',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() prod!: Product
  @Output() onDeleteProduct: EventEmitter<Product> = new EventEmitter()
  @Output() onDecreaseProduct: EventEmitter<Product> = new EventEmitter()
  @Output() onIncreaseProduct: EventEmitter<Product> = new EventEmitter()


  constructor() { }

  ngOnInit(): void {
  }

  onDelete(product: Product){
    this.onDeleteProduct.emit(product)
  }

  onDecrease(product: Product){
    if (product.quantity-1 >= 0){
      this.onDecreaseProduct.emit(product)
    }
  }

  onIncrease(product: Product){
    if (product.quantity+1 <= product.max){
      this.onIncreaseProduct.emit(product)
    }
  }

}