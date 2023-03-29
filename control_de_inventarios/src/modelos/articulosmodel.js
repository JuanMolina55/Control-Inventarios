var connection = require('../conexion/index')
//creamos un objeto para ir almacenando todo lo que necesitemos
var ArticulosModel = {};

//---------------------------------------------------------------
//obtenemos todos los articulos
ArticulosModel.getArticuloss = function (callback)
{
    
    if (connection)
    {
        var sql = "SELECT id_articulo "
                        +", m.nombre_marca "
                        +", nombre_articulo  "
                        +", unidades_articulo  "
                        +", vigencia_articulo  "
                        +" FROM articulos AS a "
                        + "INNER JOIN marcas as m on(m.id_marca=a.marca_articulo)"
                        +" ORDER BY nombre_articulo ;";
        
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
//obtenemos un articulo
ArticulosModel.getArticulos = function (id, callback)
{
    
    if (connection)
    {
        var sql = "SELECT id_articulo "
                        +", m.nombre_marca "
                        +", nombre_articulo  "
                        +", unidades_articulo  "
                        +", vigencia_articulo  "
                        +" FROM articulos AS a "
                        + "INNER JOIN marcas AS m on(m.id_marca=a.marca_articulo)"
                        +" WHERE id_articulo  = " 
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
//Informe Existencias por Articulo y periodo de tiempo
ArticulosModel.getInformeArticulos = function (articulo, fechIn, fechFin, callback)
{
    
    if (connection)
    {
        var sql = "SELECT A.id_articulo "
                        +", A.nombre_articulo "
                        +", M.nombre_marca  "
                        +", I.cantidad_articulos "
                        +", I.fecha_ingreso "
                        +", I.fecha_salida "
                        +" FROM articulos A "
                        +"INNER JOIN marcas M ON (A.marca_articulo=M.id_marca) "
                        +"INNER JOIN inventarios I ON (A.id_articulo=I.id_articulo) "
                        +" WHERE A.nombre_articulo  LIKE " + connection.escape(articulo)
                        + "and I.fecha_ingreso BETWEEN " + connection.escape(fechIn) 
                        + " AND " + connection.escape(fechFin)
                        + " ORDER BY I.fecha_ingreso ;";

        //console.log(id);
        //console.log(" 31  tal  " );
        connection.query(sql, function (error, rows)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
                //callback(null, JSON.stringify(rows));
            }
        });
    }
}

//---------------------------------------------------------------
//añadir un nuevo articulo
ArticulosModel.insertArticulos = function (ArticulosData, callback)
{
    if (connection)
    {
        //console.log(TipDocData)
        var sql = "INSERT INTO articulos SET ?";
        //console.log("  tal  " + sql);

        connection.query(sql, ArticulosData, function (error, result)
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
//actualizar un articulo
ArticulosModel.updateArticulos = function (ArticulosData, callback)
 {
    //console.log(" 32  tal  ");

    if (connection)
    {
        var sql = "UPDATE articulos SET marca_articulo = " + connection.escape(ArticulosData.marca_articulo)
                    + ", nombre_articulo = " + connection.escape(ArticulosData.nombre_articulo)
                    + ", unidades_articulo = " + connection.escape(ArticulosData.unidades_articulo)
                    + ", vigencia_articulo = " + connection.escape(ArticulosData.vigencia_articulo)
                    + " WHERE  id_articulo  =  " + connection.escape(ArticulosData.id_articulo)+";";
        
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
module.exports = ArticulosModel;