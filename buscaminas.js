var banderas = 0;
let long = 0;
let minas = 0;
let derrota = false;
let revelado = "rgb(201, 201, 201)"
document.addEventListener('click', e => {
    switch (e.target.value) {
        case "generar":
            document.getElementById("victoria").innerText = "";
            const fragment = document.createDocumentFragment();
            while (document.getElementById("tabla").firstChild) {
                document.getElementById("tabla").removeChild(document.getElementById("tabla").firstChild);
            }
            switch (document.getElementById("dificultad").value) {
                case "facil":
                    derrota = false;
                    banderas = 10;
                    long = 7;
                    minas = 10;
                    document.getElementById("numBanderas").textContent = banderas;
                    generarTableroYMinas(long, minas, fragment);
                    break;

                case "medio":
                    derrota = false;
                    banderas = 22;
                    long = 10;
                    minas = 22;
                    document.getElementById("numBanderas").textContent = banderas;
                    generarTableroYMinas(long, minas, fragment);
                    break;

                case "dificil":
                    derrota = false;
                    banderas = 40;
                    long = 15;
                    minas = 40;
                    document.getElementById("numBanderas").textContent = banderas;
                    generarTableroYMinas(long, minas, fragment);
                    break;
            }

            document.getElementById("modal").style.display = "block";
            break;

        case "comprobar":

            comprobarPartida(long, minas);
            break;

    }

    if (e.target.getAttribute("mina") == "true" && e.target.getAttribute("bandera") == "false") {
        if(derrota != true){
            derrota = true;
            e.target.style.background = "red"
            comprobarPartida(long, minas);
        }
        
    } else if (e.target.getAttribute("bandera") == "false" && e.target.style.background != revelado) {
        if (derrota != true) {
            revelarCasilla(e.target.id, long)
        }
    }
    if (e.target == document.getElementById("modal")) {
        document.getElementById("modal").style.display = "none";
    }
})

document.addEventListener('contextmenu', e => {
    e.preventDefault();
    if (e.target.tagName === "TD" && derrota != true) {
        if (e.target.getAttribute("bandera") != "true") {
            if (banderas > 0 && e.target.style.background != revelado) {
                e.target.setAttribute("bandera", "true");
                e.target.innerHTML = "🚩";
                banderas = banderas - 1;
            }

        } else {
            e.target.setAttribute("bandera", "false");
            e.target.innerHTML = "";
            banderas = banderas + 1;
        }

        document.getElementById("numBanderas").textContent = banderas;

    }

})

function comprobarPartida(long, minas) {
    let cont = 0;
    derrota = true;
    for (let i = 0; i <= long; i++) {
        for (let j = 0; j <= long; j++) {
            if (document.getElementById('f' + i + 'c' + j).getAttribute("mina") == "true" && document.getElementById('f' + i + 'c' + j).getAttribute("bandera") == "false") {
                document.getElementById('f' + i + 'c' + j).innerHTML = "💣"
            } else if (document.getElementById('f' + i + 'c' + j).getAttribute("mina") == "true" && document.getElementById('f' + i + 'c' + j).getAttribute("bandera") == "true") {
                document.getElementById('f' + i + 'c' + j).style.background = "lightgreen"
                cont = cont + 1;
            } else if (document.getElementById('f' + i + 'c' + j).getAttribute("mina") == "false" && document.getElementById('f' + i + 'c' + j).getAttribute("bandera") == "true") {
                document.getElementById('f' + i + 'c' + j).style.background = "lightblue"
            } 
        }
    }
    if (cont == minas) {
        document.getElementById("victoria").innerText = "VICTORIA";
    } else if (cont == 1) {
        document.getElementById("victoria").innerText = "Acertaste " + cont + " mina";
    } else {
        document.getElementById("victoria").innerText = "Acertaste " + cont + " minas";
    }


}

function generarTableroYMinas(maxCasilla, maxMinas, fragment) {
    for (let i = 0; i < (maxCasilla + 1); i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < (maxCasilla + 1); j++) {
            const td = document.createElement("td");
            td.id = 'f' + i + 'c' + j;
            td.setAttribute("mina", "false");
            td.setAttribute("bandera", "false");
            td.style.background = "white";
            td.innerHTML = "";
            tr.appendChild(td);
        }
        fragment.appendChild(tr);
        document.getElementById("tabla").appendChild(fragment);
    }
    for (let i = 0; i < maxMinas; i++) {
        var filRand = randomIntFromInterval(0, maxCasilla);
        var colRand = randomIntFromInterval(0, maxCasilla);
        var cuadroRand = document.getElementById("f" + filRand + "c" + colRand);
        if (cuadroRand.getAttribute("mina") == "false") {
            cuadroRand.setAttribute("mina", "true");
        } else {
            i--;
        }
    }
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function calcularMinas(pos, max) {
    matches = pos.match(/\d+/g);
    let x = parseInt(matches[0])
    let y = parseInt(matches[1])
    minasEnc = 0;

    if (x == 0 && y == 0) {
        for (let i = x; i <= x + 1; i++) {
            for (let j = y; j <= y + 1; j++) {
                var rotacion = document.getElementById('f' + i + 'c' + j);
                if (rotacion.getAttribute("mina") == "true") {
                    minasEnc = minasEnc + 1;
                }
            }
        }
    } else if (x == max && y == 0) {
        for (let i = x - 1; i <= x; i++) {
            for (let j = y; j <= y + 1; j++) {
                var rotacion = document.getElementById('f' + i + 'c' + j);
                if (rotacion.getAttribute("mina") == "true") {
                    minasEnc = minasEnc + 1;
                }
            }
        }
    } else if (x == 0 && y == max) {
        for (let i = x; i <= x + 1; i++) {
            for (let j = y - 1; j <= y; j++) {
                var rotacion = document.getElementById('f' + i + 'c' + j);
                if (rotacion.getAttribute("mina") == "true") {
                    minasEnc = minasEnc + 1;
                }
            }
        }
    } else if (x == max && y == max) {
        for (let i = x - 1; i <= x; i++) {
            for (let j = y - 1; j <= y; j++) {
                var rotacion = document.getElementById('f' + i + 'c' + j);
                if (rotacion.getAttribute("mina") == "true") {
                    minasEnc = minasEnc + 1;
                }
            }
        }
    } else if (x == 0) {
        for (let i = x; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                var rotacion = document.getElementById('f' + i + 'c' + j);
                if (rotacion.getAttribute("mina") == "true") {
                    minasEnc = minasEnc + 1;
                }
            }
        }
    } else if (y == 0) {
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y; j <= y + 1; j++) {
                var rotacion = document.getElementById('f' + i + 'c' + j);
                if (rotacion.getAttribute("mina") == "true") {
                    minasEnc = minasEnc + 1;
                }
            }
        }
    } else if (x == max) {
        for (let i = x - 1; i <= x; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                var rotacion = document.getElementById('f' + i + 'c' + j);
                if (rotacion.getAttribute("mina") == "true") {
                    minasEnc = minasEnc + 1;
                }
            }
        }
    } else if (y == max) {
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y; j++) {
                var rotacion = document.getElementById('f' + i + 'c' + j);
                if (rotacion.getAttribute("mina") == "true") {
                    minasEnc = minasEnc + 1;
                }
            }
        }
    } else {
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                var rotacion = document.getElementById('f' + i + 'c' + j);
                if (rotacion.getAttribute("mina") == "true") {
                    minasEnc = minasEnc + 1;
                }
            }
        }
    }

    if (minasEnc == 0) {
        minasEnc = "";
    }

    return minasEnc;

}


function revelarCasilla(pos, max) {

    matches = pos.match(/\d+/g);
    let x = parseInt(matches[0])
    let y = parseInt(matches[1])
    minasArea = calcularMinas(pos, max)
    if (document.getElementById('f' + x + 'c' + y).style.background != revelado && document.getElementById('f' + x + 'c' + y).getAttribute("bandera") == "false" && document.getElementById('f' + x + 'c' + y).getAttribute("mina") == "false") {
        if (minasArea == 0) {
            document.getElementById('f' + x + 'c' + y).innerHTML = "";
            document.getElementById('f' + x + 'c' + y).style.background = revelado;
            if (x == 0 && y == 0) {
                for (let i = x; i <= x + 1; i++) {
                    for (let j = y; j <= y + 1; j++) {
                        if (document.getElementById('f' + (i) + 'c' + (j)).style.background != revelado && document.getElementById('f' + (i) + 'c' + (j)).getAttribute("bandera") == "false" && document.getElementById('f' + (i) + 'c' + (j)).getAttribute("mina") == "false") {
                            revelarCasilla(document.getElementById('f' + (i) + 'c' + (j)).id, max);
                            document.getElementById('f' + (i) + 'c' + (j)).style.background = revelado;
                            document.getElementById('f' + (i) + 'c' + (j)).innerHTML = calcularMinas(document.getElementById('f' + (i) + 'c' + (j)).id, max);
                        }
                    }
                }
            } else if (x == 0 && y == max) {
                for (let i = x; i <= x + 1; i++) {
                    for (let j = y - 1; j <= y; j++) {
                        if (document.getElementById('f' + (i) + 'c' + (j)).style.background != revelado && document.getElementById('f' + (i) + 'c' + (j)).getAttribute("bandera") == "false" && document.getElementById('f' + (i) + 'c' + (j)).getAttribute("mina") == "false") {
                            revelarCasilla(document.getElementById('f' + (i) + 'c' + (j)).id, max);
                            document.getElementById('f' + (i) + 'c' + (j)).style.background = revelado;
                            document.getElementById('f' + (i) + 'c' + (j)).innerHTML = calcularMinas(document.getElementById('f' + (i) + 'c' + (j)).id, max);
                        }
                    }
                }
            }

            else if (x == max && y == max) {
                for (let i = x - 1; i <= x; i++) {
                    for (let j = y - 1; j <= y; j++) {
                        if (document.getElementById('f' + (i) + 'c' + (j)).style.background != revelado && document.getElementById('f' + (i) + 'c' + (j)).getAttribute("bandera") == "false" && document.getElementById('f' + (i) + 'c' + (j)).getAttribute("mina") == "false") {
                            revelarCasilla(document.getElementById('f' + (i) + 'c' + (j)).id, max);
                            document.getElementById('f' + (i) + 'c' + (j)).style.background = revelado;
                            document.getElementById('f' + (i) + 'c' + (j)).innerHTML = calcularMinas(document.getElementById('f' + (i) + 'c' + (j)).id, max);
                        }
                    }
                }
            } else if (x == max && y == 0) {
                for (let i = x - 1; i <= x; i++) {
                    for (let j = y; j <= y + 1; j++) {
                        if (document.getElementById('f' + (i) + 'c' + (j)).style.background != revelado && document.getElementById('f' + (i) + 'c' + (j)).getAttribute("bandera") == "false" && document.getElementById('f' + (i) + 'c' + (j)).getAttribute("mina") == "false") {
                            revelarCasilla(document.getElementById('f' + (i) + 'c' + (j)).id, max);
                            document.getElementById('f' + (i) + 'c' + (j)).style.background = revelado;
                            document.getElementById('f' + (i) + 'c' + (j)).innerHTML = calcularMinas(document.getElementById('f' + (i) + 'c' + (j)).id, max);
                        }
                    }
                }
            } else if (y == 0) {
                for (let i = x - 1; i <= x + 1; i++) {
                    for (let j = y; j <= y + 1; j++) {
                        if (document.getElementById('f' + (i) + 'c' + (j)).style.background != revelado && document.getElementById('f' + (i) + 'c' + (j)).getAttribute("bandera") == "false" && document.getElementById('f' + (i) + 'c' + (j)).getAttribute("mina") == "false") {
                            revelarCasilla(document.getElementById('f' + (i) + 'c' + (j)).id, max);
                            document.getElementById('f' + (i) + 'c' + (j)).style.background = revelado;
                            document.getElementById('f' + (i) + 'c' + (j)).innerHTML = calcularMinas(document.getElementById('f' + (i) + 'c' + (j)).id, max);
                        }
                    }
                }
            } else if (x == max) {
                for (let i = x - 1; i <= x; i++) {
                    for (let j = y - 1; j <= y + 1; j++) {
                        if (document.getElementById('f' + (i) + 'c' + (j)).style.background != revelado && document.getElementById('f' + (i) + 'c' + (j)).getAttribute("bandera") == "false" && document.getElementById('f' + (i) + 'c' + (j)).getAttribute("mina") == "false") {
                            revelarCasilla(document.getElementById('f' + (i) + 'c' + (j)).id, max);
                            document.getElementById('f' + (i) + 'c' + (j)).style.background = revelado;
                            document.getElementById('f' + (i) + 'c' + (j)).innerHTML = calcularMinas(document.getElementById('f' + (i) + 'c' + (j)).id, max);
                        }
                    }
                }
            } else if (y == max) {
                for (let i = x - 1; i <= x + 1; i++) {
                    for (let j = y - 1; j <= y; j++) {
                        if (document.getElementById('f' + (i) + 'c' + (j)).style.background != revelado && document.getElementById('f' + (i) + 'c' + (j)).getAttribute("bandera") == "false" && document.getElementById('f' + (i) + 'c' + (j)).getAttribute("mina") == "false") {
                            revelarCasilla(document.getElementById('f' + (i) + 'c' + (j)).id, max);
                            document.getElementById('f' + (i) + 'c' + (j)).style.background = revelado;
                            document.getElementById('f' + (i) + 'c' + (j)).innerHTML = calcularMinas(document.getElementById('f' + (i) + 'c' + (j)).id, max);
                        }
                    }
                }
            }
            else if (x == 0) {
                for (let i = x; i <= x + 1; i++) {
                    for (let j = y - 1; j <= y + 1; j++) {
                        if (document.getElementById('f' + (i) + 'c' + (j)).style.background != revelado && document.getElementById('f' + (i) + 'c' + (j)).getAttribute("bandera") == "false" && document.getElementById('f' + (i) + 'c' + (j)).getAttribute("mina") == "false") {
                            revelarCasilla(document.getElementById('f' + (i) + 'c' + (j)).id, max);
                            document.getElementById('f' + (i) + 'c' + (j)).style.background = revelado;
                            document.getElementById('f' + (i) + 'c' + (j)).innerHTML = calcularMinas(document.getElementById('f' + (i) + 'c' + (j)).id, max);
                        }
                    }
                }
            } else {
                for (let i = x - 1; i <= x + 1; i++) {
                    for (let j = y - 1; j <= y + 1; j++) {
                        if (document.getElementById('f' + (i) + 'c' + (j)).style.background != revelado && document.getElementById('f' + (i) + 'c' + (j)).getAttribute("bandera") == "false" && document.getElementById('f' + (i) + 'c' + (j)).getAttribute("mina") == "false") {
                            revelarCasilla(document.getElementById('f' + (i) + 'c' + (j)).id, max);
                            document.getElementById('f' + (i) + 'c' + (j)).style.background = revelado;
                            document.getElementById('f' + (i) + 'c' + (j)).innerHTML = calcularMinas(document.getElementById('f' + (i) + 'c' + (j)).id, max);
                        }
                    }
                }
            }

        } else {
            document.getElementById('f' + x + 'c' + y).innerHTML = minasArea;
            document.getElementById('f' + x + 'c' + y).style.background = revelado
            switch (minasArea) {
                case 1:
                    document.getElementById('f' + x + 'c' + y).style.color = "green";
                    break;
                case 2:
                    document.getElementById('f' + x + 'c' + y).style.color = "red";
                    break;
                case 3:
                    document.getElementById('f' + x + 'c' + y).style.color = "blue";
                    break;
                case 4:
                    document.getElementById('f' + x + 'c' + y).style.color = "darkblue";
                    break;
                case 5:
                    document.getElementById('f' + x + 'c' + y).style.color = "darkgreen";
                    break;
                case 6:
                    document.getElementById('f' + x + 'c' + y).style.color = "red";
                    break;
                case 7:
                    document.getElementById('f' + x + 'c' + y).style.color = "purple";
                    break;
                case 8:
                    document.getElementById('f' + x + 'c' + y).style.color = "indigo";
                    break;

            }
        }
    }
}






