class Articulo {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

const articulos = [
    new Articulo("pantalón jeans", 2000),
    new Articulo("pantalón de vestir", 2500),
    new Articulo("remera", 900),
    new Articulo("buzo", 1200),
    new Articulo("camisa", 1600),
    new Articulo("medias", 300),
]

const articulosSeleccionados = inicializarArticulosSeleccionados();
const descuentosFinales = [];
let descuentoTotal = 0;
let preciosSinDescuento = 0;
function inicializarArticulosSeleccionados() {
    const articulosStorage = localStorage.getItem("articulos_seleccionados");
    const articulosParsed = JSON.parse(articulosStorage);
    return articulosParsed != null ? articulosParsed : [] ;
    
};

function añadirArticulo(x) {
    articulosSeleccionados.push(x);
    const articulosStorage = JSON.stringify(articulosSeleccionados);
    localStorage.setItem("articulos_seleccionados", articulosStorage);
};

function obtenerArticulo(nombreArticulo) {
    const articulo1 = articulos.find(articulo => articulo.nombre == nombreArticulo);
    añadirArticulo(articulo1);
    const calcularDescuento = articulosSeleccionados.length == 3 ? true : false;
    if (calcularDescuento) {
        obtenerPrecio();
        document.getElementById("modal-calculadora").innerText = `El descuento total será $ ${descuentoTotal} y el pago total $ ${preciosSinDescuento - descuentoTotal}`
        var modal1 = new bootstrap.Modal(document.getElementById('modal'));
        modal1.toggle();
        localStorage.removeItem("articulos_seleccionados")
    }
}

document.getElementById("btn-jeans").addEventListener("click", () => {
    obtenerArticulo("pantalón jeans");
    document.getElementById("btn-jeans").setAttribute("class", "btn btn-success btn-lg");
})

document.getElementById("btn-vestir").addEventListener("click", () => {
    obtenerArticulo("pantalón de vestir");
    document.getElementById("btn-vestir").setAttribute("class", "btn btn-success btn-lg");
})

document.getElementById("btn-remera").addEventListener("click", () => {
    obtenerArticulo("remera");
    document.getElementById("btn-remera").setAttribute("class", "btn btn-success btn-lg");
})

document.getElementById("btn-buzo").addEventListener("click", () => {
    obtenerArticulo("buzo");
    document.getElementById("btn-buzo").setAttribute("class", "btn btn-success btn-lg");
})

document.getElementById("btn-camisa").addEventListener("click", () => {
    obtenerArticulo("camisa");
    document.getElementById("btn-camisa").setAttribute("class", "btn btn-success btn-lg");
})

document.getElementById("btn-medias").addEventListener("click", () => {
    obtenerArticulo("medias");
    document.getElementById("btn-medias").setAttribute("class", "btn btn-success btn-lg");
})


console.log(articulosSeleccionados);


const obtenerPrecio = () => {
    const preciosSeleccionados = articulosSeleccionados.map(art => art.precio);
    console.log(preciosSeleccionados);
    preciosSeleccionados.forEach((art, i) => {
        let descuentos = 0;
        descuentos += Math.round(0.1 * (i + 1) * art);
        descuentosFinales.push(descuentos);
    });

    descuentosFinales.forEach((descuento) => {

        descuentoTotal += descuento;
    })

    preciosSeleccionados.forEach((precio) => {
        preciosSinDescuento += (precio);
    })
}

console.log(descuentosFinales);

