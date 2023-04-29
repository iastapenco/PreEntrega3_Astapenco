class Articulo {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

const articulos = [
    new Articulo("Pantalón jeans", 2000),
    new Articulo("Pantalón de vestir", 2500),
    new Articulo("Remera", 900),
    new Articulo("Buzo", 1200),
    new Articulo("Camisa", 1600),
    new Articulo("Medias", 300),
]

const articulosSeleccionados = inicializarArticulosSeleccionados();
const descuentosFinales = [];
let descuentoTotal = 0;
let preciosSinDescuento = 0;
function inicializarArticulosSeleccionados() {
    const articulosStorage = localStorage.getItem("articulos_seleccionados");
    const articulosParsed = JSON.parse(articulosStorage);
    if(articulosParsed != null && articulosParsed.length > 2){localStorage.removeItem("articulos_seleccionados")}
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
    agregarAListaDeSeleccionados(articulo1)
    const calcularDescuento = articulosSeleccionados.length == 3 ? true : false;
    if (calcularDescuento) {
        obtenerPrecio();
        document.getElementById("modal-calculadora").innerText = `El descuento total será $ ${descuentoTotal} y el pago total $ ${preciosSinDescuento - descuentoTotal}`
        var modal1 = new bootstrap.Modal(document.getElementById('modal'));
        modal1.toggle();
        localStorage.removeItem("articulos_seleccionados");
        setTimeout(() => {
            document.getElementById("lista_articulos").innerHTML = "";
        }, 3000);
    }
}

function agregarAListaDeSeleccionados(articulo) {
    const li = document.createElement("li");
    li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-start");
    
    const div = document.createElement("div");
    div.setAttribute("class", "ms-2 me-auto");

    const divBold = document.createElement("div");
    divBold.setAttribute("class", "fw-bold");

    divBold.textContent = articulo.nombre;
    
    div.appendChild(divBold);
    div.appendChild(document.createTextNode(`$ ${articulo.precio}`)) ;
    li.appendChild(div);
    
    const ol = document.getElementById("lista_articulos");

    ol.appendChild(li);
}
function agregadoCorrectamente(botonId) {
    document.getElementById(botonId).setAttribute("class", "btn btn-success btn-lg");
    setTimeout(() => {
        document.getElementById(botonId).setAttribute("class", "btn btn-primary btn-lg");
    }, 1000);
}
document.getElementById("btn-jeans").addEventListener("click", () => {
    obtenerArticulo("Pantalón jeans");
    agregadoCorrectamente("btn-jeans");
})

document.getElementById("btn-vestir").addEventListener("click", () => {
    obtenerArticulo("Pantalón de vestir");
    agregadoCorrectamente("btn-vestir");
})

document.getElementById("btn-remera").addEventListener("click", () => {
    obtenerArticulo("Remera");
    agregadoCorrectamente("btn-remera");
})

document.getElementById("btn-buzo").addEventListener("click", () => {
    obtenerArticulo("Buzo");
    agregadoCorrectamente("btn-buzo");
})

document.getElementById("btn-camisa").addEventListener("click", () => {
    obtenerArticulo("Camisa");
    agregadoCorrectamente("btn-camisa");
})

document.getElementById("btn-medias").addEventListener("click", () => {
    obtenerArticulo("Medias");
    agregadoCorrectamente("btn-medias");
})

articulosSeleccionados.forEach(element => {
    agregarAListaDeSeleccionados(element);
});

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

