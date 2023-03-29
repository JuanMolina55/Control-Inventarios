import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciocontrolinventarioService } from '../serviciocontrolinventario.service';

@Component({
  selector: 'app-detallecompra',
  templateUrl: './detallecompra.component.html',
  styleUrls: ['./detallecompra.component.css']
})
export class DetallecompraComponent implements OnInit {

  DetalleCompras: any = [];              //Lista de detalles
  TituloDetalleCompras = "";             //Titulo Lista de detalles
  TablaDetalleCompras: any = [];        //Encabezados tabla Lista de detalles

  MiDetalleCompra: any = [];             //detalle Buscado
  TituloDetalleCompra = "";              //Titulo de detalle Buscado
  TabBusDetalleCompras: any = [];        //Encabezados tabla detalle Buscado 

  TituloDetalleCompraEdit = "";          //Titulo de Tipo de Documento a Editar
  MiDetalleCompraE: any = [];            //Tipo de Documento a Editar
  comboEditarDetalleCompra: any = [];    //Combo Editar Tipo de Documento

  comboListaDetalleCompra: any = [];     //Combo Buscar Tipo de Documento
  BuscarEvalor = 1;

  comboListaArticulo: any = [];     //Combo Buscar Articulo FK
  MiArticulo: any = [];             //Articulo Buscada FK
  comboListaFacturaCompra: any = [];     //Combo Buscar Articulo
  MiFacturaCompra: any = [];             //Articulo Buscada


  title = "MANEJO DE DETALLE DE COMPRAS";
  controlLista = 1; //Control para limpiar la lista

  filtrarDetalleCompra = new FormGroup({
    combofiltro: new FormControl()
  });

  InsertarGDetalleCompra = new FormGroup({
    combofiltroarticulo: new FormControl(),
    combofiltrofacturacompra: new FormControl(),
    textidartDetalleCompra: new FormControl(),
    textidfactDetalleCompra: new FormControl(),
    textcantidadDetalleCompra: new FormControl(),
    textprecioDetalleCompra: new FormControl()
  });

  ListaDetalleCompra = new FormGroup({

  });

  ActualizarADetalleCompra = new FormGroup({
    BuscarIdDetalleCompra: new FormControl(),
    textnuevoidartDetalleCompra: new FormControl(),
    textnuevoidfactDetalleCompra: new FormControl(),
    textnuevocantidadDetalleCompra: new FormControl(),
    textnuevoprecioDetalleCompra: new FormControl()

  });

  constructor(
    private formBuilder: FormBuilder,
    private servi: ServiciocontrolinventarioService,
    Router: Router
  ) { }

  //..............................................................................................
  // CRUD
  //............................................................................................
  // Lista Detalle de Compra.

  public consultaDetalleCompras(op: any) {
    if (this.controlLista == 1) {
      this.servi.getDetalleCompras().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.DetalleCompras = JSON.parse(data);
          this.TituloDetalleCompras = "LISTA DE DETALLE DE COMPRAS ";
          this.TablaDetalleCompras[0] = "Indicador";
          this.TablaDetalleCompras[1] = "Articulo";
          this.TablaDetalleCompras[2] = "Marca";
          this.TablaDetalleCompras[3] = "Proveedor";
          this.TablaDetalleCompras[4] = "Unidades";
          this.TablaDetalleCompras[5] = "Precio de compra";
        }
        else if (op == 2) {
          this.comboListaDetalleCompra = JSON.parse(data);
          this.MiDetalleCompra = null;
          this.TituloDetalleCompra = "";
          this.TabBusDetalleCompras[0] = "";
          this.TabBusDetalleCompras[1] = "";
          this.TabBusDetalleCompras[2] = "";
          this.TabBusDetalleCompras[3] = "";
          this.TabBusDetalleCompras[4] = "";
          this.TabBusDetalleCompras[5] = "";
        }
        else if (op == 3) {
          this.comboEditarDetalleCompra = JSON.parse(data);
          this.MiDetalleCompraE = null;
          this.TituloDetalleCompraEdit = "";
        }
      },
        error => { console.error(error + " ") });
    }
    else {
      this.DetalleCompras = null;
      this.TituloDetalleCompras = "";
      this.TablaDetalleCompras[0] = "";
      this.TablaDetalleCompras[1] = "";
      this.TablaDetalleCompras[2] = "";
      this.TablaDetalleCompras[3] = "";
      this.TablaDetalleCompras[4] = "";
      this.TablaDetalleCompras[5] = "";
      this.controlLista = 1;
    }
  }

  public consultaArticulos(op: any) {
    if (this.controlLista == 1) {
      this.servi.getArticulos().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.comboListaArticulo = JSON.parse(data);
          this.MiArticulo = null;
        }
      },
        error => { console.error(error + " ") });
    }
  }

  public consultaFacturaCompras(op: any) {
    if (this.controlLista == 1) {
      this.servi.getFacturaCompras().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.comboListaFacturaCompra = JSON.parse(data);
          this.MiFacturaCompra = null;
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
  // Consulta un Detalle de Compra por medio de su id.
  public buscarDetalleCompra() {
    var filtovalor = this.filtrarDetalleCompra.getRawValue()['combofiltro'];
    this.servi.getDetalleCompra('/' + filtovalor).subscribe((data: {}) => {
      this.MiDetalleCompra = data;
      this.TituloDetalleCompra = "DETALLE DE COMPRA SELECCIONADA";
      this.TabBusDetalleCompras[0] = "Indicador";
      this.TabBusDetalleCompras[1] = "Articulo";
      this.TabBusDetalleCompras[2] = "Marca";
      this.TabBusDetalleCompras[3] = "Proveedor";
      this.TabBusDetalleCompras[4] = "Unidades";
      this.TabBusDetalleCompras[5] = "Precio de compra";
    },
      error => { console.log(error) });
  }

  public buscarArticulo() {
    var filtovalor = this.InsertarGDetalleCompra.getRawValue()['combofiltroarticulo'];
    this.servi.getArticulo('/' + filtovalor).subscribe((data: {}) => {
      this.MiArticulo = data;

    },
      error => { console.log(error) });
  }

  public buscarFacturaCompra() {
    var filtovalor = this.InsertarGDetalleCompra.getRawValue()['combofiltrofacturacompra'];
    this.servi.getFacturaCompra('/' + filtovalor).subscribe((data: {}) => {
      this.MiFacturaCompra = data;

    },
      error => { console.log(error) });
  }

  //--------------------------------------------------------------
  //Para insertar un nuevo Detalle de Compra
  public InsertarDetalleCompra() {
    var datosvalo4 = this.InsertarGDetalleCompra.getRawValue()['textidartDetalleCompra'];
    var datosvalo3 = this.InsertarGDetalleCompra.getRawValue()['textidfactDetalleCompra'];
    var datosvalo2 = this.InsertarGDetalleCompra.getRawValue()['textcantidadDetalleCompra'];
    var datosvalo1 = this.InsertarGDetalleCompra.getRawValue()['textprecioDetalleCompra'];
    var cadena = { "id_articulo": datosvalo4, "id_factura_compra": datosvalo3, "cantidad_factura": datosvalo2, "precio_compra": datosvalo1};

    this.servi.insertDetalleCompra(cadena).then
      (res => {
        console.log(res)
      }
      ).catch(err => {
        console.log(err)
      });
    this.InsertarGDetalleCompra.reset();
  }

  //----------------------------------------------------------------------------
  // Consulta un Detalle de Compra por medio de su id para editarlo
  buscarEditarDetalleCompra() {
    if (this.BuscarEvalor != 0) {
      this.BuscarEvalor = this.ActualizarADetalleCompra.getRawValue()['BuscarIdDetalleCompra'];
    }

    this.servi.getDetalleCompra('/' + this.BuscarEvalor).subscribe((data: {}) => {

      this.MiDetalleCompraE = data;
      this.TituloDetalleCompraEdit = "DETALLE DE COMPRA A EDITAR";

    }, error => { console.log(error) });
  }

  //--------------------------------------------------------------
  // Actualiza el Detalle de Compra
  public ActualizarDetalleCompra() {

    var nuevoidartDetalleCompra = this.ActualizarADetalleCompra.getRawValue()['textnuevoidartDetalleCompra'];
    var nuevoidfactDetalleCompra = this.ActualizarADetalleCompra.getRawValue()['textnuevoidfactDetalleCompra'];
    var nuevocantidadDetalleCompra = this.ActualizarADetalleCompra.getRawValue()['textnuevocantidadDetalleCompra'];
    var nuevoprecioDetalleCompra = this.ActualizarADetalleCompra.getRawValue()['textnuevoprecioDetalleCompra'];

    var cadena = { "id_detalle_compra": this.BuscarEvalor, "id_articulo": nuevoidartDetalleCompra, "id_factura_compra": nuevoidfactDetalleCompra, "cantidad_factura": nuevocantidadDetalleCompra, "precio_compra": nuevoprecioDetalleCompra };

    this.servi.updateDetalleCompra(cadena).then
      (
        res => {
          console.log("res  ", res)
        }
      ).catch(err => {
        console.log(err)
      });

    this.BuscarEvalor = 0;
    this.ActualizarADetalleCompra.reset();
  }

  ngOnInit(): void {
    this.ListaDetalleCompra = this.formBuilder.group({

    });
    this.filtrarDetalleCompra = this.formBuilder.group({
      combofiltro: []

    });
    this.InsertarGDetalleCompra = this.formBuilder.group({
      combofiltroarticulo: [],
      combofiltrofacturacompra: [],
      textidartDetalleCompra: [],
      textidfactDetalleCompra: [],
      textcantidadDetalleCompra: [],
      textprecioDetalleCompra: []
    });
    this.formBuilder.group

    this.ActualizarADetalleCompra = this.formBuilder.group({
      BuscarIdDetalleCompra: [],
      textnuevoidartDetalleCompra: [],
      textnuevoidfactDetalleCompra: [],
      textnuevocantidadDetalleCompra: [],
      textnuevoprecioDetalleCompra: []
    });
    this.formBuilder.group
  }

}
