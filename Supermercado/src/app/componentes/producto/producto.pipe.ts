import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';

@Pipe({
  name: 'productFilter'
})
export class ProductoPipe implements PipeTransform {

  transform(products: Producto[], searchFilter: string): Producto[] {
    if (!products){return []}
    if(!searchFilter){return products}
    searchFilter = searchFilter.toLocaleLowerCase()
    return products.filter(product => product.nombre.toLocaleLowerCase().includes(searchFilter))
  }

}
