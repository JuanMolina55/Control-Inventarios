var connection = require('../conexion/index')
//creamos un objeto para ir almacenando todo lo que necesitemos
var MarcasModel = {};

//---------------------------------------------------------------
//obtenemos todas las marcas
MarcasModel.getMarcass = function (callback)
{
    
    if (connection)
    {
        var sql = "SELECT id_marca "
                        +", nombre_marca "
                        +", pais_origen_marca  "
                        +", pagina_marca  "
                        +" FROM marcas  "
                        +" ORDER BY nombre_marca ;";
        
        connection.query(sql, function (error, rows) 
        {
            if (error)
            {
                throw error;
            }
            else
            {
                //callback(null, rows);
                callback(null, JSON.stringify(rows));
            }
        });
       // console.log("25  " );
    }
}

//---------------------------------------------------------------
//obtenemos una marca por su id
MarcasModel.getMarcas = function (id, callback)
{
    
    if (connection)
    {
        var sql = "SELECT id_marca "
                        +", nombre_marca "
                        +", pais_origen_marca  "
                        +", pagina_marca  "
                        +" FROM marcas  "
                        +" WHERE id_marca  = " 
                        + connection.escape(id) + ";";

        //console.log(id);
        //console.log(" 31  tal  " );
        connection.query(sql, function (error, row)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, row);
            }
        });
    }
}

//---------------------------------------------------------------
//añadir una nueva marca
MarcasModel.insertMarcas = function (MarcasData, callback)
{
    if (connection)
    {
        //console.log(TipDocData)
        var sql = "INSERT INTO marcas SET ?";
        //console.log("  tal  " + sql);

        connection.query(sql, MarcasData, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null,{"msg": "Registro Insertado"});
            }
        });
    }
}

//---------------------------------------------------------------
//actualizar una marca
MarcasModel.updateMarcas = function (MarcasData, callback)
 {
    //console.log(" 32  tal  ");

    if (connection)
    {
        var sql = "UPDATE marcas SET nombre_marca = " + connection.escape(MarcasData.nombre_marca)
                    + ", pais_origen_marca = " + connection.escape(MarcasData.pais_origen_marca)
                    + ", pagina_marca = " + connection.escape(MarcasData.pagina_marca)
                    + " WHERE  id_marca  =  " + connection.escape(MarcasData.id_marca)+";";
        
        ///console.log(" 37  tal  " + sql);

        connection.query(sql, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg": "Registro Actualizado"});
            }
        });
    }
}

//---------------------------------------------------------------
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = MarcasModel;