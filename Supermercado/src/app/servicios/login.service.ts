import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  login(email: string, pw: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, pw);
  }

  registro(email: string, pw: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, pw);
  }

  logout() {
    return this.angularFireAuth.signOut();
  }
  
  comprobar() {
    return this.angularFireAuth.authState;
  }
}
