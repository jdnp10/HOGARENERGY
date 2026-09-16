/*==================================================
ADMIN.JS
HogarEnergy
==================================================*/

const URL="https://hogarenergy-1.onrender.com/api";

/*==================================================
INICIAR
==================================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

cargarPublicidad();

cargarAsesorias();

});

/*==================================================
PUBLICIDAD
==================================================*/

async function cargarPublicidad(){

try{

const respuesta=

await fetch(

`${URL}/publicidad`

);

const datos=

await respuesta.json();

let html="";

datos.forEach(item=>{

let estado=item.estado;

let clase="estadoPendiente";

if(estado==="Aprobado"){

clase="estadoAprobado";

}

if(estado==="Rechazado"){

clase="estadoRechazado";

}

html+=`

<tr>

<td>${item.id}</td>

<td>${item.empresa}</td>

<td>${item.nombre}</td>

<td>${item.correo}</td>

<td>${item.plan}</td>

<td>$${Number(item.valor).toLocaleString("es-CO")}</td>

<td>

<span class="${clase}">

${estado}

</span>

</td>

<td>

<button

class="btnAprobar"

onclick="aprobarPublicidad(${item.id})">

Aprobar

</button>

<button

class="btnRechazar"

onclick="rechazarPublicidad(${item.id})">

Rechazar

</button>

</td>

</tr>

`;

});

document.querySelector(

"#tablaPublicidad tbody"

).innerHTML=html;

}catch(error){

console.log(error);

}

}

/*==================================================
ASESORIAS
==================================================*/

async function cargarAsesorias(){

try{

const respuesta=

await fetch(

`${URL}/asesorias`

);

const datos=

await respuesta.json();

let html="";

datos.forEach(item=>{

let estado=item.estado;

let clase="estadoPendiente";

if(estado==="Aprobado"){

clase="estadoAprobado";

}

if(estado==="Rechazado"){

clase="estadoRechazado";

}

html+=`

<tr>

<td>${item.id}</td>

<td>${item.nombre}</td>

<td>${item.celular}</td>

<td>${item.correo}</td>

<td>${item.ciudad}</td>

<td>

<span class="${clase}">

${estado}

</span>

</td>

<td>

<button

class="btnAprobar"

onclick="aprobarAsesoria(${item.id})">

Aprobar

</button>

<button

class="btnRechazar"

onclick="rechazarAsesoria(${item.id})">

Rechazar

</button>

</td>

</tr>

`;

});

document.querySelector(

"#tablaAsesoria tbody"

).innerHTML=html;

}catch(error){

console.log(error);

}

}

/*==================================================
APROBAR PUBLICIDAD
==================================================*/

async function aprobarPublicidad(id){

await fetch(

`${URL}/publicidad/aprobar/${id}`,

{

method:"PUT"

}

);

cargarPublicidad();

}

/*==================================================
RECHAZAR PUBLICIDAD
==================================================*/

async function rechazarPublicidad(id){

await fetch(

`${URL}/publicidad/rechazar/${id}`,

{

method:"PUT"

}

);

cargarPublicidad();

}

/*==================================================
APROBAR ASESORIA
==================================================*/

async function aprobarAsesoria(id){

await fetch(

`${URL}/asesoria/aprobar/${id}`,

{

method:"PUT"

}

);

cargarAsesorias();

}

/*==================================================
RECHAZAR ASESORIA
==================================================*/

async function rechazarAsesoria(id){

await fetch(

`${URL}/asesoria/rechazar/${id}`,

{

method:"PUT"

}

);

cargarAsesorias();

}