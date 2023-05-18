import { Empresa } from "./empresa.js";
import { Importacion } from "./importacion.js"
import { Producto } from "./producto.js"

let producto = new Producto("papa", 1000, 1);
let producto2 = new Producto("peras", 2000, 10);
let nuevaEmpresa;
let empresa = new Empresa("EmpresaLinda", "11.111.111-1")
let empresas = [];
let importaciones = [];
empresas.push(empresa)
let productos = [producto, producto2]
let importacion = new Importacion(productos, empresa.getId)
importaciones.push(importacion)
console.log(importacion)

let tablaEmpresas = document.getElementById('tablaEmpresas');
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

function cargarImportaciones() {
  let contTablaImportaciones = '';
  for (let importacion of importaciones) {
    let precio = "";
    let nombre = "";
    let cantidad = "";
    let nombreEmpresa = empresa.buscarPorId(importacion._idEmpresa);

    let cantidadDeProductos = importacion.getProductos();

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
document.getElementById("agregarEmpresa").addEventListener("click", function (event) {
  event.preventDefault();
  let nombreEmpresa = document.getElementById("nombre").value;
  let rutEmpresa = document.getElementById("rut").value;
  nuevaEmpresa = new Empresa(nombreEmpresa, rutEmpresa)
  empresas.push(nuevaEmpresa);
  document.getElementById("formEmpresa").reset();

  cargarEmpresas();
  $('#modalEmpresa').modal('hide');

})
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

  cargarImportaciones();
  $('#modalImportaciones').modal('hide');
  cargartotales();
})



$('#abrirModalEmpresa').click(function () {
  $('#modalEmpresa').modal('show');
});
let selectEmpresa;

$('#abrirModalImportaciones').click(function () {
  cargarEmpresasEnSelect();
  $('#modalImportaciones').modal('show');
});

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
