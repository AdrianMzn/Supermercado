import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, interval } from 'rxjs'
import { Producto } from '../models/producto.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:4210/addedProducts'

  constructor(private http: HttpClient) { }

  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseUrl)
  }

  add(product: Producto): Observable<Producto>{
    return this.http.post<Producto>(this.baseUrl, product)
  }

  delete(product: Producto): Observable<Producto>{
    const urlToRemove = `${this.baseUrl}/${product.id}`
    return this.http.delete<Producto>(urlToRemove)
  }

  plusOne(product: Producto): Observable<Producto> {
    const urlToUpdate = `${this.baseUrl}/${product.id}`
    const updatedProduct = { ...product, quantity: product.cantidad + 1 }

    return this.http.put<Producto>(urlToUpdate, updatedProduct)
  }

  minusOne(product: Producto): Observable<Producto>{
    const urlToUpdate = `${this.baseUrl}/${product.id}`
    const updatedProduct = {...product, cantidad: product.cantidad-=1}
    if(updatedProduct.cantidad == 0) {
      return this.http.delete<Producto>(urlToUpdate)
    }
    return this.http.put<Producto>(urlToUpdate, updatedProduct)
  }

}
