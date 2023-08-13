//Simulacion de administrtacion de jugadores de un juego X

function generarID(){                                                           //Generacion de un id (identificador de cada jugador) a partir del id del Jugador registrado anteriormente
    let get = localStorage.getItem("jugadores"), aux = JSON.parse(get)
    if((get === null) || (aux.length == 0)) return 1000001
    return ((aux[aux.length - 1].id) + 1)
}
class Jugador{                                                                  //Objeto Jugador, con 4 propiedades
    constructor(alias, pais){
        this.alias = alias
        this.pais = pais
        this.nivel = 0
        this.id = generarID()
    }
}

function agregarJugador(alias, pais){                                          //Agrega un nuevo Jugador al array "jugadores"
    const aux = new Jugador (alias,pais)
    let aux1, get = localStorage.getItem("jugadores")
    if(get == null) aux1 = [aux]
    else {
        aux1 = JSON.parse(get)
        aux1.push(aux)
    }
    localStorage.setItem("jugadores",JSON.stringify(aux1))
}

function eliminarJugador(id){                                                   //Elimina el Jugador del array por su id al array "jugadores"
    let  arrayJugadores = JSON.parse(localStorage.getItem("jugadores"))
    let pos = arrayJugadores.map((elemento) => {return elemento.id}).indexOf(id)
    if(pos != undefined){
        arrayJugadores.splice(pos, 1)
    }
    localStorage.setItem("jugadores",JSON.stringify(arrayJugadores))
}

//Simulacion de calculo de nivel de un Jugador Y de un juego X.

function calculo(jug, gan){

    if(gan > 0){

        return ((gan * 2,5) / jug); 

    }

    return 0;
}

function actualizacionNivel(id, partidasJugadas, partidasGanadas, torneosJugados, torneosGanados){

    let nivel, arrayJugadores = JSON.parse(localStorage.getItem("jugadores"))

    let pos = arrayJugadores.map((e) => {return e.id}).indexOf(id)                            //Busca la posicion en el array del jugador que posee dicho id

    nivel = arrayJugadores[pos].nivel

    if(nivel >= 0 && (partidasJugadas >= 0 && (partidasGanadas <= partidasJugadas && (partidasGanadas >= 0 && (torneosJugados >= 0 && (torneosGanados <= torneosGanados && torneosJugados >= 0)))))){
        
        nivel += (calculo(partidasJugadas, partidasGanadas) + (partidasJugadas/100))       //Calculo de nivel por partidas

        nivel += (calculo(torneosJugados, torneosGanados) + (partidasGanadas/100)) * 2,5   //Calculo de nivel por torneos

        if(nivel > 100) nivel = 100;

    arrayJugadores[pos].nivel = nivel
    }                                                                                   //Si no se cumple algunas de las condiciones, no se actualiza el nivel debido a que hay un error
    localStorage.setItem("jugadores",JSON.stringify(arrayJugadores))
}

/*
let id = 1000001, pj = 200, pg = 120, tj = 50, tg = 30

actualizacionNivel(id, pj, pg, tj, tg)                                                    //Se actualiza el nivel del ultimo Jugador del array, con la nueva informacion de partidas y torneos                                                
*/

//Agregar jugador:

let btnAgregarJugador = document.getElementById("nuevo-jugador-enviar")

btnAgregarJugador.addEventListener("click", nuevoJugador)

function nuevoJugador(){
    let nombre = document.getElementById("nuevo-jugador-nombre").value, pais = document.getElementById("nuevo-jugador-pais").value
    if(nombre == "") alert("Alias sin completar")
    else if(pais == "") alert("Pais sin completar")
    else{
        agregarJugador(nombre, pais.toUpperCase())
    }
}

//Eliminar Jugador:

let btnEliminarJugador = document.getElementById("eliminar-jugador-enviar")

btnEliminarJugador.addEventListener("click",borrarJugador)

function borrarJugador(){
    let id = document.getElementById("eliminar-jugador-id").value
    let arrayJugadores = JSON.parse(localStorage.getItem("jugadores")) , flag = arrayJugadores.find((elemento) => {return elemento.id == id})
    if(flag !== undefined){
    eliminarJugador(id)
    //eliminar de listas de amigos
    }
    else alert("No se encontro el jugador")
   
}

//Buscar jugador:

let btnBuscarJugador = document.getElementById("buscar-amigos-enviar")

btnBuscarJugador.addEventListener("click",buscarJugador)

function buscarJugador(){
    let aux = JSON.parse(localStorage.getItem("jugadores")), name = document.getElementById("buscar-amigos").value, flag = document.getElementById("cancelar-busqueda")
    if(flag != null) borrarBusquedaJugadores();
    let arrayCoincidencia = aux.filter((elemento) =>{ return elemento.alias === name })
    
    let divBuscar = document.getElementById("busqueda")

    if(arrayCoincidencia.length == 0){                                          
        let aviso = document.createElement("p")
        aviso.id = "aviso-no-coincidencia"
        aviso.innerText = "No se encontraron coincidencias"                                             
        divBuscar.append(aviso)
    }
    else{ 
        arrayCoincidencia.forEach((elemento)=>{
        let mostrar = document.createElement("div"), arrayAmigos = JSON.parse(localStorage.getItem("amigos")), bandera, id = elemento.id
        if (arrayAmigos != null) bandera = arrayAmigos.find((amigo) => amigo.id == id)
        if( (arrayAmigos == null) ||  (bandera === undefined)){
            mostrar.innerHTML = "<h3>Alias</h3><h4> " + elemento.alias +"</h4></h3><h3>Nivel</h3> <h4>"+ elemento.nivel +"</h4></h3><h3>Pais</h3> <h4>"+ elemento.pais +"</h4></h3><h3>ID</h3> <h4>"+ elemento.id +"</h4> <button class='boton-agregar-amigo'>Agregar Amigo</button>"
        }
        else{
            mostrar.innerHTML = "<h3>Alias</h3><h4> " + elemento.alias +"</h4></h3><h3>Nivel</h3> <h4>"+ elemento.nivel +"</h4></h3><h3>Pais</h3> <h4>"+ elemento.pais +"</h4></h3><h3>ID</h3> <h4>"+ elemento.id +"</h4> <button class='boton-eliminar-amigo'>Eliminar Amigo</button>"
        }
        mostrar.className = "agregar-amigo"
        let divLista = document.getElementById("lista-busqueda")
        divLista.append(mostrar)
    });
    
    let btnAgregarAmigo = document.querySelectorAll(".agregar-amigo")
    btnAgregarAmigo.forEach((elemento) => {
        elemento.addEventListener("click",botonAmigo)
    })}
   
  
    let cancelar
    cancelar = document.createElement("button")
    cancelar.id = 'cancelar-busqueda'
    cancelar.innerText = "Salir"
    divBuscar.append(cancelar)
    cancelar.addEventListener("click",borrarBusquedaJugadores)
    
}

function borrarBusquedaJugadores(e){
    let arrayBusqueda = document.querySelectorAll(".agregar-amigo"), btnCancelar = e.target, aviso = document.getElementById("aviso-no-coincidencia")
    for(let i = 0 ; i < arrayBusqueda.length ; i++){
        arrayBusqueda[i].remove()
    }
    btnCancelar.remove()
    if(aviso != null) aviso.remove()
}

//Agregrar Amigo - Eliminar Amigo:

function botonAmigo(e){
    let boton = e.target
    if(boton.innerText == "Agregar Amigo"){
        boton.innerText = "Eliminar Amigo"
        boton.className= "boton-eliminar-amigo"
        agregarAmigo(e);
    }
    else{
        boton.innerText = "Agregar Amigo"
        boton.className= "boton-agregar-amigo"
        eliminarAmigo(e);
    }
}

function agregarAmigo(e){
    let arrayAmigos = JSON.parse(localStorage.getItem("amigos")), id = parseInt(e.target.previousElementSibling.innerText), arrayJugadores = JSON.parse(localStorage.getItem("jugadores")) 
    
    let jugador = arrayJugadores.find((elementos) => elementos.id == id)
    if(localStorage.getItem("amigos") == null) arrayAmigos = [jugador]
    else arrayAmigos.push(jugador)

    localStorage.setItem("amigos", JSON.stringify(arrayAmigos))
}

function eliminarAmigo(e){
    let arrayAmigos = JSON.parse(localStorage.getItem("amigos")), id = parseInt(e.target.previousElementSibling.innerText)
    
    let pos = arrayAmigos.map((elemento) => {return elemento.id}).indexOf(id)

    arrayAmigos.splice(pos,1)

    localStorage.setItem("amigos", JSON.stringify(arrayAmigos))
}

//Mostrar lista de amigos:

let btnMostrarAmigos = document.getElementById("mostrar-amigos")

btnMostrarAmigos.addEventListener("click",mostrarAmigos)

function mostrarAmigos(){
    let arrayAmigos = JSON.parse(localStorage.getItem("amigos")), divLista = document.getElementById("lista-amigos"), cancelar
    cancelar = document.createElement("button")
    cancelar.id = 'cancelar-busqueda'
    cancelar.innerText = "Salir"
    divLista.append(cancelar)

    if((arrayAmigos != null ) && (arrayAmigos.length > 0)){
        arrayAmigos.forEach((elemento)=>{
            let mostrar = document.createElement("div"), arrayAmigos = JSON.parse(localStorage.getItem("amigos")), bandera, id = elemento.id
            mostrar.innerHTML = "<h3>Alias</h3><h4> " + elemento.alias +"</h4></h3><h3>Nivel</h3> <h4>"+ elemento.nivel +"</h4></h3><h3>Pais</h3> <h4>"+ elemento.pais +"</h4></h3><h3>ID</h3> <h4>"+ elemento.id +"</h4> <button class='boton-eliminar-amigo'>Eliminar Amigo</button>"
            mostrar.className = "mostrar-amigo"
            let divLista = document.getElementById("lista-amigos")
            divLista.append(mostrar)
        }
        )
        let btnAgregarAmigo = document.querySelectorAll(".mostrar-amigo")
        btnAgregarAmigo.forEach((elemento) => {
        elemento.addEventListener("click",botonAmigo)
    })
    }
    else{
        let sinAmigos = document.createElement("p")
        sinAmigos.id= "sin-amigos"
        sinAmigos.innerText = "No tienes ningun amigo"
        divLista.append(sinAmigos)
    }
    
    cancelar.addEventListener("click",borrarBusquedaAmigos)
}

function borrarBusquedaAmigos(e){
    let arrayBusqueda = document.querySelectorAll(".mostrar-amigo"), btnCancelar = e.target, aviso = document.getElementById("sin-amigos")
    for(let i = 0 ; i < arrayBusqueda.length ; i++){
        arrayBusqueda[i].remove()
    }
    btnCancelar.remove()
    if(aviso != null) aviso.remove()
}