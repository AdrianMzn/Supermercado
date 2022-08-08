import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductsService } from 'src/app/servicios/productos.service';
import { CartService } from 'src/app/servicios/carrito.service';

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


  constructor(private prodService: ProductsService, private cartService: CartService) { }

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
      console.log(this.categorias);
    });
    
  }

  
  addProducto(producto: Producto){
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

    let categoria = (<HTMLInputElement>document.getElementById("categoriaSelect")).value;
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
    }
  }

}



