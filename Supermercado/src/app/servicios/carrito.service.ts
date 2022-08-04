import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, interval } from 'rxjs'
import { Product } from '../Product';

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

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
  }

  add(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl, product)
  }

  delete(product: Product): Observable<Product>{
    const urlToRemove = `${this.baseUrl}/${product.id}`
    return this.http.delete<Product>(urlToRemove)
  }

  plusOne(product: Product): Observable<Product> {
    const urlToUpdate = `${this.baseUrl}/${product.id}`
    const updatedProduct = { ...product, quantity: product.quantity + 1 }

    return this.http.put<Product>(urlToUpdate, updatedProduct)
  }

  minusOne(product: Product): Observable<Product>{
    const urlToUpdate = `${this.baseUrl}/${product.id}`
    const updatedProduct = {...product, quantity: product.quantity-=1}
    if(updatedProduct.quantity == 0) {
      return this.http.delete<Product>(urlToUpdate)
    }
    return this.http.put<Product>(urlToUpdate, updatedProduct)
  }

}
