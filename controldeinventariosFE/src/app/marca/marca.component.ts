import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciocontrolinventarioService } from '../serviciocontrolinventario.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  Marcas: any = [];              //Lista de Articulos
  TituloMarcas = "";             //Titulo Lista de Articulos
  TablaMarcas: any = [];        //Encabezados tabla Lista de Articulos

  MiMarca: any = [];             //Articulo Buscado
  TituloMarca = "";              //Titulo de Articulo Buscado
  TabBusMarcas: any = [];        //Encabezados tabla Articulo Buscado 

  TituloMarcaEdit = "";          //Titulo de Tipo de Documento a Editar
  MiMarcaE: any = [];            //Tipo de Documento a Editar
  comboEditarMarca: any = [];    //Combo Editar Tipo de Documento

  comboListaMarca: any = [];     //Combo Buscar Tipo de Documento
  BuscarEvalor = 1;               //Control para carga del valor a buscar

  title = "MANEJO DE MARCAS";
  controlLista = 1; //Control para limpiar la lista

  filtrarMarca = new FormGroup(
    {
      combofiltro: new FormControl()
    });

  ListaMarca = new FormGroup({

  });

  InsertarGMarca = new FormGroup(
    {
      textMarca: new FormControl(),
      textPaisMarca: new FormControl(),
      textPagMarca: new FormControl()
    });

  ActualizarAMarca = new FormGroup({
    BuscarIdMarca: new FormControl(),
    textnuevamarca: new FormControl(),
    textnuevopaismarca: new FormControl(),
    textnuevapagina: new FormControl()

  });

  constructor(
    private formBuilder: FormBuilder,
    private servi: ServiciocontrolinventarioService,
    Router: Router
  ) { }

  public consultaMarcas(op: any) {
    if (this.controlLista == 1) {
      this.servi.getMarcas().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.Marcas = JSON.parse(data);
          this.TituloMarcas = "LISTA DE MARCAS ";
          this.TablaMarcas[0] = "Indicador";
          this.TablaMarcas[1] = "Nombre";
          this.TablaMarcas[2] = "Pais Orígen";
          this.TablaMarcas[3] = "Página";
        }
        else if (op == 2) {
          this.comboListaMarca = JSON.parse(data);
          this.MiMarca = null;
          this.TituloMarca = "";
          this.TabBusMarcas[0] = "";
          this.TabBusMarcas[1] = "";
          this.TabBusMarcas[2] = "";
          this.TabBusMarcas[3] = "";
        }
        else if (op == 3) {
          this.comboEditarMarca = JSON.parse(data);
          this.MiMarcaE = null;
          this.TituloMarcaEdit = "";
        }
      },
        error => { console.error(error + " ") });
    }
    else {
      this.Marcas = null;
      this.TituloMarcas = "";
      this.TablaMarcas[0] = "";
      this.TablaMarcas[1] = "";
      this.TablaMarcas[2] = "";
      this.TablaMarcas[3] = "";
      this.controlLista = 1;
    }
  }

  //--------------------------------------------------------------------------------------------->
  //para Limpiar la lista
  public LimpiarLista() {
    this.controlLista = 0;
  }

  // -----------------------------------------------------------------------------------------
  // Consulta un tipo de documento por medio de su id.
  public buscarMarca() {
    var filtovalor = this.filtrarMarca.getRawValue()['combofiltro'];
    this.servi.getMarca('/' + filtovalor).subscribe((data: {}) => {
      this.MiMarca = data;
      this.TituloMarca = "TIPO DE DOCUMENTO SELECCIONADO";
      this.TabBusMarcas[0] = "Indicador";
      this.TabBusMarcas[1] = "Nombre";
      this.TabBusMarcas[2] = "Pais";
      this.TabBusMarcas[3] = "Página";
    },
      error => { console.log(error) });
  }

  //--------------------------------------------------------------
  //Para insertar un nuevo Tipo de Documento
  public InsertarMarca() {
    var datosvalo3 = this.InsertarGMarca.getRawValue()['textMarca'];
    var datosvalo2 = this.InsertarGMarca.getRawValue()['textPaisMarca'];
    var datosvalo1 = this.InsertarGMarca.getRawValue()['textPagMarca'];
    var cadena = { "nombre_marca": datosvalo3, "pais_origen_marca": datosvalo2, "pagina_marca": datosvalo1 };

    this.servi.insertMarca(cadena).then
      (res => {
        console.log(res)
      }
      ).catch(err => {
        console.log(err)
      });
    this.InsertarGMarca.reset();
  }

  //----------------------------------------------------------------------------
  // Consulta un tipo de documento por medio de su id para editarlo
  buscarEditarMarca() {
    if (this.BuscarEvalor != 0) {
      this.BuscarEvalor = this.ActualizarAMarca.getRawValue()['BuscarIdMarca'];
    }

    this.servi.getMarca('/' + this.BuscarEvalor).subscribe((data: {}) => {

      this.MiMarcaE = data;
      this.TituloMarcaEdit = "MARCA A EDITAR";

    }, error => { console.log(error) });
  }

  //--------------------------------------------------------------
  // Actualiza el Tipo de Documento 
  public ActualizarMarca() {

    var nuevamarca = this.ActualizarAMarca.getRawValue()['textnuevamarca'];
    var nuevopaismarca = this.ActualizarAMarca.getRawValue()['textnuevopaismarca'];
    var nuevapagmarca = this.ActualizarAMarca.getRawValue()['textnuevapagmcarca'];

    var cadena = { "id_marca": this.BuscarEvalor, "nombre_marca": nuevamarca, "pais_origen_marca": nuevopaismarca, "pagina_marca": nuevapagmarca };

    this.servi.updateMarca(cadena).then
      (
        res => {
          console.log("res  ", res)
        }
      ).catch(err => {
        console.log(err)
      });

    this.BuscarEvalor = 0;
    this.ActualizarAMarca.reset();
  }

  ngOnInit(): void {
    this.ListaMarca = this.formBuilder.group({

    });
    this.filtrarMarca = this.formBuilder.group({
      combofiltro: []

    });
    this.InsertarGMarca = this.formBuilder.group({
      textMarca: [],
      textPaisMarca: [],
      textPagMarca: []
    });
    this.formBuilder.group

    this.ActualizarAMarca = this.formBuilder.group({
      BuscarIdMarca: [],
      textnuevamarca: [],
      textnuevopaismarca: [],
      textnuevapagmcarca: []
    });
    this.formBuilder.group
  }

}
