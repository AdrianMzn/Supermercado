import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
@Pipe({
  name: 'categoryProduct'
})
export class CategoryProductPipe implements PipeTransform {

  transform(products: Producto[], category: string): Producto[] {
    if (!products){return []}
    if(category == 'todas' || !category){return products}
    return products.filter(product => product.seccion == category)
  }

}
