import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  nombre: string = ''
  apellidos: string = ''
  direccion: string = ''
  telefono: number = 0
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log('submitted')
  }
}
