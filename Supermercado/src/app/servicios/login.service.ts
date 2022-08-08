import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users: User[] = []

  constructor(private angularFireAuth: AngularFireAuth, private userService: UserService) { }

  login(email: string, pw: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, pw);
  }

  registro(email: string, pw: string) {
    this.userService.getAll().subscribe(users => {
      this.users = users
    })
    const existingUser = this.users.find(user => user.email == email)
    if (!existingUser) {
      const newUser = {id: this.users.length, email: email, carrito:[]}
      this.userService.post(newUser).subscribe(user => console.log(user))
    }
    return this.angularFireAuth.createUserWithEmailAndPassword(email, pw);
  }

  logout() {
    return this.angularFireAuth.signOut();
  }
  
  comprobar() {
    return this.angularFireAuth.authState;
  }
}
