import Viewport from '../lib/viewport.js';

const the_view = new Viewport();

the_view.onStart();


//MORE>>>>

const myElement = document.getElementById("object_panel");
const contextMenu = document.getElementById("contextMenu");
const addcube = document.getElementById("addcube");

// Captura el evento contextmenu
myElement.addEventListener("contextmenu", (e) => {
  e.preventDefault(); // Evita que aparezca el menú contextual del navegador

  // Muestra el menú personalizado en la posición del cursor del mouse
  contextMenu.style.left = `${e.clientX}px`;
  contextMenu.style.top = `${e.clientY}px`;
  contextMenu.style.display = "block";
});

addcube.onclick = () => {
  the_view.addCube()
};

// Oculta el menú personalizado cuando se hace clic fuera de él
document.addEventListener("click", () => {
  contextMenu.style.display = "none";
});

// Evita que se cierre el menú cuando se hace clic dentro de él
contextMenu.addEventListener("click", (e) => {
  e.stopPropagation();
});

//SCRIPTING ZONE...
let isScripting = false;
let inViewport = document.querySelector("#viewport");
let inScripting = document.querySelector("#scripting");

function toggleScript(){
  isScripting = !isScripting;
  if(isScripting){
    inScripting.classList.add("block");
    inScripting.classList.remove("hidden");

    inViewport.classList.remove("block");
    inViewport.classList.add("hidden");
  }else {
    inScripting.classList.remove("block");
    inScripting.classList.add("hidden");

    inViewport.classList.add("block");
    inViewport.classList.remove("hidden");
  }
}