//Simulacion de calculo de nivel de un juego X.

let partidasJugadas, partidasGanadas, torneosJugados, torneosGanados, flag = true, nivel 

function calculo(jug, gan){

    if(gan > 0){

        return ((gan * 2,5) / jug); 

    }

    return 0;
}

while (flag){

flag = false;

nivel = parseInt(prompt("Ingrese su nivel actual: "))

partidasJugadas = parseInt(prompt("Ingrese la cantidad de partidas jugadas: "))

partidasGanadas = parseInt(prompt("Ingrese la cantidad de partidas ganadas: "))

torneosJugados = parseInt(prompt("Ingrese la cantidad de torneos jugados: "))

torneosGanados = parseInt(prompt("Ingrese la cantidad de torneos ganados: "))


if(nivel >= 0 && (partidasJugadas >= 0 && (partidasGanadas <= partidasJugadas && (partidasGanadas >= 0 && (torneosJugados >= 0 && (torneosGanados <= torneosGanados && torneosJugados >= 0)))))){
    
    nivel += (calculo(partidasJugadas, partidasGanadas) + (partidasJugadas/100))       //calculo de nivel por partidas

    nivel += (calculo(torneosJugados, torneosGanados) + (partidasGanadas/100)) * 2,5   //calculo de nivel por torneos
}
else {
    alert("Se ha ingresado un campo incorrectamente, vuelve a ingresar")

    flag = true;
}
}
if(nivel > 100) nivel = 100;

alert("Su nivel actualizado es: "+ parseInt(nivel))

