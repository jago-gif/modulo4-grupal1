export class Producto{
  static contador = 0;
  constructor(nombre, precio, cantidad){
    this._id = Producto.contador++;
    this._nombre = nombre;
    this._precio = precio;
    this._cantidad= cantidad;
  }
  set setId(id){
    this._id = id;
  }
   getId(){
    return this._id;
  }

  set setNombre(nombre){
    this._nombre = nombre;
  }
   getNombre(){
    return this._nombre;
  }
  set setPrecio(precio){
    this._precio = precio;
  }

   getPrecio(){
    return this._precio;
  }

  set setCantidad(cantidad){
    this._cantidad = cantidad;
  }
   getCantidad(){
    return this._cantidad;
  }
  
}