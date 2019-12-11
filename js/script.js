var imagenPulsada = false;
var imagen;
var derecha, altura;
var x,y;
function ratonPulsado(event){
    //console.log(event.target);
    imagenPulsada = !imagenPulsada;
    imagen = event.target;
    console.log(imagen.offsetLeft,imagen.offsetTop);
    imagen.style.top = imagen.offsetTop+-10+"px";
    imagen.style.left = imagen.offsetLeft-10+"px";
    console.log(imagen.offsetLeft,imagen.offsetTop);
    derecha = x-parseInt(imagen.style.left.slice(0,-2));
    altura = y-parseInt(imagen.style.top.slice(0,-2));
}

function mouseMove(event){
    x = event.clientX;
    y = event.clientY;
    if(imagenPulsada){
        imagen.style.left = x-derecha+"px";
        imagen.style.top = y-altura+"px";
        //console.log(imagen.offsetLeft,imagen.offsetTop);
    }
}

var modelo = {
    seleccionada: null,
    notas: []
}

if (localStorage.notas) {
    modelo = JSON.parse(localStorage.notas);
    convertirFechas();
  } else {
    localStorage.notas = JSON.stringify(modelo);
}

function convertirFechas(){
    modelo.notas.forEach((nota) => {
        nota.fecha = new Date(nota.fecha);
    })
}

function botonCrearNota(){
    console.log("creando nota");
    let titulo = document.getElementById("inputTitulo").value;
    let nota = document.getElementById("inputNota").value;
    console.log(nota,titulo);
    nuevaNota(titulo,nota);
    let divNota = document.getElementById("divNota");
    document.body.removeChild(divNota);
}

function nuevaNota(titulo,nota){
    let nuevaNota = {
        id: modelo.notas.length,
        titulo: titulo,
        texto: nota,
        fecha: new Date()
    };
    modelo.notas.push(nuevaNota);
    localStorage.notas = JSON.stringify(modelo);
    drawNote(nuevaNota);
}

function showNotes(){
    modelo.notas.forEach((nota)=>{
        drawNote(nota);
    });
}

function drawNote(n){
    let nota = document.createElement("div");
    nota.className = "nota";
    nota.contentEditable = true;    
    //nota.onclick = ratonPulsado;
    let titulo = document.createElement("p");
    titulo.className = "titulo";
    titulo.innerHTML = n.titulo;
    nota.appendChild(titulo);
    let texto = document.createElement("p");
    texto.className = "texto";
    texto.innerHTML = n.texto;
    nota.appendChild(texto);
    document.getElementById("muro").appendChild(nota);
    let fecha = document.createElement("p");
    fecha.className ="fecha";
    let fechaActual = new Date();
    let minutos = (fechaActual - n.fecha)/60000;
    minutos = Math.trunc(minutos);
    fecha.innerHTML = "Hace "+minutos+" minutos.";
    nota.appendChild(fecha);
    $(nota).draggable();
}
function crearNota(){
    if(document.getElementById("divNota")){
        document.body.removeChild(document.getElementById("divNota"));
    }
    else{
        let divNota = document.createElement("div");
        divNota.id="divNota";
        let labelTitulo = document.createElement("label");
        labelTitulo.innerHTML = "<h3>Título</h3>";
        divNota.appendChild(labelTitulo);
        let inputTitulo = document.createElement("input");
        inputTitulo.type = "text";
        inputTitulo.id = "inputTitulo";
        divNota.appendChild(inputTitulo);
        let labelNota = document.createElement("label");
        labelNota.innerHTML = "<h3>Nota</h3>";
        divNota.appendChild(labelNota);
        let inputNota = document.createElement("textArea");
        inputNota.id = "inputNota";
        divNota.appendChild(inputNota);
        let botonCrear = document.createElement("button");
        botonCrear.id = "botonCrear";
        botonCrear.onclick = botonCrearNota;
        botonCrear.innerHTML = "Crear Nota";
        divNota.appendChild(botonCrear);
        document.body.appendChild(divNota);
    }
}
window.onload = () =>{
    //document.body.onmousemove = mouseMove;
    console.log(modelo);
    showNotes();
}
