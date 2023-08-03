//Simulacion de administrtacion de jugadores de un juego X

function generarID(){                                                   //Generacion de un id (identificador de cada jugador) a partir del id del Jugador registrado anteriormente
    let get = localStorage.getItem("jugadores"), aux = JSON.parse(get)
    if(get === null || aux.length == 0) return 1000001
    return ((aux[aux.length - 1].id) + 1)
}
class Jugador{                                                          //Objeto Jugador, con 4 propiedades
    constructor(nombre, pais){
        this.nombre = nombre
        this.pais = pais
        this.nivel = 0
        this.id = generarID()
    }
}

function agregarJugador(nombre, pais){                                  //Agrega un nuevo Jugador al final del array de jugadoresActivos
    const aux = new Jugador (nombre,pais)
    let aux1, get = localStorage.getItem("jugadores")
    if(get == null) aux1 = [aux]
    else {
        aux1 = JSON.parse(get)
        aux1.push(aux)
    }
    localStorage.setItem("jugadores",JSON.stringify(aux1))
}

function eliminarJugador(id){                                           //Elimina el Jugador del array por su id
    let pos, aux = JSON.parse(localStorage.getItem("jugadores")), i = 0
    let flag = true;
    while( i < aux.length && flag){                                             //Busca la posicion en el array del jugador que posee dicho id
        if(aux[i].id == id) {
            pos = i
            flag = false
        }
        i++
    }
    if(pos != undefined){
        aux.splice(pos, 1)
        localStorage.setItem("jugadores",JSON.stringify(aux))
    }
}

//Simulacion de calculo de nivel de un Jugador Y de un juego X.

function calculo(jug, gan){

    if(gan > 0){

        return ((gan * 2,5) / jug); 

    }

    return 0;
}

function actualizacionNivel(id, partidasJugadas, partidasGanadas, torneosJugados, torneosGanados){

    let pos, nivel
    let aux = JSON.parse(localStorage.getItem("jugadores"))

    for(let i = 0; i < aux.length ; i++){                     //Busca la posicion en el array del jugador que posee dicho id

        if(aux[i].id == id) pos = i

    }

    nivel = aux[pos].nivel


    if(nivel >= 0 && (partidasJugadas >= 0 && (partidasGanadas <= partidasJugadas && (partidasGanadas >= 0 && (torneosJugados >= 0 && (torneosGanados <= torneosGanados && torneosJugados >= 0)))))){
        
        nivel += (calculo(partidasJugadas, partidasGanadas) + (partidasJugadas/100))       //Calculo de nivel por partidas

        nivel += (calculo(torneosJugados, torneosGanados) + (partidasGanadas/100)) * 2,5   //Calculo de nivel por torneos

        if(nivel > 100) nivel = 100;

    aux[pos].nivel = nivel
    localStorage.setItem("jugadores",JSON.stringify(aux))
    }                                                        //Si no se cumple algunas de las condiciones, no se actualiza el nivel debido a que hay un error
}

let id = 1000002, pj = 200, pg = 120, tj = 50, tg = 30

//actualizacionNivel(id, pj, pg, tj, tg)                                    //Se actualiza el nivel del ultimo Jugador del array, con la nueva informacion de partidas y torneos                                                

//Agregar jugador:

let btnAgregarJugador = document.getElementById("nuevo-jugador-enviar")

btnAgregarJugador.addEventListener("click",nuevoJugador)

function nuevoJugador(){
    const nombre = document.getElementById("nuevo-jugador-nombre").value, pais = document.getElementById("nuevo-jugador-pais").value
    if(nombre == "") alert("Nombre sin completar")
    else if(pais == "") alert("Pais sin completar")
    else{
        agregarJugador(nombre, pais)
    }
}

//Eliminar Jugador:

let btnEliminarJugador = document.getElementById("eliminar-jugador-enviar")

btnEliminarJugador.addEventListener("click",borrarJugador)

function borrarJugador(){
    const id = document.getElementById("eliminar-jugador-id").value
    eliminarJugador(id)
}

//Buscar jugador:

let btnBuscarJugador = document.getElementById("buscar-amigos-enviar")

btnBuscarJugador.addEventListener("click",buscarJugador)

function buscarJugador(){
    let aux = JSON.parse(localStorage.getItem("jugadores")), nombre = document.getElementById("buscar-amigos").value, mostrar
    let flag = false
    for(let i = 0; i < aux.length ; i++){
        if(aux[i].nombre == nombre){
            flag = true
            mostrar = document.createElement("div")
            mostrar.className = 'boton-agregar-amigo'
            mostrar.innerHTML = "<h3>Nombre " + aux[i].nombre +"</h3> <h3>Nivel "+ aux[i].nivel +"</h3> <h3>Pais "+ aux[i].pais +"</h3> <button id='agregar-amigo'>Agregar amigo</button>"
            let divLista = document.getElementById("lista-busqueda")
            divLista.append(mostrar)
        }
    }
    let divBuscar = document.getElementById("busqueda")
    if(!flag){
        let aviso
        aviso = document.createElement("p")
        aviso.id = "aviso-no-coincidencia"
        aviso.innerText = "No se encontraron coincidencias"
        divBuscar.append(aviso)
    }
    let cancelar
    cancelar = document.createElement("button")
    cancelar.id = 'cancelar-busqueda'
    cancelar.innerText = "Salir"
    divBuscar.append(cancelar)
    cancelar.addEventListener("click",borrarBusqueda)
}

function borrarBusqueda(){
    let arrayBusqueda = document.querySelectorAll(".boton-agregar-amigo"), btnCancelar = document.getElementById("cancelar-busqueda"), aviso = document.getElementById("aviso-no-coincidencia")
    for(let i = 0 ; i < arrayBusqueda.length ; i++){
        arrayBusqueda[i].remove()
    }
    aviso.remove()
    btnCancelar.remove()
}

let btnAgregarAmigo = document.getElementById("agregar-amigo")

btnAgregarAmigo.addEventListener("click",agregarAmigo)

function agregarAmigo(){

}



