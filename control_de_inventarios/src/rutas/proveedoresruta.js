//obtenemos el modelo TipDocModel con toda la funcionalidad
var ProveedoresModel = require('../modelos/proveedoresmodel');
var express = require('express');
var router = express.Router();

//creamos el ruteo de la clase
module.exports = function ()
{

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todos los tipos de documentos
    router.get("/", function (req, res)
    {
        
        ProveedoresModel.getProveedoress(function (error, data)
        {
            res.status(200).json(data);
        });
        //console.log("24  " );

        //console.log( " ---  "+ res );
    });

    //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra el tipo de documento solicitado
    router.get("/:id", function (req, res)
    {
        var id = req.params.id;

        //solo actualizamos si la id es un número
        if (!isNaN(id))
        {
            ProveedoresModel.getProveedores(id, function (error, data)
            {
                //si el tipo de documento existe lo mostramos en formato json
                if (typeof data !== 'undefined' && data.length > 0)
                {
                    res.status(200).json(data);
                }
                //en otro caso mostramos una respuesta conforme no existe
                else
                {
                    res.json(404, 
                    { 
                        "msg": "Registro no Existe" 
                    });
                }
            });
        }
        else //si hay algún error
        {
            res.status(500).json({ "msg": "error" });
        }
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/", function (req, res)
    {
        //creamos un objeto Json con los datos del tipo de documento
        var ProveedoresData =
            {
                id_proveedor: null,
                nombre_proveedor: req.body.nombre_proveedor,
                telefono_proveedor: req.body.telefono_proveedor,
                direccion_proveedor: req.body.direccion_proveedor,
                vigencia_proveedor: req.body.vigencia_proveedor,
            };


        //usamos la funcion para insertar
        ProveedoresModel.insertProveedores(ProveedoresData, function (error, data)
        {
            //se muestra el mensaje correspondiente
            if (data)
            {
                res.status(200).json(data);
            }
            else
            {
                res.status(500).send({ error: "boo:(" });
            }
        });
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
    router.put("/", function (req, res)
    {
        //almacenamos los datos de la petición en un objeto
        //console.log(" 38");
        var ProveedoresData =
            {
                id_proveedor: req.body.id_proveedor,
                nombre_proveedor: req.body.nombre_proveedor,
                telefono_proveedor: req.body.telefono_proveedor,
                direccion_proveedor: req.body.direccion_proveedor,
                vigencia_proveedor: req.body.vigencia_proveedor,
            };


        //usamos la funcion para actualizar
        ProveedoresModel.updateProveedores(ProveedoresData, function (error, data)
        {
            //se muestra el mensaje correspondiente
            if (data && data.msg)
            {
                res.status(200).json(data);
            }
            else
            {
                res.status(500).send(
                { 
                    error: "boo:(" 
                });
            }
        });
    });


    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/Informe/", function (req, res)
    {
        //creamos un objeto Json con los datos del tipo de documento
        var parametros =
            {
                nombre_proveedor: req.body.nombre_proveedor,
                fechIn: req.body.fechIn,
                fechFin: req.body.fechFin
            };


        //usamos la funcion para insertar
        ProveedoresModel.PostInfomeProveedores(parametros, function (error, data)
        {
            //se muestra el mensaje correspondiente
            if (data)
            {
                res.status(200).json(data);
            }
            else
            {
                res.status(500).send({ error: "boo:(" });
            }
        });
    });

    //exportamos el objeto para tenerlo disponible en EL APP
    return router;
}