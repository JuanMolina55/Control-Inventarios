//obtenemos el modelo TipDocModel con toda la funcionalidad
var ArticulosModel = require('../modelos/articulosmodel');
var express = require('express');
var router = express.Router();

//creamos el ruteo de la clase
module.exports = function ()
{

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todos los tipos de documentos
    router.get("/", function (req, res)
    {
        
        ArticulosModel.getArticuloss(function (error, data)
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
            ArticulosModel.getArticulos(id, function (error, data)
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
    //Muestra el informe articulo y periodo de tiempo 
    router.get("/:articulo/:fechIn/:fechFin", function (req, res)
    {
        var articulo = req.params.articulo;
        var fechIn = req.params.fechIn;
        var fechFin = req.params.fechFin;
        {
            ArticulosModel.getInformeArticulos(articulo, fechIn, fechFin, function (error, data)
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
        /*else //si hay algún error
        {
            res.status(500).json({ "msg": "error" });
        }*/
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/", function (req, res)
    {
        //creamos un objeto Json con los datos del articulo
        var ArticulosData =
            {
                id_articulo: null,
                marca_articulo: req.body.marca_articulo,
                nombre_articulo: req.body.nombre_articulo,
                unidades_articulo: req.body.unidades_articulo,
                vigencia_articulo: req.body.vigencia_articulo,
            };


        //usamos la funcion para insertar
        ArticulosModel.insertArticulos(ArticulosData, function (error, data)
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
        var ArticulosData =
            {
                id_articulo: req.body.id_articulo,
                marca_articulo: req.body.marca_articulo,
                nombre_articulo: req.body.nombre_articulo,
                unidades_articulo: req.body.unidades_articulo,
                vigencia_articulo: req.body.vigencia_articulo,
            };


        //usamos la funcion para actualizar
        ArticulosModel.updateArticulos(ArticulosData, function (error, data)
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


    //exportamos el objeto para tenerlo disponible en EL APP
    return router;
}
