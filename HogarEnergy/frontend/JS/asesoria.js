/*=========================================
ASESORIA.JS
HogarEnergy
=========================================*/

const formularioAsesoria=

document.getElementById(

"formAsesoria"

);

formularioAsesoria.addEventListener(

"submit",

async function(e){

e.preventDefault();

/*----------------------*/

const datos={

nombre:

document.getElementById("nombre").value,

celular:

document.getElementById("celular").value,

correo:

document.getElementById("correo").value,

ciudad:

document.getElementById("ciudad").value,

tipo:

document.getElementById("tipo").value,

descripcion:

document.getElementById("descripcion").value

};

/*----------------------*/

const respuesta=

await fetch(

"http://localhost:3000/api/asesoria",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(datos)

}

);

/*----------------------*/

const resultado=

await respuesta.json();

alert(

"✅ Solicitud registrada correctamente.\n\nUno de nuestros ingenieros especialistas en eficiencia energética se comunicará con usted muy pronto."

);

formularioAsesoria.reset();

});