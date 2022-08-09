import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:4230/users'

  constructor(private http:HttpClient) { }

  getAll() {
    return this.http.get<User[]>(this.baseUrl)
  }

  getUser(id: number | undefined){
    return this.http.get<User>(`${this.baseUrl}/${id}`)
  }

  post(user:User){
    return this.http.post<User>(this.baseUrl, user)
  }

  put(user:User){
    const urlToUpdate = `${this.baseUrl}/${user.id}`
    return this.http.put<User>(urlToUpdate, user)
  }

}
