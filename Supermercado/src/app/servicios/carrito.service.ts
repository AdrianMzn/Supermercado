import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, interval, Subject } from 'rxjs'
import { tap } from 'rxjs';
import { Producto } from '../models/producto.model';
import { LoginService } from './login.service';
import { UserService } from './user.service';
import { User } from '../User';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private refreshCart = new Subject<void>()
  loggedUser: string | null | undefined = ''
  users: User[] = []
  userID: number = 0
  productosCarrito: Producto[] = []
  
  get getRefreshCart(){
    return this.refreshCart
  }
  
  constructor(private http: HttpClient, private loginService: LoginService, private userService: UserService) { }

  private baseUrl = 'http://localhost:4230/addedProducts'
  private userBaseUrl = 'http://localhost:4230/users'
  
  getAllFromGuest(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseUrl)
  } 

  /* getAllFromUser(): Producto[]{
    this.loginService.comprobar().subscribe(data => {
      this.loggedUser = data?.email
      console.log(this.loggedUser)
  
    this.userService.getAll().subscribe(users => {
      this.users = users
      let user = this.users.find(user => user.email == this.loggedUser)
      this.userID = user ? user.id : 0
      this.productosCarrito = this.users[this.userID || 0].carrito
    })})
    return this.productosCarrito
  }
 */

  getAllFromUser(): Observable<User[]>{
    return this.userService.getAll()
  }

  add(product: Producto): Observable<Producto>{
    return this.http
      .post<Producto>(this.baseUrl, product)
      .pipe(
        tap(() => {
          this.refreshCart.next()
        })
      )
  }

  addToUser(user: User): Observable<User>{
    const urlToUpdate = `${this.userBaseUrl}/${user.id}`
    return this.http
      .put<User>(urlToUpdate, user)
      .pipe(
        tap(() => {
          this.refreshCart.next()
        })
      )
  }

  delete(product: Producto): Observable<Producto>{
    const urlToRemove = `${this.baseUrl}/${product.id}`
    return this.http.delete<Producto>(urlToRemove)
  }

  plusOne(product: Producto): Observable<Producto> {
    const urlToUpdate = `${this.baseUrl}/${product.id}`
    const updatedProduct = { ...product, cantidad: product.cantidad + 1 }

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
