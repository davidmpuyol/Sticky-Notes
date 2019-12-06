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
    notas: [
        {id: 0, titulo : "Nota 1", texto:"Esta es la nota 1", fecha: new Date()},
        {id: 1, titulo : "Nota 2", texto:"Esta es la nota 2", fecha: new Date()}
    ]
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
    nota.onclick = ratonPulsado;
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
    fecha.innerHTML = n.fecha.toUTCString();
    nota.appendChild(fecha);
}
window.onload = () =>{
    document.body.onmousemove = mouseMove;
    console.log(modelo);
    showNotes();
}
