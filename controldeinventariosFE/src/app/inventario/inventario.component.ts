import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciocontrolinventarioService } from '../serviciocontrolinventario.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  Inventarios: any = [];              //Lista de Inventarios
  TituloInventarios = "";             //Titulo Lista de Inventarios
  TablaInventarios: any = [];        //Encabezados tabla Lista de Inventarios

  MiInventario: any = [];             //Inventario Buscado
  TituloInventario = "";              //Titulo de Inventario Buscado
  TabBusInventarios: any = [];        //Encabezados tabla Inventario Buscado 

  TituloInventarioEdit = "";          //Titulo de Inventario a Editar
  MiInventarioE: any = [];            //Inventario a Editar
  comboEditarInventario: any = [];    //Combo Editar Inventario

  comboListaInventario: any = [];     //Combo Buscar Inventario
  BuscarEvalor = 1;               //Control para carga del valor a buscar

  comboListaArticulo: any = [];     //Combo Buscar Articulo
  MiArticulo: any = [];             //Articulo Buscada

  title = "MANEJO DE INVENTARIO";
  controlLista = 1; //Control para limpiar la lista

  maximo:any;
  minimo:any;

  maximo_edit:any;
  minimo_edit:any;

  filtrarInventario = new FormGroup({
    combofiltro: new FormControl()
  });

  InsertarGInventario = new FormGroup({
    combofiltroarticulo: new FormControl(),
    textIdArtInventario: new FormControl(),
    textIngInventario: new FormControl(),
    textSalInventario: new FormControl(),
    textCantInventario: new FormControl(),
    textPrecInventario: new FormControl(),
    textMaxInventario: new FormControl(),
    textMinInventario: new FormControl(),
    textUbiInventario: new FormControl(),
    textTiemInventario: new FormControl()
  });

  ListaInventario = new FormGroup({

  });

  ActualizarAInventario = new FormGroup({
    BuscarIdInventario: new FormControl(),
    textnuevoidartinventario: new FormControl(),
    textnuevoinginventario: new FormControl(),
    textnuevosalinventario: new FormControl(),
    textnuevocantinventario: new FormControl(),
    textnuevoprecinventario: new FormControl(),
    textnuevomaxinventario: new FormControl(),
    textnuevomininventario: new FormControl(),
    textnuevoubiinventario: new FormControl(),
    textnuevotieminventario: new FormControl()

  });

  constructor(
    private formBuilder: FormBuilder,
    private servi: ServiciocontrolinventarioService,
    Router: Router
  ) { }

  //..............................................................................................
  // CRUD
  //............................................................................................
  // Lista inventarios.

  public consultaInventarios(op: any) {
    if (this.controlLista == 1) {
      this.servi.getInventarios().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.Inventarios = JSON.parse(data);
          this.TituloInventarios = "LISTA DE ARTICULOS ";
          this.TablaInventarios[0] = "Articulo";
          this.TablaInventarios[1] = "Marca";
          this.TablaInventarios[2] = "Ingreso";
          this.TablaInventarios[3] = "Salida";
          this.TablaInventarios[4] = "Unidades";
          this.TablaInventarios[5] = "Precio Venta";
          this.TablaInventarios[6] = "Máximo";
          this.TablaInventarios[7] = "Mínimo";
          this.TablaInventarios[8] = "Ubicación";
          this.TablaInventarios[9] = "Tiempo Entrega";
        }
        else if (op == 2) {
          this.comboListaInventario = JSON.parse(data);
          this.MiInventario = null;
          this.TituloInventario = "";
          this.TabBusInventarios[0] = "";
          this.TabBusInventarios[1] = "";
          this.TabBusInventarios[2] = "";
          this.TabBusInventarios[3] = "";
          this.TabBusInventarios[4] = "";
          this.TabBusInventarios[5] = "";
          this.TabBusInventarios[6] = "";
          this.TabBusInventarios[7] = "";
          this.TabBusInventarios[8] = "";
          this.TabBusInventarios[9] = "";
        }
        else if (op == 3) {
          this.comboEditarInventario = JSON.parse(data);
          this.MiInventarioE = null;
          this.TituloInventarioEdit = "";
        }
      },
        error => { console.error(error + " ") });
    }
    else {
      this.Inventarios = null;
      this.TituloInventarios = "";
      this.TablaInventarios[0] = "";
      this.TablaInventarios[1] = "";
      this.TablaInventarios[2] = "";
      this.TablaInventarios[3] = "";
      this.TablaInventarios[4] = "";
      this.TablaInventarios[5] = "";
      this.TablaInventarios[6] = "";
      this.TablaInventarios[7] = "";
      this.TablaInventarios[8] = "";
      this.TablaInventarios[9] = "";
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

  //--------------------------------------------------------------------------------------------->
  //para Limpiar la lista
  public LimpiarLista() {
    this.controlLista = 0;
  }

  // -----------------------------------------------------------------------------------------
  // Consulta un inventario por medio de su id.
  public buscarInventario() {
    var filtovalor = this.filtrarInventario.getRawValue()['combofiltro'];
    this.servi.getInventario('/' + filtovalor).subscribe((data: {}) => {
      this.MiInventario = data;
      this.TituloInventario = "INVENTARIO SELECCIONADO";
      this.TabBusInventarios[0] = "Articulo";
      this.TabBusInventarios[1] = "Marca";
      this.TabBusInventarios[2] = "Ingreso";
      this.TabBusInventarios[3] = "Salida";
      this.TabBusInventarios[4] = "Unidades";
      this.TabBusInventarios[5] = "Precio Venta";
      this.TabBusInventarios[6] = "Máximo";
      this.TabBusInventarios[7] = "Mínimo";
      this.TabBusInventarios[8] = "Ubicación";
      this.TabBusInventarios[9] = "Tiempo Entrega";
    },
      error => { console.log(error) });
  }

  public buscarArticulo() {
    var filtovalor = this.InsertarGInventario.getRawValue()['combofiltroarticulo'];
    this.servi.getArticulo('/' + filtovalor).subscribe((data: {}) => {
      this.MiArticulo = data;

    },
      error => { console.log(error) });
  }

  //--------------------------------------------------------------
  //Para insertar un nuevo inventario
  public InsertarInventario() {
    var datosvalo9 = this.InsertarGInventario.getRawValue()['textIdArtInventario'];
    var datosvalo8 = this.InsertarGInventario.getRawValue()['textIngInventario'];
    var datosvalo7 = this.InsertarGInventario.getRawValue()['textSalInventario'];
    var datosvalo6 = this.InsertarGInventario.getRawValue()['textCantInventario'];
    var datosvalo5 = this.InsertarGInventario.getRawValue()['textPrecInventario'];
    var datosvalo4 = this.InsertarGInventario.getRawValue()['textMaxInventario'];
    var datosvalo3 = this.InsertarGInventario.getRawValue()['textMinInventario'];
    var datosvalo2 = this.InsertarGInventario.getRawValue()['textUbiInventario'];
    var datosvalo1 = this.InsertarGInventario.getRawValue()['textTiemInventario'];
    var cadena = { "id_articulo": datosvalo9, "fecha_ingreso": datosvalo8, "fecha_salida": datosvalo7, "cantidad_articulos": datosvalo6,
                   "precio_venta": datosvalo5, "max_articulos_inventario": datosvalo4, "min_articulos_inventario": datosvalo3, 
                   "ubicacion_producto": datosvalo2, "tiempo_entrega": datosvalo1};

    this.servi.insertInventario(cadena).then
      (res => {
        console.log(res)
      }
      ).catch(err => {
        console.log(err)
      });
    this.InsertarGInventario.reset();
  }

  //----------------------------------------------------------------------------
  // Consulta un inventario por medio de su id para editarlo
  buscarEditarInventario() {
    if (this.BuscarEvalor != 0) {
      this.BuscarEvalor = this.ActualizarAInventario.getRawValue()['BuscarIdInventario'];
    }

    this.servi.getInventario('/' + this.BuscarEvalor).subscribe((data: {}) => {

      this.MiInventarioE = data;
      this.TituloInventarioEdit = "TIPO DE DOCUMENTO A EDITAR";

    }, error => { console.log(error) });
  }

  //--------------------------------------------------------------
  // Actualiza el Inventario 
  public ActualizarInventario() {

    var nuevoidartinventario = this.ActualizarAInventario.getRawValue()['textnuevoidartinventario'];
    var nuevoinginventario = this.ActualizarAInventario.getRawValue()['textnuevoinginventario'];
    var nuevosalinventario = this.ActualizarAInventario.getRawValue()['textnuevosalinventario'];
    var nuevocantinventario = this.ActualizarAInventario.getRawValue()['textnuevocantinventario'];
    var nuevoprecinventario = this.ActualizarAInventario.getRawValue()['textnuevoprecinventario'];
    var nuevomaxinventario = this.ActualizarAInventario.getRawValue()['textnuevomaxinventario'];
    var nuevomininventario = this.ActualizarAInventario.getRawValue()['textnuevomininventario'];
    var nuevoubiinventario = this.ActualizarAInventario.getRawValue()['textnuevoubiinventario'];
    var nuevotieminventario = this.ActualizarAInventario.getRawValue()['textnuevotieminventario'];

    var cadena = { "id_inventario": this.BuscarEvalor, "id_articulo": nuevoidartinventario , "fecha_ingreso": nuevoinginventario , "fecha_salida": nuevosalinventario, "cantidad_articulos": nuevocantinventario, "precio_venta": nuevoprecinventario, 
    "max_articulos_inventario": nuevomaxinventario, "min_articulos_inventario": nuevomininventario, "ubicacion_producto": nuevoubiinventario, "tiempo_entrega": nuevotieminventario};

    this.servi.updateInventario(cadena).then
      (
        res => {
          console.log("res  ", res)
        }
      ).catch(err => {
        console.log(err)
      });

    this.BuscarEvalor = 0;
    this.ActualizarAInventario.reset();
  }

  ngOnInit(): void {
    this.ListaInventario = this.formBuilder.group({

    });
    this.filtrarInventario = this.formBuilder.group({
      combofiltro: []

    });
    this.InsertarGInventario = this.formBuilder.group({
      combofiltroarticulo: [],
      textIdArtInventario: [],
      textIngInventario: [],
      textSalInventario: [],
      textCantInventario: [],
      textPrecInventario: [],
      textMaxInventario: [],
      textMinInventario: [],
      textUbiInventario: [],
      textTiemInventario: []
    });
    this.formBuilder.group

    this.ActualizarAInventario = this.formBuilder.group({
      BuscarIdInventario: [],
      textnuevoidartinventario: [],
      textnuevoinginventario: [],
      textnuevosalinventario: [],
      textnuevocantinventario: [],
      textnuevoprecinventario: [],
      textnuevomaxinventario: [],
      textnuevomininventario: [],
      textnuevoubiinventario: [],
      textnuevotieminventario: []
    });
    this.formBuilder.group
  }

}
