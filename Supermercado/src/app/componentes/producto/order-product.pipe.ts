import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';

@Pipe({
  name: 'orderProduct'
})
export class OrderProductPipe implements PipeTransform {

  transform(products: Producto[], order: string): Producto[] {
    if (!products){return []}
    if(order=='ninguno'){return products}
    if (order == 'alfabeticamente'){
      return products.sort((a,b) => a.nombre.localeCompare(b.nombre))
    } else if (order == 'precioMin') {
      return products.sort((a,b) => {return a.precio - b.precio})
    } else if (order == 'precioMax') {
      return products.sort((a,b) => {return b.precio - a.precio})
    } else {
      return products.sort((a,b) => a.seccion.localeCompare(b.seccion))
    }
  }

}
