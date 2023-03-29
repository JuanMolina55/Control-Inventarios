import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciocontrolinventarioService } from '../serviciocontrolinventario.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  Proveedores: any = [];              //Lista de Proveedores
  TituloProveedores = "";             //Titulo Lista de Proveedores
  TablaProveedores: any = [];        //Encabezados tabla Lista de Proveedores

  MiProveedor: any = [];             //Proveedor Buscado
  TituloProveedor = "";              //Titulo de Proveedor Buscado
  TabBusProveedores: any = [];        //Encabezados tabla Proveedor Buscado 

  TituloProveedorEdit = "";          //Titulo de Proveedor a Editar
  MiProveedorE: any = [];            //Proveedor a Editar
  comboEditarProveedor: any = [];    //Combo Editar Proveedor

  comboListaProveedor: any = [];     //Combo Buscar Proveedor
  BuscarEvalor = 1;               //Control para carga del valor a buscar

  title = "MANEJO DE PROVEEDORES";
  controlLista = 1; //Control para limpiar la lista

  filtrarProveedor = new FormGroup(
    {
      combofiltro: new FormControl()
    });

  ListaProveedor = new FormGroup({

  });

  InsertarGProveedor = new FormGroup({
    textProveedor: new FormControl(),
    textTelProveedor: new FormControl(),
    textDirProveedor: new FormControl(),
    textVigProveedor: new FormControl()
  });

  ActualizarAProveedor = new FormGroup({
    BuscarIdProveedor: new FormControl(),
    textnuevoproveeedor: new FormControl(),
    textnuevotelproveedor: new FormControl(),
    textnuevodirproveedor: new FormControl(),
    textnuevovigproveedor: new FormControl()

  });

  constructor(
    private formBuilder: FormBuilder,
    private servi: ServiciocontrolinventarioService,
    Router: Router
  ) { }
  //..............................................................................................
  // CRUD
  //............................................................................................
  // Proveedores.

  public consultaProveedores(op: any) {
    if (this.controlLista == 1) {
      this.servi.getProveedores().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.Proveedores = JSON.parse(data);
          this.TituloProveedores = "LISTA DE PROVEEDORES ";
          this.TablaProveedores[0] = "Indicador";
          this.TablaProveedores[1] = "Nombre";
          this.TablaProveedores[2] = "Teléfono";
          this.TablaProveedores[3] = "Dirección";
          this.TablaProveedores[4] = "Vigencia";
        }
        else if (op == 2) {
          this.comboListaProveedor = JSON.parse(data);
          this.MiProveedor = null;
          this.TituloProveedor = "";
          this.TabBusProveedores[0] = "";
          this.TabBusProveedores[1] = "";
          this.TabBusProveedores[2] = "";
          this.TabBusProveedores[3] = "";
          this.TabBusProveedores[4] = "";
        }
        else if (op == 3) {
          this.comboEditarProveedor = JSON.parse(data);
          this.MiProveedorE = null;
          this.TituloProveedorEdit = "";
        }
      },
        error => { console.error(error + " ") });
    }
    else {
      this.Proveedores = null;
      this.TituloProveedores = "";
      this.TablaProveedores[0] = "";
      this.TablaProveedores[1] = "";
      this.TablaProveedores[2] = "";
      this.TablaProveedores[3] = "";
      this.TablaProveedores[4] = "";
      this.controlLista = 1;
    }
  }

  //--------------------------------------------------------------------------------------------->
  //para Limpiar la lista
  public LimpiarLista() {
    this.controlLista = 0;
  }

  // -----------------------------------------------------------------------------------------
  // Consulta un proveedor por medio de su id.
  public buscarProveedor() {
    var filtovalor = this.filtrarProveedor.getRawValue()['combofiltro'];
    this.servi.getProveedor('/' + filtovalor).subscribe((data: {}) => {
      this.MiProveedor = data;
      this.TituloProveedor = "PROVEEDOR SELECCIONADO";
      this.TabBusProveedores[0] = "Indicador";
      this.TabBusProveedores[1] = "Nombre";
      this.TabBusProveedores[2] = "Teléfono";
      this.TabBusProveedores[3] = "Dirección";
      this.TabBusProveedores[4] = "Vigencia";
    },
      error => { console.log(error) });
  }

  //--------------------------------------------------------------
  //Para insertar un nuevo Proveedor
  public InsertarProveedor() {
    var datosvalo4 = this.InsertarGProveedor.getRawValue()['textProveedor'];
    var datosvalo3 = this.InsertarGProveedor.getRawValue()['textTelProveedor'];
    var datosvalo2 = this.InsertarGProveedor.getRawValue()['textDirProveedor'];
    var datosvalo1 = this.InsertarGProveedor.getRawValue()['textVigProveedor'];
    var cadena = { "nombre_proveedor": datosvalo4, "telefono_proveedor": datosvalo3, "direccion_proveedor": datosvalo2, "vigencia_proveedor": datosvalo1};

    this.servi.insertProveedor(cadena).then
      (res => {
        console.log(res)
      }
      ).catch(err => {
        console.log(err)
      });
    this.InsertarGProveedor.reset();
  }

  //----------------------------------------------------------------------------
  // Consulta un proveedor por medio de su id para editarlo
  buscarEditarProveedor() {
    if (this.BuscarEvalor != 0) {
      this.BuscarEvalor = this.ActualizarAProveedor.getRawValue()['BuscarIdProveedor'];
    }

    this.servi.getProveedor('/' + this.BuscarEvalor).subscribe((data: {}) => {

      this.MiProveedorE = data;
      this.TituloProveedorEdit = "PROVEEDOR A EDITAR";

    }, error => { console.log(error) });
  }

  //--------------------------------------------------------------
  // Actualiza el proveedor
  public ActualizarProveedor() {

    var nuevoproveedor = this.ActualizarAProveedor.getRawValue()['textnuevoproveeedor'];
    var nuevotelproveedor = this.ActualizarAProveedor.getRawValue()['textnuevotelproveedor'];
    var nuevodirproveedor = this.ActualizarAProveedor.getRawValue()['textnuevodirproveedor'];
    var nuevovigproveedor = this.ActualizarAProveedor.getRawValue()['textnuevovigproveedor'];

    var cadena = { "id_proveedor": this.BuscarEvalor, "nombre_proveedor": nuevoproveedor, "telefono_proveedor": nuevotelproveedor, "direccion_proveedor": nuevodirproveedor, "vigencia_proveedor": nuevovigproveedor};

    this.servi.updateProveedor(cadena).then
      (
        res => {
          console.log("res  ", res)
        }
      ).catch(err => {
        console.log(err)
      });

    this.BuscarEvalor = 0;
    this.ActualizarAProveedor.reset();
  }


  ngOnInit(): void {
    this.ListaProveedor = this.formBuilder.group({

    });
    this.filtrarProveedor = this.formBuilder.group({
      combofiltro: []

    });
    this.InsertarGProveedor = this.formBuilder.group({
      textProveedor: [],
      textTelProveedor: [],
      textDirProveedor: [],
      textVigProveedor: []
    });
    this.formBuilder.group

    this.ActualizarAProveedor = this.formBuilder.group({
      BuscarIdProveedor: [],
      textnuevoproveeedor: [],
      textnuevotelproveedor: [],
      textnuevodirproveedor: [],
      textnuevovigproveedor: []
    });
    this.formBuilder.group
  }

}
