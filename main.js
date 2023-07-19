/*  Anotaciones

function Nivel(nA, pG, pJ, tG, tJ, nF){
    this.nivelActual = nA
    this.partidasGanadas = pG
    this.partidasJugadas = pJ
    this.torneosGanados = tG
    this.torneosJugados = tJ
    this.nivelFinal = nF
}

class Nivel{
    constructor(nA, pG, pJ, tG, tJ, nF){
        this.nivelActual = nA
        this.partidasGanadas = pG
        this.partidasJugadas = pJ
        this.torneosGanados = tG
        this.torneosJugados = tJ
        this.nivelFinal = nF
    }
    metodo(){}
}

const level = new Nivel (nivelActual, partidasGanadas, partidasJugadas, torneosGanados, torneosJugados, nivelFinal)

*/



//Simulacion de administrtacion de jugadores de un juego X

let jugadoresActivos = []                                   //Array que contiene los jugadores, inicializado en vacio

function generarID(){                                       //Generacion de un id (identificador de cada jugador) a partir del id del Jugador registrado anteriormente
    if(jugadoresActivos.length == 0){
        return 1000001
    }
    return ((jugadoresActivos[jugadoresActivos.length - 1].id) + 1)
}
class Jugador{                                              //Objeto Jugador, con 4 propiedades
    constructor(nombre, pais){
        this.nombre = nombre
        this.pais = pais
        this.nivel = 0
        this.id = generarID()
    }
}

function agregarJugador(nombre, pais){                      //Agrega un nuevo Jugador al final del array de jugadoresActivos
    const aux = new Jugador (nombre,pais)
    jugadoresActivos.push(aux)
}

function eliminarJugador(id){                               //Elimina el Jugador del array por su id
    let pos

    for(let i = 0; i < jugadoresActivos.length ; i++){      //Busca la posicion en el array del jugador que posee dicho id

        if(jugadoresActivos[i].id == id) pos = i
    }

    if(pos != jugadoresActivos.length) jugadoresActivos.splice(pos, 1)
}

agregarJugador("Matias","Argentina")                        //Se agrega Jugador ingresando su nombre y pais: agregarJugador(nombre,pais)
agregarJugador("Lucas","Argentina")
agregarJugador("Joao","Brasil")
agregarJugador("Ivan","Argentina")


eliminarJugador(1000001)                                    //Se elimina Jugador pasando un id a la funcion: eliminarJugador(id)

console.table(jugadoresActivos)


//Simulacion de calculo de nivel de un Jugador Y de un juego X.

function calculo(jug, gan){

    if(gan > 0){

        return ((gan * 2,5) / jug); 

    }

    return 0;
}

function actualizacionNivel(id, partidasJugadas, partidasGanadas, torneosJugados, torneosGanados){

    let pos, nivel

    for(let i = 0; i < jugadoresActivos.length ; i++){                     //Busca la posicion en el array del jugador que posee dicho id

        if(jugadoresActivos[i].id == id) pos = i

    }

    nivel = jugadoresActivos[pos].nivel


    if(nivel >= 0 && (partidasJugadas >= 0 && (partidasGanadas <= partidasJugadas && (partidasGanadas >= 0 && (torneosJugados >= 0 && (torneosGanados <= torneosGanados && torneosJugados >= 0)))))){
        
        nivel += (calculo(partidasJugadas, partidasGanadas) + (partidasJugadas/100))       //Calculo de nivel por partidas

        nivel += (calculo(torneosJugados, torneosGanados) + (partidasGanadas/100)) * 2,5   //Calculo de nivel por torneos

        if(nivel > 100) nivel = 100;

    jugadoresActivos[pos].nivel = nivel

    }                                                        //Si no se cumple algunas de las condiciones, no se actualiza el nivel debido a que hay un error
}

let id = jugadoresActivos[jugadoresActivos.length - 1].id, pj = 200, pg = 120, tj = 50, tg = 30

actualizacionNivel(id, pj, pg, tj, tg)                       //Se actualiza el nivel del ultimo Jugador del array, con la nueva informacion de partidas y torneos                                                

agregarJugador("Mateo","Chile")

console.table(jugadoresActivos)




