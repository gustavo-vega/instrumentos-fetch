const productos = []
const carrito = []

class Instrumento{
    constructor(id, nombre, precio, img){
        this.id = id
        this.nombre= nombre
        this.precio = precio
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

let bongo = new Instrumento( '001', 'bongo', 21643,'../imagenes/bongod.jpg')
let guitarra = new Instrumento('002', 'guitarra', 112889, '../imagenes/guitarra.jpg') 
let saxo = new Instrumento('003', 'saxo', 134152, '../imagenes/Saxo.jpg')
let bateria = new Instrumento('004', 'bateria', 203488, '../imagenes/bateri.jpg')
let correas = new Instrumento('005', 'correas',3899 , '../imagenes/correas.jpg')
let palillos = new Instrumento('006', 'palillos', 2209, '../imagenes/palillos.jpg')
let parches = new Instrumento('007', 'parches', 5316, '../imagenes/parchesa.jpg')
let puas = new Instrumento('008', 'puas', 590, '../imagenes/puas.jpg')

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
    contador.innerHTML = carrito.reduce((acc, prod) => acc + prod.cantidad, 0)   
}

const contador = document.getElementById('cardCounter')
contador.innerHTML = carrito.reduce((acc, prod) => acc + prod.cantidad, 0)

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
        luthiers.splice(6)
        lista.innerHTML = ''
        luthiers.forEach(luthier => {
            const li = document.createElement('li')
            li.innerHTML = `<h3>${luthier.name}</h3>
                                     <p>${luthier.species}</p>`
                lista.append(li)                     
              })
    })
}