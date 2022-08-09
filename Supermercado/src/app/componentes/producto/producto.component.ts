import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductsService } from 'src/app/servicios/productos.service';
import { CartService } from 'src/app/servicios/carrito.service';
import { LoginService } from 'src/app/servicios/login.service';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})

export class ProductoComponent implements OnInit {
  productos: Producto[] = [];
  categorias: string[] = [];
  productosCarrito: Producto[] = [];
  orderTypeValue: string = "";
  searchFilter: string = ''
  loggedUser: string | null | undefined = ''
  selectedOption: string = ''
  categoria: string = ''
  order: string = ''
  selectedOrder: string = ''


  constructor(private prodService: ProductsService, private cartService: CartService, private loginService:LoginService, private userService: UserService) { }

  ngOnInit(): void {
    this.prodService.getAll().subscribe((productos) => {
      this.productos = productos;

      //el ! le dice al comilador que estamos seguro de que selectCategorias es seguro no null
      var selectCategorias = document.getElementById('categoriaSelect')! 

      for (let producto of this.productos) {
        if( !this.categorias.includes(producto.seccion) ){
          this.categorias.push(producto.seccion);
          var opt = document.createElement('option');
          opt.value = producto.seccion;
          opt.innerHTML = producto.seccion;
          selectCategorias.appendChild(opt);
        }
      }
      //console.log(this.categorias);
    });
    
  }

  selectCategory(){
    this.categoria = this.selectedOption
  }

  selectOrder(){
    this.order = this.selectedOrder
    console.log(this.order)
  }

  
  addProducto(producto: Producto){
    this.loginService.comprobar().subscribe(data => {
      this.loggedUser = data?.email

      if (this.loggedUser){
        this.cartService.getAllFromUser().subscribe(users => {
          let user = users.find(user => user.email == this.loggedUser)
          let userID = user ? user.id : 0
          this.productosCarrito = users[userID].carrito
  
          const productoExiste: Producto | undefined = this.productosCarrito.find(p => producto.nombre == p.nombre)
  
          if (productoExiste) {
            const updatedProduct = { ...productoExiste, cantidad: productoExiste.cantidad + 1 }
            user!.carrito = user!.carrito.map(prod => prod.id == updatedProduct.id ? updatedProduct : prod)
            this.productosCarrito = this.productosCarrito.map(p1 => (updatedProduct.nombre == p1.nombre ? updatedProduct : p1))
            this.userService.put(user!).subscribe((user) => (console.log(user)))
            
          } else {
            const nuevoProducto = {
              ...producto, cantidad: 1
            }
            user!.carrito.push(nuevoProducto)
            this.cartService.addToUser(user!).subscribe((user) => (console.log(user)))
            
          }
        })
       } else {
        this.cartService.getAllFromGuest().subscribe((devuelveprod) => (this.productosCarrito = devuelveprod))
  
        const productoExiste: Producto|undefined= this.productosCarrito.find(p => producto.nombre==p.nombre)
  
      if(productoExiste){
        this.cartService.plusOne(productoExiste).subscribe((prodActual) => (
          this.productosCarrito = this.productosCarrito.map(p1 => (prodActual.nombre==p1.nombre? prodActual: p1))
        ))
      }else{
        const nuevoProducto={
          ...producto,cantidad:1
        }
        this.cartService.add(nuevoProducto).subscribe((prod) => (this.productosCarrito.push(prod)))
      }  
      }
    })
  }

/*   addProductoID(productoId: number){
    let producto: Producto = this.productos.filter(producto => (producto.id == productoId ) )[0];

    this.cartService.getAll().subscribe((devuelveprod) => (this.productosCarrito = devuelveprod))
    const productoExiste: Producto|undefined= this.productosCarrito.find(p => producto.nombre==p.nombre)
    if(productoExiste){
      this.cartService.plusOne(productoExiste).subscribe((prodActual) => (
        this.productosCarrito = this.productosCarrito.map(p1 => (prodActual.nombre==p1.nombre? prodActual: p1))
      ))
    }else{
      const nuevoProducto={
        ...producto,cantidad:1
      }
      this.cartService.add(nuevoProducto).subscribe((prod) => (this.productosCarrito.push(prod)))
    }
  }

 */
  getColor(seccion: string){
    if(seccion == 'frutas'){
      return 'mediumseagreen';
    }

    else if( seccion == 'carnes'){
      return 'khaki';
    }

    else if( seccion == 'pescado'){
      return 'cadetblue';
    }

    return '';
      
  }

  compareAlf( a: Producto, b: Producto ) {
    if ( a.nombre < b.nombre ){
      return -1;
    }
    if ( a.nombre > b.nombre ){
      return 1;
    }
    return 0;
  }

  comparePrecMin( a: Producto, b: Producto ) {
    if ( a.precio < b.precio ){
      return -1;
    }
    if ( a.precio > b.precio ){
      return 1;
    }
    return 0;
  }

  comparePrecMax( a: Producto, b: Producto ) {
    if ( a.precio < b.precio ){
      return 1;
    }
    if ( a.precio > b.precio ){
      return -1;
    }
    return 0;
  }

  compareCat( a: Producto, b: Producto ) {
    if ( a.seccion < b.seccion ){
      return -1;
    }
    if ( a.seccion > b.seccion ){
      return 1;
    }
    return 0;
  }

  filterProductos(){
    console.log('nothing')

/*     let categoria = (<HTMLInputElement>document.getElementById("categoriaSelect")).value;
    this.orderTypeValue = (<HTMLInputElement>document.getElementById("ordenSelect")).value;

    let productosFilted = this.productos.filter(producto => (producto.seccion == categoria) || categoria == "undefined");

    console.log(this.orderTypeValue)
    switch (this.orderTypeValue) {
      case 'alfabeticamente':
        productosFilted = productosFilted.sort( this.compareAlf );
        break;

      case 'precioMin':
        productosFilted = productosFilted.sort( this.comparePrecMin );
        break;

      case 'precioMax':
        productosFilted = productosFilted.sort( this.comparePrecMax );
        break;

      case 'porCategoria':
        productosFilted = productosFilted.sort( this.compareCat );
        break;

      default:
        break;
    }



    let listaProductos = document.getElementById("listaProductos")!
    listaProductos.innerHTML = "";
    for (let producto of productosFilted) {
      
      let divTarjetaProducto = document.createElement("div");
      //divTarjetaProducto.classList.add("tarjetaProducto");
      //divTarjetaProducto.classList.add("center");
      divTarjetaProducto.style.width = "300px";
      divTarjetaProducto.style.margin = "20px";
      divTarjetaProducto.style.borderRadius = "20%";
      divTarjetaProducto.style.borderWidth = "5px";
      divTarjetaProducto.style.borderStyle = "solid";
      divTarjetaProducto.style.borderColor = this.getColor(producto.seccion);
      divTarjetaProducto.style.justifyContent = "center";
      divTarjetaProducto.style.alignContent = "center";
      divTarjetaProducto.style.textAlign = "center";
      
      let divItem = document.createElement("div");
      divItem.classList.add("item");

      let productoHTML = 
                "<h2>" + producto.nombre +"</h2>" +
                "<img id='imgProducto' style='width: 250px; height: 250px;' src='assets/" + producto.seccion + ".jpg'/>" +
                "<div>" +
                    "Identificador: " + producto.id +
                "</div>" +

                "<div>" + 
                    "Seccion: " + producto.seccion +
                "</div>" +

                "<div>" +
                    "Precio: " + producto.precio +
                "</div>" +

                "<button id='addProduct' (click)='addProductoID('" + producto.id + "')' style='margin-top:20px; margin-bottom:10px;'>Añadir " +
                    "producto" +
                "</button>";
      
      divItem.innerHTML = productoHTML;
      divTarjetaProducto.appendChild(divItem);
      listaProductos.appendChild(divTarjetaProducto);
    } */
  }

}



