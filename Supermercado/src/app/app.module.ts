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
import { ProductoPipe } from './componentes/producto/producto.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './componentes/footer/footer.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { CategoryProductPipe } from './componentes/producto/category-product.pipe';
import { OrderProductPipe } from './componentes/producto/order-product.pipe';
import { ContactoComponent } from './componentes/contacto/contacto.component';

const misRutas: Routes = [
  { path: 'c1', component: Componente1Component },
  { path: 'c2', component: Componente2Component },
  { path: 'c3', component: Componente3Component },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'productos', component: ProductoComponent },
  { path: 'checkout', component: CheckoutComponent},
  { path: 'contacto', component: ContactoComponent},

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
    CheckoutComponent,
    ProductoPipe,
    FooterComponent,
    CategoryProductPipe,
    OrderProductPipe,
    ContactoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(misRutas),
    HttpClientModule, 
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  providers: [AngularFireAuthModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
