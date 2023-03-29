import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciocontrolinventarioService } from '../serviciocontrolinventario.service';

@Component({
  selector: 'app-facturacompra',
  templateUrl: './facturacompra.component.html',
  styleUrls: ['./facturacompra.component.css']
})
export class FacturacompraComponent implements OnInit {

  FacturaCompras: any = [];              //Lista de facturas
  TituloFacturaCompras = "";             //Titulo Lista de facturas
  TablaFacturaCompras: any = [];        //Encabezados tabla Lista de facturas

  MiFacturaCompra: any = [];             //factura Buscada
  TituloFacturaCompra = "";              //Titulo de factura Buscada
  TabBusFacturaCompras: any = [];        //Encabezados tabla factura Buscada

  TituloFacturaCompraEdit = "";          //Titulo de factura a Editar
  MiFacturaCompraE: any = [];            //factura a Editar
  comboEditarFacturaCompra: any = [];    //Combo Editar factura

  comboListaFacturaCompra: any = [];     //Combo Buscar factura
  BuscarEvalor = 1;               //Control para carga del valor a buscar

  comboListaProveedor: any = [];     //Combo Buscar Articulo
  MiProveedor: any = [];             //Articulo Buscada
  TituloProveedor = "";              //Titulo de Articulo Buscada
  TabBusProveedores: any = [];        //Encabezados tabla Articulo Buscada

  title = "MANEJO DE FACTURAS DE COMPRAS";
  controlLista = 1; //Control para limpiar la lista

  filtrarFacturaCompra = new FormGroup(
    {
      combofiltro: new FormControl()
    });

  InsertarGFacturaCompra = new FormGroup(
    {
      textProveedorFactura: new FormControl(),
      textFechaFactura: new FormControl(),
      textPagoFactura: new FormControl(),
      textEstadoFactura: new FormControl()
    });

  ListaFacturaCompra = new FormGroup({

  });

  ActualizarAFacturaCompra = new FormGroup({
    BuscarIdFacturaCompra: new FormControl(),
    textnuevoprovfactura: new FormControl(),
    textnuevafechafactura: new FormControl(),
    textnuevopagofactura: new FormControl(),
    textnuevoestadofactura: new FormControl()

  });

  constructor(
    private formBuilder: FormBuilder,
    private servi: ServiciocontrolinventarioService,
    Router: Router
  ) { }

  //..............................................................................................
  // CRUD
  //............................................................................................
  // Lista Factura de compras.

  public consultaFacturaCompras(op: any) {
    if (this.controlLista == 1) {
      this.servi.getFacturaCompras().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.FacturaCompras = JSON.parse(data);
          this.TituloFacturaCompras = "LISTA DE FACTURA DE COMPRAS ";
          this.TablaFacturaCompras[0] = "Indicador";
          this.TablaFacturaCompras[1] = "Proveedor";
          this.TablaFacturaCompras[2] = "Fecha";
          this.TablaFacturaCompras[3] = "Forma de pago";
          this.TablaFacturaCompras[4] = "Estado";
        }
        else if (op == 2) {
          this.comboListaFacturaCompra = JSON.parse(data);
          this.MiFacturaCompra = null;
          this.TituloFacturaCompra = "";
          this.TabBusFacturaCompras[0] = "";
          this.TabBusFacturaCompras[1] = "";
          this.TabBusFacturaCompras[2] = "";
          this.TabBusFacturaCompras[3] = "";
          this.TabBusFacturaCompras[4] = "";
        }
        else if (op == 3) {
          this.comboEditarFacturaCompra = JSON.parse(data);
          this.MiFacturaCompraE = null;
          this.TituloFacturaCompraEdit = "";
        }
      },
        error => { console.error(error + " ") });
    }
    else {
      this.FacturaCompras = null;
      this.TituloFacturaCompras = "";
      this.TablaFacturaCompras[0] = "";
      this.TablaFacturaCompras[1] = "";
      this.TablaFacturaCompras[2] = "";
      this.TablaFacturaCompras[3] = "";
      this.TablaFacturaCompras[4] = "";
      this.controlLista = 1;
    }
  }

  public consultaProveedores(op: any) {
    if (this.controlLista == 1) {
      this.servi.getProveedores().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.comboListaProveedor = JSON.parse(data);
          this.MiProveedor = null;
        }
      },
        error => { console.error(error + " ") });
    }
  }


  //--------------------------------------------------------------------------------------------->
  //para Limpiar la lista
  public LimpiarLista() {
    this.controlLista = 0;
  }

  // -----------------------------------------------------------------------------------------
  // Consulta una factura por medio de su id.
  public buscarFacturaCompra() {
    var filtovalor = this.filtrarFacturaCompra.getRawValue()['combofiltro'];
    this.servi.getFacturaCompra('/' + filtovalor).subscribe((data: {}) => {
      this.MiFacturaCompra = data;
      this.TituloFacturaCompra = "TIPO DE DOCUMENTO SELECCIONADO";
      this.TabBusFacturaCompras[0] = "Indicador";
      this.TabBusFacturaCompras[1] = "Proveedor";
      this.TabBusFacturaCompras[2] = "Fecha";
      this.TabBusFacturaCompras[3] = "Forma de pago";
      this.TabBusFacturaCompras[4] = "Estado";
    },
      error => { console.log(error) });
  }
  public buscarProveedor() {
    var filtovalor = this.InsertarGFacturaCompra.getRawValue()['combofiltroproveedor'];
    this.servi.getMarca('/' + filtovalor).subscribe((data: {}) => {
      this.MiProveedor = data;

    },
      error => { console.log(error) });
  }

  //--------------------------------------------------------------
  //Para insertar una factura de compra
  public InsertarFacturaCompra() {
    var datosvalo4 = this.InsertarGFacturaCompra.getRawValue()['textProveedorFactura'];
    var datosvalo3 = this.InsertarGFacturaCompra.getRawValue()['textFechaFactura'];
    var datosvalo2 = this.InsertarGFacturaCompra.getRawValue()['textPagoFactura'];
    var datosvalo1 = this.InsertarGFacturaCompra.getRawValue()['textEstadoFactura'];
    var cadena = { "id_proveedor": datosvalo4, "fecha_factura_compra": datosvalo3, "forma_de_pago": datosvalo2, "estado_factura_compra": datosvalo1};

    this.servi.insertFacturaCompra(cadena).then
      (res => {
        console.log(res)
      }
      ).catch(err => {
        console.log(err)
      });
    this.InsertarGFacturaCompra.reset();
  }

  //----------------------------------------------------------------------------
  // Consulta una factura por medio de su id para editarla
  buscarEditarFacturaCompra() {
    if (this.BuscarEvalor != 0) {
      this.BuscarEvalor = this.ActualizarAFacturaCompra.getRawValue()['BuscarIdFacturaCompra'];
    }

    this.servi.getFacturaCompra('/' + this.BuscarEvalor).subscribe((data: {}) => {

      this.MiFacturaCompraE = data;
      this.TituloFacturaCompraEdit = "FACTURA A EDITAR";

    }, error => { console.log(error) });
  }

  //--------------------------------------------------------------
  // Actualiza la factura de compra 
  public ActualizarFacturaCompra() {

    var nuevoprovfactura = this.ActualizarAFacturaCompra.getRawValue()['textnuevoprovfactura'];
    var nuevafechafactura = this.ActualizarAFacturaCompra.getRawValue()['textnuevafechafactura'];
    var nuevopagofactura = this.ActualizarAFacturaCompra.getRawValue()['textnuevopagofactura'];
    var nuevoestadofactura = this.ActualizarAFacturaCompra.getRawValue()['textnuevoestadofactura'];

    var cadena = { "id_factura_compra": this.BuscarEvalor, "id_proveedor": nuevoprovfactura, "fecha_factura_compra": nuevafechafactura, "forma_de_pago": nuevopagofactura, "estado_factura_compra": nuevoestadofactura };

    this.servi.updateFacturaCompra(cadena).then
      (
        res => {
          console.log("res  ", res)
        }
      ).catch(err => {
        console.log(err)
      });

    this.BuscarEvalor = 0;
    this.ActualizarAFacturaCompra.reset();
  }

  ngOnInit(): void {
    this.ListaFacturaCompra = this.formBuilder.group({

    });
    this.filtrarFacturaCompra = this.formBuilder.group({
      combofiltro: []

    });
    this.InsertarGFacturaCompra = this.formBuilder.group({
      combofiltroproveedor: [],
      textProveedorFactura: [],
      textFechaFactura: [],
      textPagoFactura: [],
      textEstadoFactura: []
    });
    this.formBuilder.group

    this.ActualizarAFacturaCompra = this.formBuilder.group({
      BuscarIdFacturaCompra: [],
      textnuevoprovfactura: [],
      textnuevafechafactura: [],
      textnuevopagofactura: [],
      textnuevoestadofactura: []
    });
    this.formBuilder.group
  }

}
