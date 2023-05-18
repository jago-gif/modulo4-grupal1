import { Empresa } from "./empresa.js";
import { Importacion } from "./importacion.js"
import { Producto } from "./producto.js"
//creacion manual de productos
let producto = new Producto("papa", 1000, 1);
let producto2 = new Producto("peras", 2000, 10);
let nuevaEmpresa;
//creacion de empresa
let empresa = new Empresa("EmpresaLinda", "11.111.111-1")
let empresas = [];
let importaciones = [];
empresas.push(empresa)
let productos = [producto, producto2]
//creacion de importacion
let importacion = new Importacion(productos, empresa.getId)
importaciones.push(importacion)
console.log(importacion)

let tablaEmpresas = document.getElementById('tablaEmpresas');
//carga tabla de empresas
function cargarEmpresas() {
  let empresasCarga = empresas;
  let contTablaEmpresa = "";
  for (let empresa of empresasCarga) {
    contTablaEmpresa += `
      <tr>
      <td>${empresa.getId}</td>
        <td>${empresa.getNombre()}</td>
        <td>${empresa.getRut()}</td>
      </tr>
    `;
  }
  tablaEmpresas.innerHTML = contTablaEmpresa
}


const tablaImportaciones = document.getElementById('tablaImportaciones');
//carga tabla de importaciones
function cargarImportaciones() {
  let contTablaImportaciones = '';
  for (let importacion of importaciones) {
    let precio = "";
    let nombre = "";
    let cantidad = "";
    let nombreEmpresa = empresa.buscarPorId(importacion._idEmpresa);

    let cantidadDeProductos = importacion.getProductos();
//si tiene mas de un producto es array y itera los productos que tiene
    if (Array.isArray(cantidadDeProductos)) {
      for (let producto of importacion.getProductos()) {
        precio += "" + producto.getPrecio() + "<br>"
        nombre += "" + producto.getNombre() + "<br>"
        cantidad += "" + producto.getCantidad() + "<br>"
      }
      contTablaImportaciones += `
        <tr>
        <td>${importacion.getId()}</td>
          <td>${nombreEmpresa}</td>
          <td>${cantidad}</td>
          <td>${nombre}</td>
          <td>${precio}</td>
        </tr>
      `;
    }
    //si no es array solo carga la info del producto
    else {
      precio += "" + cantidadDeProductos.getPrecio() + "<br>"
      nombre += "" + cantidadDeProductos.getNombre() + "<br>"
      cantidad += "" + cantidadDeProductos.getCantidad() + "<br>"
      contTablaImportaciones+= `
        <tr>
        <td>${importacion.getId()}</td>
          <td>${nombreEmpresa}</td>
          <td>${cantidad}</td>
          <td>${nombre}</td>
          <td>${precio}</td>
        </tr>
      `;
    }
    tablaImportaciones.innerHTML= contTablaImportaciones
  }


}
//metodo para crear una empresa desde el modal 
document.getElementById("agregarEmpresa").addEventListener("click", function (event) {
  event.preventDefault();
  let nombreEmpresa = document.getElementById("nombre").value;
  let rutEmpresa = document.getElementById("rut").value;
  nuevaEmpresa = new Empresa(nombreEmpresa, rutEmpresa)
  empresas.push(nuevaEmpresa);
  document.getElementById("formEmpresa").reset();
//recargar tabla
  cargarEmpresas();
  //cerrar modal
  $('#modalEmpresa').modal('hide');

})
//crear importacion desde modal
document.getElementById("agregarImportacion").addEventListener("click", function (event) {
  event.preventDefault();

  let idEmpresa = parseInt(document.getElementById("idEmpresas").value);
  let cantidad = parseInt(document.getElementById("cantidad").value);
  let nombreProducto = document.getElementById("nombreProducto").value;
  let valorProducto = parseInt(document.getElementById("valorProducto").value);



  let nuevoProducto = new Producto(nombreProducto, valorProducto, cantidad);
  let nuevaImportacion = new Importacion(nuevoProducto, idEmpresa)

  importaciones.push(nuevaImportacion)
  document.getElementById("formImportacion").reset();
//recarga la tabla de importaciones
  cargarImportaciones();
//cierra model
  $('#modalImportaciones').modal('hide');
  //carga metodo para ver los totales
  cargartotales();
})


//abrir modal empresa
$('#abrirModalEmpresa').click(function () {
  $('#modalEmpresa').modal('show');
});
let selectEmpresa;
//abrir modal importaciones
$('#abrirModalImportaciones').click(function () {
  //carga las empresas al selector de modal
  cargarEmpresasEnSelect();
  $('#modalImportaciones').modal('show');
});
//genera los options de select empresas
function cargarEmpresasEnSelect() {
  selectEmpresa = document.getElementById("idEmpresas");
  selectEmpresa.innerHTML = '';
  for (let empresa of empresas) {
    let option = document.createElement("option");
    option.value = empresa._id;
    option.text = empresa._nombre;
    selectEmpresa.add(option);
  }
}


const totalValor = document.getElementById("totalValor");
const totalImpFront = document.getElementById("totalImportaciones"); 
//genera el texto con los totales 
function cargartotales(){
  let contTV = "";
  let contTIF = "";
  contTV = `${importacion.totalImportaciones()}`;
  contTIF = `${importacion.calcularTotal()}`;
  totalValor.innerHTML = contTV;
  totalImpFront.innerHTML = contTIF;
}
cargarEmpresas();
cargarImportaciones();
cargartotales();
