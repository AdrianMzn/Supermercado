import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nombreUsuario: string | null | undefined = "";
  logueado: boolean = false;
  email: string = "";

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.comprobar().subscribe(data => {
      this.nombreUsuario = data?.email
      if (data) {
        this.logueado = true
      }
    })
  }

  // isLogged() {


  //   return this.logueado;
  // }

  logOut() {
    this.loginService.logout().then((data) => {
      /* alert('el usuario es: ' + this.nombreUsuario);
      alert('Sesión cerrada'); */
      this.logueado = false;
    }, (error) => {
      console.log(error);
      alert('No se pudo cerrar la sesión');
    });
  }

  routerLinkTo(component: string) {

  }
}
