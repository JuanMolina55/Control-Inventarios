var connection = require('../conexion/index')
//creamos un objeto para ir almacenando todo lo que necesitemos
var InventariosModel = {};

//---------------------------------------------------------------
//obtenemos todos los inventarios
InventariosModel.getInventarioss = function (callback)
{
    
    if (connection)
    {
        var sql = "SELECT id_inventario "
                        +", A.nombre_articulo "
                        +", M.nombre_marca"
                        +", DATE_FORMAT(fecha_ingreso, '%Y-%m-%d') AS fecha_ingreso "
                        +", DATE_FORMAT(fecha_salida, '%Y-%m-%d') AS fecha_salida  "
                        +", cantidad_articulos  "
                        +", precio_venta  "
                        +", max_articulos_inventario  "
                        +", min_articulos_inventario  "
                        +", ubicacion_producto  "
                        +", tiempo_entrega  "
                        +" FROM inventarios as I "
                        +" INNER JOIN articulos as A ON (A.id_articulo=I.id_articulo)"
                        +" INNER JOIN marcas as M ON (A.marca_articulo=M.id_marca)"
                        +" ORDER BY id_inventario ;";
        
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
//obtenemos un inventario por su id
InventariosModel.getInventarios = function (id, callback)
{
    
    if (connection)
    {
        var sql = "SELECT id_inventario "
                        +", A.nombre_articulo "
                        +", M.nombre_marca "
                        +", DATE_FORMAT(fecha_ingreso, '%Y-%m-%d') AS fecha_ingreso "
                        +", DATE_FORMAT(fecha_salida, '%Y-%m-%d') AS fecha_salida  "
                        +", cantidad_articulos  "
                        +", precio_venta  "
                        +", max_articulos_inventario  "
                        +", min_articulos_inventario  "
                        +", ubicacion_producto  "
                        +", tiempo_entrega  "
                        +" FROM inventarios as I "
                        +" INNER JOIN articulos as A ON (A.id_articulo=I.id_articulo)"
                        +" INNER JOIN marcas as M ON (A.marca_articulo=M.id_marca)"
                        +" WHERE id_inventario  = " 
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
//añadir un nuevo inventario
InventariosModel.insertInventarios = function (InventariosData, callback)
{
    if (connection)
    {
        //console.log(TipDocData)
        var sql = "INSERT INTO inventarios SET ?";
        //console.log("  tal  " + sql);

        connection.query(sql, InventariosData, function (error, result)
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
//actualizar un inventario
InventariosModel.updateInventarios = function (InventariosData, callback)
 {
    //console.log(" 32  tal  ");

    if (connection)
    {
        var sql = "UPDATE inventarios SET fecha_ingreso = " + connection.escape(InventariosData.fecha_ingreso)
                    + ", id_articulo = " + connection.escape(InventariosData.id_articulo)
                    + ", fecha_salida = " + connection.escape(InventariosData.fecha_salida)
                    + ", cantidad_articulos = " + connection.escape(InventariosData.cantidad_articulos)
                    + ", precio_venta = " + connection.escape(InventariosData.precio_venta)
                    + ", max_articulos_inventario = " + connection.escape(InventariosData.max_articulos_inventario)
                    + ", min_articulos_inventario = " + connection.escape(InventariosData.min_articulos_inventario)
                    + ", ubicacion_producto = " + connection.escape(InventariosData.ubicacion_producto)
                    + ", tiempo_entrega = " + connection.escape(InventariosData.tiempo_entrega)
                    + " WHERE  id_inventario  =  " + connection.escape(InventariosData.id_inventario)+";";
        
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
module.exports = InventariosModel;