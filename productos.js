const productos = []
const carrito = []


const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
// const precioTotal = document.getElementById('precioTotal')
// const cantidad = document.getElementById('cantidad')


class Instrumento{
    constructor(id, nombre, precio, cantidad, img){
        this.id = id
        this.nombre= nombre
        this.precio = precio
        this.cantidad = cantidad
        this.img = img
    }

    listadoInstrumentos(){
        const card  = `
            <div class="card">
                <img src=${this.img} alt="parches"  width="150" height="150"/>
                <h4>${this.nombre}</h4>
                <p>${this.precio}</p>
                <button id=${this.id} class="btnAgregar">Comprar</button>
            </div>
        `
        const container = document.getElementById('container')
        container.innerHTML += card
    }
    agregarEvento(){
        const comprar = document.getElementById(this.id)
        console.log(this.id)
        const productoElegido = productos.find(product => product.id == this.id)
        comprar.addEventListener('click', () => agregarCarrito(productoElegido))
        // console.log(comprar)
    }
}

let bongo = new Instrumento( '001', 'bongo', 21643, 1,'../imagenes/bongod.jpg')
let guitarra = new Instrumento('002', 'guitarra', 112889, 1, '../imagenes/guitarra.jpg') 
let saxo = new Instrumento('003', 'saxo', 134152, 1, '../imagenes/Saxo.jpg')
let bateria = new Instrumento('004', 'bateria', 203488, 1, '../imagenes/bateri.jpg')
let correas = new Instrumento('005', 'correas',3899 , 1, '../imagenes/correas.jpg')
let palillos = new Instrumento('006', 'palillos', 2209, 1, '../imagenes/palillos.jpg')
let parches = new Instrumento('007', 'parches', 5316, 1, '../imagenes/parchesa.jpg')
let puas = new Instrumento('008', 'puas', 590, 1, '../imagenes/puas.jpg')

productos.push(bongo, guitarra, saxo, bateria, correas, palillos, parches, puas)

console.log(productos)

productos.forEach(e => {
    e.listadoInstrumentos()
})
productos.forEach(e => {
    e.agregarEvento()
})

function agregarCarrito(producto) {
    const enCarrito = carrito.find(prod => prod.id == producto.id)
    if(!enCarrito){
        carrito.push({...producto, cantidad: 1}) //SPREAD
     } else {
        const carritoFiltrado = carrito.filter(prod => prod.id != producto.id)
        carrito = [
            ...carritoFiltrado, //SPREAD
            { ...enCarrito, cantidad: enCarrito.cantidad ++}//SPREAD Y OPERADOR++
        ]
    }
    carritoActual()
    // contador.innerHTML = carrito.reduce((acc, prod) => acc + prod.cantidad, 0)   
}

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    carritoActual()
})

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    carritoActual() 
    console.log(carrito)
}

const carritoActual= () => {
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)
        localStorage.setItem('carrito', JSON.stringify(carrito))
})
contadorCarrito.innerText = carrito.length 
console.log(carrito)
precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}

// contadorCarrito.innerHTML = carrito.reduce((acc, prod) => acc + prod.cantidad, 0)

const terminarCompra =document.getElementById('terminarCompra')

terminarCompra.onclick = () => {
    let totalCompra = 0
    carrito.forEach((prod)=>{
        totalCompra = totalCompra + prod.precio
    })
    swal.fire({
        title:'EL VALOR DE SU COMPRA ES:',
        text: `${'$'+totalCompra}`,
        timer:9000,
    })
}

// Acceso condicional a un objeto
console.log(productos[3]?.nombre || 'instrumento no existente')

const btnReparacion = document.getElementById('btnReparacion')
const lista = document.getElementById('luthiers')

btnReparacion.onclick = () => {
    fetch('https://rickandmortyapi.com/api/character')
    .then(response=> response.json())
    .then(info=>{
        const luthiers = info.results
        luthiers.splice(8)
        lista.innerHTML = ''
        luthiers.forEach(luthier => {
            const li = document.createElement('li')
            li.innerHTML = `<h3>${luthier.name}</h3>
                            <p>${luthier.species}</p>`
                lista.append(li)                     
            })
            })
}

