export class Empresa {
  static contador = 0;
  static empresas = [];
  constructor(nombre, rut){
    this._id = Empresa.contador++;
    this._nombre = nombre;
    this._rut = rut;
    Empresa.empresas.push(this);
  }
  set setId(id){
    this._id = id;
  }
  get getId(){
    return this._id;
  }
  
 set setNombre(nombre){
    this._nombre = nombre;    
  }
   getNombre(){
    return this._nombre;
  }

  set setRut(rut){
    this._rut = rut
  }

   getRut(){
    return this._rut
  }
  generarArray(){
    return Empresa.empresas
  }
  buscarPorId(id){
    for(let i = 0; i < Empresa.empresas.length; i++){
      if(Empresa.empresas[i]._id===id){
        return Empresa.empresas[i]._nombre
      }
    }
  }
  
  
}

