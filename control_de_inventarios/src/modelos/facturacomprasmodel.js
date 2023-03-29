var connection = require('../conexion/index')
//creamos un objeto para ir almacenando todo lo que necesitemos
var FacturaComprasModel = {};

//---------------------------------------------------------------
//obtenemos todos las facturas
FacturaComprasModel.getFacturaComprass = function (callback)
{
    
    if (connection)
    {
        var sql = "SELECT id_factura_compra "
                        +", P.nombre_proveedor "
                        +", DATE_FORMAT(fecha_factura_compra, '%Y-%m-%d') AS fecha_factura_compra  "
                        +", forma_de_pago  "
                        +", estado_factura_compra  "
                        +" FROM factura_compras as F "
                        +" INNER JOIN `proveedores` as P ON (P.id_proveedor=F.id_proveedor)"
                        +" ORDER BY P.nombre_proveedor ;";
        
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
//obtenemos una factura
FacturaComprasModel.getFacturaCompras = function (id, callback)
{
    
    if (connection)
    {
        var sql = "SELECT id_factura_compra "
                        +", P.nombre_proveedor "
                        +", DATE_FORMAT(fecha_factura_compra, '%Y-%m-%d') AS fecha_factura_compra "
                        +", forma_de_pago  "
                        +", estado_factura_compra  "
                        +" FROM factura_compras as F "
                        +" INNER JOIN `proveedores` as P ON (P.id_proveedor=F.id_proveedor)"
                        +" WHERE id_factura_compra  = " 
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
//añadir una nueva factura
FacturaComprasModel.insertFacturaCompras = function (FacturaComprasData, callback)
{
    if (connection)
    {
        //console.log(TipDocData)
        var sql = "INSERT INTO factura_compras SET ?";
        //console.log("  tal  " + sql);

        connection.query(sql, FacturaComprasData, function (error, result)
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
//actualizar una factura de compra
FacturaComprasModel.updateFacturaCompras = function (FacturaComprasData, callback)
 {
    //console.log(" 32  tal  ");

    if (connection)
    {
        var sql = "UPDATE factura_compras SET id_proveedor = " + connection.escape(FacturaComprasData.id_proveedor)
                    + ", fecha_factura_compra = " + connection.escape(FacturaComprasData.fecha_factura_compra)
                    + ", forma_de_pago = " + connection.escape(FacturaComprasData.forma_de_pago)
                    + ", estado_factura_compra = " + connection.escape(FacturaComprasData.estado_factura_compra)
                    + " WHERE  id_factura_compra  =  " + connection.escape(FacturaComprasData.id_factura_compra)+";";
        
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
module.exports = FacturaComprasModel;