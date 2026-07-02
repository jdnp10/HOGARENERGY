/*======================================================
HOGARENERGY

APP.JS

Proyecto ADSO - SENA

Autor:
Jesús

======================================================*/

/*======================================================
VARIABLES GLOBALES
======================================================*/

let graficoConsumo = null;

const DIAS_MES = 30;

/*======================================================
EVENTOS
======================================================*/

document.addEventListener(

"DOMContentLoaded",

function(){

iniciarAplicacion();

}

);

/*======================================================
INICIAR
======================================================*/

function iniciarAplicacion(){

const botonCalcular =

document.getElementById(
"btnCalcular"
);

if(botonCalcular){

botonCalcular.addEventListener(

"click",

calcularEnergia

);

}

}

/*======================================================
FUNCIÓN PRINCIPAL
======================================================*/

function calcularEnergia(){

const equipos = obtenerEquipos();

let consumoTotal = 0;

let mayorConsumo = 0;

let equipoMayor = "";

/*--------------------------------------*/

equipos.forEach(equipo=>{

const consumo =

calcularConsumoEquipo(

equipo

);

equipo.consumo = consumo;

consumoTotal += consumo;

if(consumo > mayorConsumo){

mayorConsumo = consumo;

equipoMayor = equipo.nombre;

}

});

/*--------------------------------------*/

const tarifa =

Number(

document.getElementById(

"tarifaKwh"

).value

)||1000;

const costo =

consumoTotal * tarifa;

const clasificacion =

clasificarEnergia(

consumoTotal

);

/*--------------------------------------*/

mostrarResultados(

consumoTotal,

costo,

clasificacion,

equipoMayor

);

/*--------------------------------------*/

generarRecomendaciones(

equipos,

equipoMayor

);

/*--------------------------------------*/

crearGrafico(

equipos

);

}

/*======================================================
OBTENER DATOS
======================================================*/

function obtenerEquipos(){

return[

leerEquipo(

"Abanico",

"abanicoCantidad",

"abanicoPotencia",

"abanicoHoras"

),

leerEquipo(

"Aire acondicionado",

"aireCantidad",

"airePotencia",

"aireHoras"

),

leerEquipo(

"Nevera",

"neveraCantidad",

"neveraPotencia",

"neveraHoras"

),

leerEquipo(

"Televisor",

"tvCantidad",

"tvPotencia",

"tvHoras"

),

leerEquipo(

"Luces",

"lucesCantidad",

"lucesPotencia",

"lucesHoras"

),

leerEquipo(

"Lavadora",

"lavadoraCantidad",

"lavadoraPotencia",

"lavadoraHoras"

),

leerEquipo(

"Microondas",

"microCantidad",

"microPotencia",

"microHoras"

),

leerEquipo(

"Computador",

"pcCantidad",

"pcPotencia",

"pcHoras"

),

leerEquipo(

"Equipo de sonido",

"sonidoCantidad",

"sonidoPotencia",

"sonidoHoras"

)

];

}

/*======================================================
LEER EQUIPO
======================================================*/

function leerEquipo(

nombre,

idCantidad,

idPotencia,

idHoras

){

return{

nombre:nombre,

cantidad:Number(

document.getElementById(

idCantidad

).value

)||0,

potencia:Number(

document.getElementById(

idPotencia

).value

)||0,

horas:Number(

document.getElementById(

idHoras

).value

)||0,

consumo:0

};

}

/*======================================================
CONSUMO POR EQUIPO
======================================================*/

function calcularConsumoEquipo(

equipo

){

return(

equipo.cantidad*

equipo.potencia*

equipo.horas*

DIAS_MES

)/1000;

}
/*======================================================
MOSTRAR RESULTADOS
======================================================*/

function mostrarResultados(

consumo,

costo,

clasificacion,

equipoMayor

){

// Tarjetas principales

document.getElementById(

"consumoMensualCard"

).innerHTML=

consumo.toFixed(2)+" kWh";

document.getElementById(

"facturaCard"

).innerHTML=

"$"+costo.toLocaleString("es-CO");

document.getElementById(

"clasificacionCard"

).innerHTML=

clasificacion;

/*------------------------------------------*/

const texto=

`
<h3>Resumen del análisis</h3>

<p>

<b>Consumo mensual:</b>
${consumo.toFixed(2)} kWh

</p>

<p>

<b>Factura estimada:</b>

$${costo.toLocaleString("es-CO")}

</p>

<p>

<b>Clasificación energética:</b>

${clasificacion}

</p>

<p>

<b>Equipo con mayor consumo:</b>

${equipoMayor}

</p>

`;

document.getElementById(

"resultadoConsumo"

).innerHTML=

texto;

/*------------------------------------------*/

mostrarEtiqueta(

clasificacion

);

}

/*======================================================
CLASIFICACIÓN ENERGÉTICA
======================================================*/

function clasificarEnergia(

consumo

){

if(consumo<=150){

return"A";

}

if(consumo<=250){

return"B";

}

if(consumo<=350){

return"C";

}

if(consumo<=500){

return"D";

}

if(consumo<=700){

return"E";

}

if(consumo<=900){

return"F";

}

return"G";

}

/*======================================================
MOSTRAR ETIQUETA
======================================================*/

function mostrarEtiqueta(

letra

){

const texto=

`

<h2>

Clasificación

${letra}

</h2>

<p>

Entre más cercana a la letra A,

más eficiente es el consumo energético del hogar.

</p>

`;

document.getElementById(

"resultadoEtiqueta"

).innerHTML=

texto;

/*-------------------------------------*/

document

.querySelectorAll(

".nivel"

)

.forEach(

item=>{

item.style.transform="scale(1)";

item.style.boxShadow="none";

}

);

/*-------------------------------------*/

const clase=

letra.toLowerCase();

const nivel=

document.querySelector(

"."

+clase

);

if(nivel){

nivel.style.transform="scale(1.08)";

nivel.style.boxShadow=

"0 0 18px rgba(0,184,148,.45)";

}

}

/*======================================================
FORMATO MONEDA
======================================================*/

function formatoPesos(

valor

){

return valor.toLocaleString(

"es-CO",

{

minimumFractionDigits:0

}

);

}
/*======================================================
RECOMENDACIONES
======================================================*/

function generarRecomendaciones(equipos,equipoMayor){

let recomendaciones=[];

equipos.forEach(equipo=>{

if(equipo.consumo>200){

recomendaciones.push(

`<li><b>${equipo.nombre}</b>: presenta un consumo elevado (${equipo.consumo.toFixed(1)} kWh/mes). Se recomienda reducir las horas de uso o reemplazarlo por un equipo más eficiente.</li>`

);

}

});

if(recomendaciones.length==0){

recomendaciones.push(

"<li>Excelente. El consumo de los equipos registrados es adecuado.</li>"

);

}

recomendaciones.push(

`<li>El equipo de mayor consumo es <b>${equipoMayor}</b>. Considere optimizar su utilización.</li>`

);

recomendaciones.push(

"<li>Utilice iluminación LED para disminuir el consumo eléctrico.</li>"

);

recomendaciones.push(

"<li>Desconecte los equipos cuando no estén siendo utilizados.</li>"

);

recomendaciones.push(

"<li>Realice mantenimiento periódico a los equipos de climatización.</li>"

);

document.getElementById(

"listaRecomendaciones"

).innerHTML=

recomendaciones.join("");

}
/*======================================================
GRÁFICO
======================================================*/

function crearGrafico(equipos){

const canvas=

document.getElementById("graficoConsumo");

if(!canvas){

return;

}

const ctx=

canvas.getContext("2d");

if(graficoConsumo){

graficoConsumo.destroy();

}

graficoConsumo=

new Chart(ctx,{

type:"doughnut",

data:{

labels:equipos.map(

e=>e.nombre

),

datasets:[{

data:equipos.map(

e=>e.consumo

)

}]

},

options:{

responsive:true,

plugins:{

legend:{

position:"bottom"

}

}

}

});

}