var connection = require('../conexion/index')
//creamos un objeto para ir almacenando todo lo que necesitemos
var ProveedoresModel = {};

//---------------------------------------------------------------
//obtenemos todos los proveedores
ProveedoresModel.getProveedoress = function (callback)
{
    
    if (connection)
    {
        var sql = "SELECT id_proveedor "
                        +", nombre_proveedor "
                        +", telefono_proveedor  "
                        +", direccion_proveedor  "
                        +", vigencia_proveedor  "
                        +" FROM proveedores  "
                        +" ORDER BY nombre_proveedor ;";
        
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
//obtenemos un proveedor por su id
ProveedoresModel.getProveedores = function (id, callback)
{
    
    if (connection)
    {
        var sql = "SELECT id_proveedor "
                        +", nombre_proveedor "
                        +", telefono_proveedor  "
                        +", direccion_proveedor  "
                        +", vigencia_proveedor  "
                        +" FROM proveedores  "
                        +" WHERE id_proveedor  = " 
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
//Informe Compras por Proveedor y periodo de tiempo
ProveedoresModel.PostInfomeProveedores = function (parametros, callback)
{
    
    if (connection)
    {
        var sql = "SELECT FC.id_factura_compra "
                        +", P.nombre_proveedor "
                        +", FC.forma_de_pago  "
                        +", FC.estado_factura_compra estado_compra  "
                        +", FC.fecha_factura_compra  "
                        +", I.fecha_ingreso "
                        +", I.fecha_salida "
                        +" FROM factura_compras FC  "
                        +"INNER JOIN proveedores P ON (FC.id_proveedor=P.id_proveedor)"
	                    +"INNER JOIN inventarios I ON (FC.fecha_factura_compra=I.fecha_ingreso)"
                        +" WHERE P.nombre_proveedor LIKE  " + connection.escape(parametros.nombre_proveedor) 
                        + "and FC.fecha_factura_compra BETWEEN " + connection.escape(parametros.fechIn) 
                        + " AND " + connection.escape(parametros.fechFin)
                        + " ORDER BY FC.fecha_factura_compra ;";

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
//añadir un nuevo proveedor
ProveedoresModel.insertProveedores = function (ProveedoresData, callback)
{
    if (connection)
    {
        //console.log(TipDocData)
        var sql = "INSERT INTO proveedores SET ?";
        //console.log("  tal  " + sql);

        connection.query(sql, ProveedoresData, function (error, result)
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
//actualizar un proveedor
ProveedoresModel.updateProveedores = function (ProveedoresData, callback)
 {
    //console.log(" 32  tal  ");

    if (connection)
    {
        var sql = "UPDATE proveedores SET nombre_proveedor = " + connection.escape(ProveedoresData.nombre_proveedor)
                    + ", telefono_proveedor = " + connection.escape(ProveedoresData.telefono_proveedor)
                    + ", direccion_proveedor = " + connection.escape(ProveedoresData.direccion_proveedor)
                    + ", vigencia_proveedor = " + connection.escape(ProveedoresData.vigencia_proveedor)
                    + " WHERE  id_proveedor  =  " + connection.escape(ProveedoresData.id_proveedor)+";";
        
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
module.exports = ProveedoresModel;