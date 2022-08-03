export class Producto {

    constructor(
        public id: number,
        public seccion: string,
        public nombre: string,
        public precio: number,
        public descripcion?: string,
        public imagen?: string,
    ) { }
}