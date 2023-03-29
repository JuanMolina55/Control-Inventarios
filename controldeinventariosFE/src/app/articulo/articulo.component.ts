import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciocontrolinventarioService } from '../serviciocontrolinventario.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  Articulos: any = [];              //Lista de Articulos
  TituloArticulos = "";             //Titulo Lista de Articulos
  TablaArticulos: any = [];        //Encabezados tabla Lista de Articulos
  
  MiArticulo: any = [];             //Articulo Buscado
  TituloArticulo = "";              //Titulo de Articulo Buscado
  TabBusArticulos: any = [];        //Encabezados tabla Articulo Buscado 

  TituloArticuloEdit = "";          //Titulo de Articulo a Editar
  MiArticuloE: any = [];            //Articulo a Editar
  comboEditarArticulo: any = [];    //Combo Editar Articulo

  comboListaArticulo: any = [];     //Combo Buscar Articulo
  BuscarEvalor = 1;               //Control para carga del valor a buscar

  comboListaMarca: any = [];     //Combo Buscar Articulo
  MiMarca: any = [];             //Articulo Buscada
  TituloMarca = "";              //Titulo de Articulo Buscada
  TabBusMarcas: any = [];        //Encabezados tabla Articulo Buscada

  title = "MANEJO DE ARTICULOS";
  controlLista = 1; //Control para limpiar la lista

  filtrarArticulo = new FormGroup({
    combofiltro: new FormControl()
  });
  

  InsertarGArticulo = new FormGroup({
      combofiltromarca: new FormControl(),
      textMarArticulo: new FormControl(),
      textNomArticulo: new FormControl(),
      textUniArticulo: new FormControl(),
      textVigArticulo: new FormControl()
    });

  ListaArticulo = new FormGroup({

  });

  ActualizaraArticulo = new FormGroup({
    BuscarIdArticulo: new FormControl(),
    textnuevamararticulo: new FormControl(),
    textnuevonomarticulo: new FormControl(),
    textnuevauniarticulo: new FormControl(),
    textnuevavigarticulo: new FormControl()

  });

  constructor(
    private formBuilder: FormBuilder, 
    private servi: ServiciocontrolinventarioService,
    Router : Router
  ) { }
  //..............................................................................................
  // CRUD
  //............................................................................................
  // Lista Articulos

  public consultaArticulos(op: any) {
    if (this.controlLista == 1) {
      this.servi.getArticulos().subscribe((data: any) => {
        if (op == 1) {
          
          let dat = data;
          this.Articulos = JSON.parse(data);
          this.TituloArticulos = "LISTA DE ARTICULOS ";
          this.TablaArticulos[0] = "Indicador";
          this.TablaArticulos[1] = "Marca";
          this.TablaArticulos[2] = "Articulo";
          this.TablaArticulos[3] = "Unidades";
          this.TablaArticulos[4] = "Vigencia";
        }
        else if (op == 2) {
          this.comboListaArticulo = JSON.parse(data);
          this.MiArticulo = null;
          this.TituloArticulo = "";
          this.TabBusArticulos[0] = "";
          this.TabBusArticulos[1] = "";
          this.TabBusArticulos[2] = "";
          this.TabBusArticulos[3] = "";
          this.TabBusArticulos[4] = "";
        }
        else if (op == 3) {
          this.comboEditarArticulo = JSON.parse(data);
          this.MiArticuloE = null;
          this.TituloArticuloEdit = "";
        }
        else if (op == 4){
          this.comboListaMarca = JSON.parse(data);
          this.MiMarca = null;
          this.TituloMarca = "";
          this.TabBusMarcas[0] = "";
          this.TabBusMarcas[1] = "";
          this.TabBusMarcas[2] = "";
          this.TabBusMarcas[3] = "";
          this.TabBusMarcas[4] = "";
        }
      },
        error => { console.error(error + " ") });
    }
    else {
      this.Articulos = null;
      this.TituloArticulos = "";
      this.TablaArticulos[0] = "";
      this.TablaArticulos[1] = "";
      this.TablaArticulos[2] = "";
      this.TablaArticulos[3] = "";
      this.TablaArticulos[4] = "";
      this.controlLista = 1;
    }
  }

  public consultaMarcas(op: any) {
    if (this.controlLista == 1) {
      this.servi.getMarcas().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.comboListaMarca = JSON.parse(data);
          this.MiMarca = null;
        }
      },
        error => { console.error(error + " ") });
    }
  }

    //--------------------------------------------------------------------------------------------->
  //para Limpiar la lista
  public LimpiarLista(){
    this.controlLista = 0;
  }
  
  // -----------------------------------------------------------------------------------------
  // Consulta un articulo y marca por medio de su id.
  public buscarArticulo() {
    var filtovalor = this.filtrarArticulo.getRawValue()['combofiltro'];
    this.servi.getArticulo('/' + filtovalor).subscribe((data: {}) => {
      this.MiArticulo = data;
      this.TituloArticulo = "ARTICULO SELECCIONADO";
      this.TabBusArticulos[0] = "Indicador";
      this.TabBusArticulos[1] = "Marca";
      this.TabBusArticulos[2] = "Articulo";
      this.TabBusArticulos[3] = "Unidades";
      this.TabBusArticulos[4] = "Vigencia";
    },
      error => { console.log(error) });
  }
  public buscarMarca() {
    var filtovalor = this.InsertarGArticulo.getRawValue()['combofiltromarca'];
    this.servi.getMarca('/' + filtovalor).subscribe((data: {}) => {
      this.MiMarca = data;

    },
      error => { console.log(error) });
  }

  //--------------------------------------------------------------
  //Para insertar un nuevo Articulo
  public InsertarArticulo() {
    var datosvalo4 = this.InsertarGArticulo.getRawValue()['textMarArticulo'];
    var datosvalo3 = this.InsertarGArticulo.getRawValue()['textNomArticulo'];
    var datosvalo2 = this.InsertarGArticulo.getRawValue()['textUniArticulo'];
    var datosvalo1 = this.InsertarGArticulo.getRawValue()['textVigArticulo'];
    var cadena = { "marca_articulo": datosvalo4, "nombre_articulo": datosvalo3, "unidades_articulo": datosvalo2, "vigencia_articulo": datosvalo1};

    this.servi.insertArticulo(cadena).then
      (res => {
        console.log(res)
      }
      ).catch(err => {
        console.log(err)
      });
    this.InsertarGArticulo.reset();
  }

  //----------------------------------------------------------------------------
  // Consulta un articulo por medio de su id para editarlo
  buscarEditarArticulo() {
    
    if (this.BuscarEvalor != 0) {
      this.BuscarEvalor = this.ActualizaraArticulo.getRawValue()['BuscarIdArticulo'];
    }

    this.servi.getArticulo('/' + this.BuscarEvalor).subscribe((data: {}) => {

      this.MiArticuloE = data;
      console.log("1",this.MiArticuloE);
      this.TituloArticuloEdit = "ARTICULO A EDITAR";

    }, error => { console.log(error) });
  }
  
  //--------------------------------------------------------------
  // Actualiza el Tipo de Documento 
  public ActualizarArticulo() {

    var nuevoMarArticulo = this.ActualizaraArticulo.getRawValue()['textnuevoMarArticulo'];
    var nuevoNomArticulo = this.ActualizaraArticulo.getRawValue()['textnuevoNomArticulo'];
    var nuevoUniArticulo = this.ActualizaraArticulo.getRawValue()['textnuevoUniArticulo'];
    var nuevoVigArticulo = this.ActualizaraArticulo.getRawValue()['textnuevoVigArticulo'];

    var cadena = { "id_articulo": this.BuscarEvalor, "marca_articulo": nuevoMarArticulo, "nombre_articulo": nuevoNomArticulo, "unidades_articulo": nuevoUniArticulo, "vigencia_articulo": nuevoVigArticulo };

    this.servi.updateArticulo(cadena).then
      (
        res => {
          console.log("res  ", res)
        }
      ).catch(err => {
        console.log(err)
      });

    this.BuscarEvalor = 0;
    this.ActualizaraArticulo.reset();
  }

  ngOnInit(): void {
    this.ListaArticulo = this.formBuilder.group({

    });
    this.filtrarArticulo = this.formBuilder.group({
      combofiltro: []

    });
   
    this.InsertarGArticulo = this.formBuilder.group({
      combofiltromarca: [],
      textMarArticulo: [],
      textNomArticulo: [],
      textUniArticulo: [],
      textVigArticulo: []
    });
    this.formBuilder.group

    this.ActualizaraArticulo = this.formBuilder.group({
      BuscarIdArticulo: [],
      textnuevoMarArticulo: [],
      textnuevoNomArticulo: [],
      textnuevoUniArticulo: [],
      textnuevoVigArticulo: []
    });
    this.formBuilder.group
  }

}
