const titulo = document.getElementById('titulo')
const form = document.getElementById('form')

form.onsubmit = (e) =>{
    e.preventDefault()
    const informacionArray = []
    for ( const input of e.target.children){
        const obj = {}
        obj ['tipo'] = input.name
        obj ['valor'] = input.value
        informacionArray.push(obj)
    }  
console.log(informacionArray)
localStorage.setItem('info',JSON.stringify(informacionArray))
}

const informacion = JSON.parse(localStorage.getItem('info'))

let nombre = ''
let apellido = ''
informacion.forEach(dato => {
   //TERNARIO
    dato.tipo==='name'?  nombre = dato.valor :
    apellido = dato.valor
})

console.log('name', nombre)
console.log('lastname', apellido)
if(nombre!=='' ||apellido!==''){
titulo.innerText = `Bienvenido ${nombre} ${apellido} a Instrumentos Aquelarre`
}



