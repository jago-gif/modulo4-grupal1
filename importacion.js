export class Importacion {
  static contador = 0;
  static totalProductos = [];
  constructor(productos, idEmpresa){
    this._id = Importacion.contador++;
    this._productos = productos||[];
    this._idEmpresa = idEmpresa;
    Importacion.totalProductos.push(this._productos);
  }
  set setId(id){
    this._id = id;
  }

   getId(){
    return this._id;
  }
  set setIdEmpresa(idEmpresa){
    this._idEmpresa = idEmpresa;
  }

  get getIdEmpresa(){
    return this._idEmpresa;
  }

  set setProductos(productos){
    this._productos.push(productos)
  }
   getProductos(){
    return this._productos
  }
  //usamos el contador como lo que pide el ejercicio que es el total de importaciones
  totalImportaciones(){
    return Importacion.contador
  }
  calcularTotal() {
    let total = 0;
    for(let i = 0; i<Importacion.totalProductos.length; i++){
      if(Array.isArray(Importacion.totalProductos[i])){
        for(let z =0; z<Importacion.totalProductos[i].length;z++){
          let valor = Importacion.totalProductos[i][z]._precio
          let cantidad = Importacion.totalProductos[i][z]._cantidad
          let subTotal =  valor* cantidad
          total += subTotal;
        }
      }else{
        let valor = Importacion.totalProductos[i]._precio
          let cantidad = Importacion.totalProductos[i]._cantidad
          let subTotal =  valor* cantidad
          total += subTotal;
      }
      
      
    }
    return total;
  }
}
