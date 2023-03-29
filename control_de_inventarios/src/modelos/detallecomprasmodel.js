var connection = require('../conexion/index')
//creamos un objeto para ir almacenando todo lo que necesitemos
var DetalleComprasModel = {};

//---------------------------------------------------------------
//obtenemos todos los detalles de compra
DetalleComprasModel.getDetalleComprass = function (callback)
{
    
    if (connection)
    {
        var sql = "SELECT DC.id_detalle_compra "
                        +", A.nombre_articulo "
                        +", M.nombre_marca  "
                        +", P.nombre_proveedor  "
                        +", DC.cantidad_factura  "
                        +", DC.precio_compra  "
                        +" FROM `detalle_compras` as DC  "
                        +" INNER JOIN `articulos` as A ON (A.id_articulo=DC.id_articulo) "
                        +" INNER JOIN `marcas` as M ON (A.marca_articulo=M.id_marca) "
                        +" INNER JOIN `factura_compras` as FC ON (DC.id_factura_compra=FC.id_factura_compra) "
                        +" INNER JOIN `proveedores` as P ON (P.id_proveedor=FC.id_proveedor) "
                        +" ORDER BY A.nombre_articulo ;";
        
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
//obtenemos un detalle de compra por su id
DetalleComprasModel.getDetalleCompras = function (id, callback)
{
    
    if (connection)
    {
        var sql = "SELECT DC.id_detalle_compra "
                        +", A.nombre_articulo "
                        +", M.nombre_marca  "
                        +", P.nombre_proveedor  "
                        +", DC.cantidad_factura  "
                        +", DC.precio_compra  "
                        +" FROM `detalle_compras` as DC  "
                        +" INNER JOIN `articulos` as A ON (A.id_articulo=DC.id_articulo) "
                        +" INNER JOIN `marcas` as M ON (A.marca_articulo=M.id_marca) "
                        +" INNER JOIN `factura_compras` as FC ON (DC.id_factura_compra=FC.id_factura_compra) "
                        +" INNER JOIN `proveedores` as P ON (P.id_proveedor=FC.id_proveedor) "
                        +" WHERE id_detalle_compra = " 
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
//añadir un nuevo tipo de documento
DetalleComprasModel.insertDetalleCompras = function (DetalleComprasData, callback)
{
    if (connection)
    {
        //console.log(TipDocData)
        var sql = "INSERT INTO detalle_compras SET ?";
        //console.log("  tal  " + sql);

        connection.query(sql, DetalleComprasData, function (error, result)
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
//actualizar un detalle de compra
DetalleComprasModel.updateDetalleCompras = function (DetalleComprasData, callback)
 {
    //console.log(" 32  tal  ");

    if (connection)
    {
        var sql = "UPDATE detalle_compras SET cantidad_factura = " + connection.escape(DetalleComprasData.cantidad_factura)
                    + ", precio_compra = " + connection.escape(DetalleComprasData.precio_compra)
                    + ", id_articulo = " + connection.escape(DetalleComprasData.id_articulo)
                    + ", id_factura_compra = " + connection.escape(DetalleComprasData.id_factura_compra)
                    + " WHERE  id_detalle_compra  =  " + connection.escape(DetalleComprasData.id_detalle_compra)+";";
        
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
module.exports = DetalleComprasModel;