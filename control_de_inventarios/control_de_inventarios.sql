-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-11-2021 a las 20:19:57
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `control_de_inventarios`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE `articulos` (
  `id_articulo` int(11) NOT NULL,
  `marca_articulo` int(11) NOT NULL,
  `nombre_articulo` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `unidades_articulo` int(11) NOT NULL,
  `vigencia_articulo` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulos` (`id_articulo`, `marca_articulo`, `nombre_articulo`, `unidades_articulo`, `vigencia_articulo`) VALUES
(1, 1, 'Cereal', 4, 1),
(2, 3, 'Maquina afeitadora', 5, 1),
(3, 2, 'Bebida gaseosa', 4, 1),
(4, 4, 'Galletas', 2, 1),
(5, 5, 'Café', 3, 1),
(6, 6, 'Arroz', 50, 1),
(7, 3, 'Desodorante', 5, 1),
(8, 7, 'Azúcar', 10, 1),
(9, 11, 'Pasta de dientes', 5, 1),
(10, 12, 'Pasta de dientes', 8, 1),
(11, 13, 'Gomas', 8, 1),
(12, 8, 'Gaseosas', 5, 1),
(13, 14, 'Avena', 38, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ct_tipos_documentos`
--

CREATE TABLE `ct_tipos_documentos` (
  `id_tip_doc` int(11) NOT NULL,
  `tipo_documento` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `iniciales_tip_doc` varchar(3) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Este catalogo es el de los tipos de documento de los usuarios ';

--
-- Volcado de datos para la tabla `ct_tipos_documentos`
--

INSERT INTO `ct_tipos_documentos` (`id_tip_doc`, `tipo_documento`, `iniciales_tip_doc`) VALUES
(1, 'Cedula', 'CC'),
(2, 'Cedula Extranjería', 'CE'),
(3, 'Pasaporte', 'PA'),
(4, 'Tarjeta Identidad', 'TI'),
(5, 'Nit', 'NIT'),
(6, 'Rup', 'RUP'),
(7, 'Tarjeta Udec', 'TU'),
(8, 'Registro Civil', 'RC'),
(9, 'Cece', 'CEE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_compras`
--

CREATE TABLE `detalle_compras` (
  `id_detalle_compra` int(11) NOT NULL,
  `id_articulo` int(11) NOT NULL,
  `id_factura_compra` int(11) NOT NULL,
  `cantidad_factura` int(11) DEFAULT NULL,
  `precio_compra` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `detalle_compras`
--

INSERT INTO `detalle_compras` (`id_detalle_compra`, `id_articulo`, `id_factura_compra`, `cantidad_factura`, `precio_compra`) VALUES
(1, 1, 1, 4, '17586'),
(2, 4, 2, 3, '9500'),
(7, 2, 2, 5, '57238'),
(8, 3, 3, 4, '87542'),
(9, 6, 5, 10, '35000'),
(10, 8, 6, 10, '20000'),
(11, 10, 8, 8, '17000'),
(12, 11, 10, 8, '38000'),
(13, 13, 11, 12, '1800');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura_compras`
--

CREATE TABLE `factura_compras` (
  `id_factura_compra` int(11) NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  `fecha_factura_compra` date DEFAULT NULL,
  `forma_de_pago` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `estado_factura_compra` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `factura_compras`
--

INSERT INTO `factura_compras` (`id_factura_compra`, `id_proveedor`, `fecha_factura_compra`, `forma_de_pago`, `estado_factura_compra`) VALUES
(1, 1, '2020-05-21', 'Efectivo', 'Paga'),
(2, 3, '2019-08-14', 'Efectivo', 'Paga'),
(3, 2, '2021-02-09', 'Efectivo', 'Paga'),
(4, 1, '2017-11-28', 'Efectivo', 'Pagada'),
(5, 4, '2021-10-18', 'Efectivo', 'Paga'),
(6, 5, '2018-07-21', 'Efectivo', 'Pagada'),
(7, 4, '2019-05-11', 'Efectivo', 'Pagada'),
(8, 3, '2018-03-16', 'Efectivo', 'Pagada'),
(9, 2, '2020-05-02', 'Efectivo', 'Pagada'),
(10, 6, '2021-10-05', 'Efectivo', 'Pagada'),
(11, 7, '2021-11-24', 'Efectivo', 'Pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventarios`
--

CREATE TABLE `inventarios` (
  `id_inventario` int(11) NOT NULL,
  `id_articulo` int(11) NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `fecha_salida` date DEFAULT NULL,
  `cantidad_articulos` int(11) NOT NULL,
  `precio_venta` int(11) DEFAULT NULL,
  `max_articulos_inventario` int(11) NOT NULL,
  `min_articulos_inventario` int(11) DEFAULT NULL,
  `ubicacion_producto` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `tiempo_entrega` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `inventarios`
--

INSERT INTO `inventarios` (`id_inventario`, `id_articulo`, `fecha_ingreso`, `fecha_salida`, `cantidad_articulos`, `precio_venta`, `max_articulos_inventario`, `min_articulos_inventario`, `ubicacion_producto`, `tiempo_entrega`) VALUES
(1, 1, '2015-05-21', '2015-05-25', 4, 21103, 20, 3, 'A1', 4),
(2, 2, '2019-08-14', '2019-08-14', 5, 68685, 15, 2, 'C2', 7),
(3, 3, '2021-02-09', '2021-02-09', 4, 105050, 30, 3, 'B3', 8),
(4, 4, '2019-08-14', '2019-08-14', 2, 25900, 10, 2, 'C2', 6),
(5, 5, '2018-09-13', '2018-09-25', 4, 21103, 20, 3, 'A1', 4),
(6, 2, '2018-03-16', '2018-03-19', 4, 21103, 20, 3, 'A1', 4),
(7, 11, '2021-10-09', '2021-10-21', 8, 45000, 20, 3, 'D4', 5),
(8, 8, '2018-07-21', '2018-07-21', 5, 16000, 18, 2, 'C9', 8),
(9, 6, '2019-05-11', '2019-05-14', 9, 37000, 30, 5, 'A3', 7),
(10, 3, '2019-06-13', '2019-06-16', 5, 30000, 18, 3, 'C9', 5),
(11, 13, '2021-11-24', '2021-12-28', 8, 2200, 24, 3, 'D4', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE `marcas` (
  `id_marca` int(11) NOT NULL,
  `nombre_marca` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `pais_origen_marca` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `pagina_marca` varchar(80) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`id_marca`, `nombre_marca`, `pais_origen_marca`, `pagina_marca`) VALUES
(1, 'Kellogg\'s', 'Colombia', 'https://www.kelloggs.es/es_ES/home.html'),
(2, 'CocaCola', 'Colombia', 'www.coca-cola.com.co/es/home'),
(3, 'Gillette', 'Colombia', 'https://gillette.com.mx/es-mx'),
(4, 'Oreo', 'Colombia', 'https://www.oreo.com'),
(5, 'Nescafé', 'Colombia', 'https://www.nescafe.com/co/'),
(6, 'Diana', 'Colombia', 'www.diana.com.co/es/home'),
(7, 'Riopaila', 'Colombia', 'www.riopaila-castilla.com'),
(8, 'Postobón', 'Colombia', 'www.postobon.com'),
(11, 'Colgate', 'Colombia', 'www.colgate.com/es-co'),
(12, 'Fluocardent', 'México', 'www.fluocardent.com'),
(13, 'Grissly', 'Mexico', 'www.grissly.com'),
(14, 'Don Pancho', 'Mexico', 'www.donpancho.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id_proveedor` int(11) NOT NULL,
  `nombre_proveedor` varchar(70) COLLATE utf8_spanish_ci NOT NULL,
  `telefono_proveedor` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `direccion_proveedor` varchar(80) COLLATE utf8_spanish_ci DEFAULT NULL,
  `vigencia_proveedor` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id_proveedor`, `nombre_proveedor`, `telefono_proveedor`, `direccion_proveedor`, `vigencia_proveedor`) VALUES
(1, 'Quala', '314 2075980', 'Ac. 100 # 23 10, Bogotá', 1),
(2, 'Coca-Cola', '7845935', 'Cl. 25 # 44a-06, Bogotá', 1),
(3, 'Corbeta', '601-3649752', 'Cl. 11 # 31a-42, Bogotá', 1),
(4, 'Delicious Sas', '322 2177474', 'Cra. 7 #171, Bogotá', 1),
(5, 'Incauca', '8675214', 'Carrera 9 # 28 - 103', 1),
(6, 'Colombina', '569872', 'Calle 9 # 20- 103', 1),
(7, 'Santa Paloma', '8623408', 'vereda la valsa', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`id_articulo`),
  ADD KEY `FK_articulos_marcas` (`marca_articulo`);

--
-- Indices de la tabla `ct_tipos_documentos`
--
ALTER TABLE `ct_tipos_documentos`
  ADD PRIMARY KEY (`id_tip_doc`);

--
-- Indices de la tabla `detalle_compras`
--
ALTER TABLE `detalle_compras`
  ADD PRIMARY KEY (`id_detalle_compra`),
  ADD KEY `FK_detalle_compras_articulos` (`id_articulo`),
  ADD KEY `FK_detalle_compras_factura_compras` (`id_factura_compra`);

--
-- Indices de la tabla `factura_compras`
--
ALTER TABLE `factura_compras`
  ADD PRIMARY KEY (`id_factura_compra`),
  ADD KEY `FK_factura_compras_proveedores` (`id_proveedor`);

--
-- Indices de la tabla `inventarios`
--
ALTER TABLE `inventarios`
  ADD PRIMARY KEY (`id_inventario`),
  ADD KEY `FK_inventarios_articulos` (`id_articulo`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`id_marca`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id_proveedor`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulos`
--
ALTER TABLE `articulos`
  MODIFY `id_articulo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `ct_tipos_documentos`
--
ALTER TABLE `ct_tipos_documentos`
  MODIFY `id_tip_doc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `detalle_compras`
--
ALTER TABLE `detalle_compras`
  MODIFY `id_detalle_compra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `factura_compras`
--
ALTER TABLE `factura_compras`
  MODIFY `id_factura_compra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `inventarios`
--
ALTER TABLE `inventarios`
  MODIFY `id_inventario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `id_marca` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id_proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD CONSTRAINT `FK_articulos_marcas` FOREIGN KEY (`marca_articulo`) REFERENCES `marcas` (`id_marca`);

--
-- Filtros para la tabla `detalle_compras`
--
ALTER TABLE `detalle_compras`
  ADD CONSTRAINT `FK_detalle_compras_articulos` FOREIGN KEY (`id_articulo`) REFERENCES `articulos` (`id_articulo`),
  ADD CONSTRAINT `FK_detalle_compras_factura_compras` FOREIGN KEY (`id_factura_compra`) REFERENCES `factura_compras` (`id_factura_compra`);

--
-- Filtros para la tabla `factura_compras`
--
ALTER TABLE `factura_compras`
  ADD CONSTRAINT `FK_factura_compras_proveedores` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id_proveedor`);

--
-- Filtros para la tabla `inventarios`
--
ALTER TABLE `inventarios`
  ADD CONSTRAINT `FK_inventarios_articulos` FOREIGN KEY (`id_articulo`) REFERENCES `articulos` (`id_articulo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
