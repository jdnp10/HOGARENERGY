/*=========================================
PUBLICIDAD.JS
HogarEnergy
=========================================*/

const formularioPublicidad =
document.getElementById("formPublicidad");

formularioPublicidad.addEventListener(

"submit",

async function(e){

e.preventDefault();

/*-------------------------*/

const datos={

nombre:
document.getElementById("nombre").value,

empresa:
document.getElementById("empresa").value,

celular:
document.getElementById("celular").value,

correo:
document.getElementById("correo").value,

plan:
document.getElementById("plan").value

};

/*-------------------------*/

const respuesta=

await fetch(

"https://hogarenergy-1.onrender.com/api/publicidad",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(datos)

}

);

/*-------------------------*/

const resultado=

await respuesta.json();

alert(

"✅ Solicitud enviada correctamente.\n\nEn las próximas horas un asesor comercial se comunicará con usted."

);

formularioPublicidad.reset();

});