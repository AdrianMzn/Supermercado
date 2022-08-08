import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { Componente1Component } from './componente/componente1/componente1.component';
import { Componente2Component } from './componente/componente2/componente2.component';
import { Componente3Component } from './componente/componente3/componente3.component';
import { HeaderComponent } from './componentes/header/header.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { CarritoItemComponent } from './componentes/carrito-item/carrito-item.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { SpamComponent } from './componentes/spam/spam.component';
import { CheckoutComponent } from './componentes/checkout/checkout.component';

const misRutas: Routes = [
  { path: 'c1', component: Componente1Component },
  { path: 'c2', component: Componente2Component },
  { path: 'c3', component: Componente3Component },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'productos', component: ProductoComponent },
  { path: 'checkout', component: CheckoutComponent},

  {path: '', redirectTo: 'home', pathMatch: 'full'},  // si no hay ruta va a home
];

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    Componente1Component,
    Componente2Component,
    Componente3Component,
    HeaderComponent,
    NavbarComponent,
    CarritoComponent,
    CarritoItemComponent,
    HomeComponent,
    LoginComponent,
    SpamComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(misRutas),HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
