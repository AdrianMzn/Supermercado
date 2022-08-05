import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nombreUsuario: string = "Jose";
  logeado: boolean = true;
  
  constructor() { 

  }

  ngOnInit(): void {
  }

  isLogged(){

    return this.logeado;
  }

}
