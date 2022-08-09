import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  logueado: boolean = false;
  registro: boolean = false;
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, private loginService: LoginService) { }
  
  iniciarSesion() {
    this.loginService.login(this.email, this.password).then(
      (data) => {
        console.log('Sesión iniciada');
        this.logueado = true;
        this.router.navigateByUrl('productos');
      },
      (error) => {
        console.log(error);
        alert('Usuario no encontrado');
      }
    );
  }

  registrar() {
    if (this.password == this.confirmPassword) {
      this.loginService.registro(this.email, this.password).then(
        (data) => {
          alert('Usuario registrado');
          this.router.navigateByUrl('productos');
        },
        (error) => {
          console.log(error); // tb error.message
          alert('No se ha podido iniciar sesión. Compruebe los datos introducidos.');
        }
      );
    } else {
      alert('El password y la confirmación no coinciden');
    }
  }

  logOut(){
    this.loginService.logout().then((data) => {
        alert('Sesión cerrada');
        this.logueado = false;
      }, (error) => {
        console.log(error);
        alert('No se pudo cerrar la sesión');
      }
    );
  }

  ngOnInit(): void {
  }

}
