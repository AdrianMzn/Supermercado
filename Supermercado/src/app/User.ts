import { Producto } from "./models/producto.model"

export interface User {
    id: number,
    email: string, 
    carrito: Producto[]
}