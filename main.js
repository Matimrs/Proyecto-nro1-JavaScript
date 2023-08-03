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
    const aux = new Jugador (nombre,pais), get = localStorage.getItem("jugadores")
    let aux1
    if(get == null) aux1 = [aux]
    else {
        aux1 = JSON.parse(get)
        aux1.push(aux)
    }
    localStorage.setItem("jugadores",JSON.stringify(aux1))
}

function eliminarJugador(id){                                           //Elimina el Jugador del array por su id
    let pos, aux = JSON.parse(localStorage.getItem("jugadores"))

    for(let i = 0; i < aux.length ; i++){                               //Busca la posicion en el array del jugador que posee dicho id
        if(aux[i].id == id) pos = i
    }

    aux.splice(pos, 1)
    localStorage.setItem("jugadores",JSON.stringify(aux))
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


let btnAgregarJugador = document.getElementById("nuevo-jugador-enviar")

btnAgregarJugador.addEventListener("click",nuevoJugador)

function nuevoJugador(){
    const nombre = document.getElementById("nuevo-jugador-nombre").value, pais = document.getElementById("nuevo-jugador-pais").value
    agregarJugador(nombre, pais)
}


let btnEliminarJugador = document.getElementById("eliminar-jugador-enviar")

btnEliminarJugador.addEventListener("click",borrarJugador)

function borrarJugador(){
    const id = document.getElementById("eliminar-jugador-id").value
    eliminarJugador(id)
}





