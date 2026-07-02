/*====================================================
                HOGARENERGY
        SERVIDOR BACKEND - NODE.JS
====================================================*/

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

/*====================================================
                CONFIGURACIÓN
====================================================*/

app.use(cors());

app.use(express.json());

/*====================================================
                CONEXIÓN MYSQL
====================================================*/

const conexion = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "",

    database: "hogarenergy"

});

conexion.connect((error)=>{

    if(error){

        console.log("--------------------------------");

        console.log("ERROR CONECTANDO MYSQL");

        console.log(error);

        console.log("--------------------------------");

    }else{

        console.log("--------------------------------");

        console.log("MySQL conectado correctamente");

        console.log("--------------------------------");

    }

});

/*====================================================
                RUTA DE PRUEBA
====================================================*/

app.get("/",(req,res)=>{

    res.send(

        "Servidor HogarEnergy funcionando correctamente."

    );

});

/*====================================================
            REGISTRAR PUBLICIDAD
====================================================*/

app.post(

"/api/publicidad",

(req,res)=>{

const{

nombre,

empresa,

celular,

correo,

plan

}=req.body;

/*-----------------------------
VALOR DEL PLAN
------------------------------*/

let valor=0;

switch(plan){

case "PLAN_1":

valor=70000;

break;

case "PLAN_2":

valor=120000;

break;

case "PLAN_3":

valor=200000;

break;

case "PLAN_4":

valor=500000;

break;

case "PLAN_5":

valor=800000;

break;

default:

valor=0;

}

/*-----------------------------
INSERT MYSQL
------------------------------*/

const sql=

`

INSERT INTO publicidad

(

nombre,

empresa,

celular,

correo,

plan,

valor,

estado

)

VALUES

(

?,?,?,?,?,?,?

)

`;

conexion.query(

sql,

[

nombre,

empresa,

celular,

correo,

plan,

valor,

"Pendiente"

],

(error)=>{

if(error){

console.log(error);

return res.status(500).json({

mensaje:"Error guardando publicidad."

});

}

res.json({

mensaje:

"Publicidad registrada correctamente."

});

}

);

});
/*====================================================
            CONSULTAR PUBLICIDAD
====================================================*/

app.get(

"/api/publicidad",

(req,res)=>{

const sql=

`

SELECT *

FROM publicidad

ORDER BY id DESC

`;

conexion.query(

sql,

(error,resultado)=>{

if(error){

console.log(error);

return res.status(500).json({

mensaje:"Error consultando publicidad."

});

}

res.json(resultado);

}

);

});

/*====================================================
        APROBAR PUBLICIDAD
====================================================*/

app.put(

"/api/publicidad/aprobar/:id",

(req,res)=>{

const id=req.params.id;

const sql=

`

UPDATE publicidad

SET estado='Aprobado'

WHERE id=?

`;

conexion.query(

sql,

[id],

(error)=>{

if(error){

console.log(error);

return res.status(500).json({

mensaje:"Error actualizando."

});

}

res.json({

mensaje:"Publicidad aprobada."

});

}

);

});

/*====================================================
        RECHAZAR PUBLICIDAD
====================================================*/

app.put(

"/api/publicidad/rechazar/:id",

(req,res)=>{

const id=req.params.id;

const sql=

`

UPDATE publicidad

SET estado='Rechazado'

WHERE id=?

`;

conexion.query(

sql,

[id],

(error)=>{

if(error){

console.log(error);

return res.status(500).json({

mensaje:"Error actualizando."

});

}

res.json({

mensaje:"Publicidad rechazada."

});

}

);

});
/*====================================================
            REGISTRAR ASESORÍA
====================================================*/

app.post(

"/api/asesoria",

(req,res)=>{

const{

nombre,

celular,

correo,

ciudad,

tipo,

descripcion

}=req.body;

const sql=

`

INSERT INTO asesorias

(

nombre,

celular,

correo,

ciudad,

tipo,

descripcion,

estado

)

VALUES

(

?,?,?,?,?,?,?

)

`;

conexion.query(

sql,

[

nombre,

celular,

correo,

ciudad,

tipo,

descripcion,

"Pendiente"

],

(error)=>{

if(error){

console.log(error);

return res.status(500).json({

mensaje:"Error guardando la asesoría."

});

}

res.json({

mensaje:"Solicitud registrada correctamente."

});

}

);

});

/*====================================================
            CONSULTAR ASESORÍAS
====================================================*/

app.get(

"/api/asesorias",

(req,res)=>{

const sql=

`

SELECT *

FROM asesorias

ORDER BY id DESC

`;

conexion.query(

sql,

(error,resultado)=>{

if(error){

console.log(error);

return res.status(500).json({

mensaje:"Error consultando asesorías."

});

}

res.json(resultado);

}

);

});

/*====================================================
        APROBAR ASESORÍA
====================================================*/

app.put(

"/api/asesoria/aprobar/:id",

(req,res)=>{

const id=req.params.id;

const sql=

`

UPDATE asesorias

SET estado='Aprobado'

WHERE id=?

`;

conexion.query(

sql,

[id],

(error)=>{

if(error){

console.log(error);

return res.status(500).json({

mensaje:"Error actualizando."

});

}

res.json({

mensaje:"Asesoría aprobada."

});

}

);

});

/*====================================================
        RECHAZAR ASESORÍA
====================================================*/

app.put(

"/api/asesoria/rechazar/:id",

(req,res)=>{

const id=req.params.id;

const sql=

`

UPDATE asesorias

SET estado='Rechazado'

WHERE id=?

`;

conexion.query(

sql,

[id],

(error)=>{

if(error){

console.log(error);

return res.status(500).json({

mensaje:"Error actualizando."

});

}

res.json({

mensaje:"Asesoría rechazada."

});

}

);

});
/*====================================================
            REGISTRAR ASESORÍA
====================================================*/

app.post(

"/api/asesoria",

(req,res)=>{

const{

nombre,

celular,

correo,

ciudad,

tipo,

descripcion

}=req.body;

const sql=

`

INSERT INTO asesorias

(

nombre,

celular,

correo,

ciudad,

tipo,

descripcion,

estado

)

VALUES

(

?,?,?,?,?,?,?

)

`;

conexion.query(

sql,

[

nombre,

celular,

correo,

ciudad,

tipo,

descripcion,

"Pendiente"

],

(error)=>{

if(error){

console.log(error);

return res.status(500).json({

mensaje:"Error guardando la asesoría."

});

}

res.json({

mensaje:"Solicitud registrada correctamente."

});

}

);

});

/*====================================================
            CONSULTAR ASESORÍAS
====================================================*/

app.get(

"/api/asesorias",

(req,res)=>{

const sql=

`

SELECT *

FROM asesorias

ORDER BY id DESC

`;

conexion.query(

sql,

(error,resultado)=>{

if(error){

console.log(error);

return res.status(500).json({

mensaje:"Error consultando asesorías."

});

}

res.json(resultado);

}

);

});

/*====================================================
        APROBAR ASESORÍA
====================================================*/

app.put(

"/api/asesoria/aprobar/:id",

(req,res)=>{

const id=req.params.id;

const sql=

`

UPDATE asesorias

SET estado='Aprobado'

WHERE id=?

`;

conexion.query(

sql,

[id],

(error)=>{

if(error){

console.log(error);

return res.status(500).json({

mensaje:"Error actualizando."

});

}

res.json({

mensaje:"Asesoría aprobada."

});

}

);

});

/*====================================================
        RECHAZAR ASESORÍA
====================================================*/

app.put(

"/api/asesoria/rechazar/:id",

(req,res)=>{

const id=req.params.id;

const sql=

`

UPDATE asesorias

SET estado='Rechazado'

WHERE id=?

`;

conexion.query(

sql,

[id],

(error)=>{

if(error){

console.log(error);

return res.status(500).json({

mensaje:"Error actualizando."

});

}

res.json({

mensaje:"Asesoría rechazada."

});

}

);

});
const PUERTO = 3000;

app.listen(PUERTO, () => {

    console.log("======================================");
    console.log("   HOGARENERGY BACKEND INICIADO");
    console.log("======================================");
    console.log(`Servidor ejecutándose en el puerto ${PUERTO}`);
    console.log("http://localhost:3000");
    console.log("======================================");

});