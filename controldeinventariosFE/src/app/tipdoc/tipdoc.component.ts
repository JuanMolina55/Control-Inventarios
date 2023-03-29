import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciocontrolinventarioService } from '../serviciocontrolinventario.service';

@Component({
  selector: 'app-tipdoc',
  templateUrl: './tipdoc.component.html',
  styleUrls: ['./tipdoc.component.css']
})
export class TipdocComponent implements OnInit {

  TipDocs: any = [];              //Lista de Tipos de Documentos
  TituloTipDocs = "";             //Titulo Lista de Tipos de Documentos
  TablaTipDocs: any = [];        //Encabezados tabla Lista de Tipos de Documentos 

  MiTipDoc: any = [];             //Tipo de Documento Buscado
  TituloTipDoc = "";              //Titulo de Tipo de Documento Buscado
  TabBusTipDocs: any = [];        //Encabezados tabla Tipo de Documento Buscado 

  TituloTipDocEdit = "";          //Titulo de Tipo de Documento a Editar
  MiTipDocE: any = [];            //Tipo de Documento a Editar
  comboEditarTipDoc: any = [];    //Combo Editar Tipo de Documento

  comboListaTipDoc: any = [];     //Combo Buscar Tipo de Documento
  BuscarEvalor = 1;               //Control para carga del valor a buscar

  title = "MANEJO DE TIPOS DE DOCUMENTOS";
  controlLista = 1; //Control para limpiar la lista

  filtrarTipDoc = new FormGroup({
    combofiltro: new FormControl()
  });

  InsertarGTipDoc = new FormGroup({
    textTipDoc: new FormControl(),
    textIniTipDoc: new FormControl()
  });

  ListaTiposDocum = new FormGroup({

  });

  ActualizarATipDoc = new FormGroup({
    BuscarIdTipDoc: new FormControl(),
    textnuevotipdoc: new FormControl(),
    textnuevoinicialestipdoc: new FormControl()

  });

  constructor(
    private formBuilder: FormBuilder,
    private servi: ServiciocontrolinventarioService,
    Router: Router
  ) { }
  //..............................................................................................
  // CRUD
  //............................................................................................
  // Lista Tipos de documentos.

  public consultaTipoDocumentos(op: any) {
    //console.error(" El listado 1 " );
    if (this.controlLista == 1) {
      //console.log("component")
      this.servi.getTipDocs().subscribe((data: any) => {
        //console.error(" El listado 2 " );
        if (op == 1) {
          let dat = data;
          this.TipDocs = JSON.parse(data);
          this.TituloTipDocs = "LISTA DE TIPOS DE DOCUMENTOS";
          this.TablaTipDocs[0] = "Indicador";
          this.TablaTipDocs[1] = "Denominación";
          this.TablaTipDocs[2] = "Iniciales";
          //console.error(" El listado 3 " + this.TipDocs);
        }
        else if (op == 2) {
          this.comboListaTipDoc = JSON.parse(data);
          this.MiTipDoc = null;
          this.TituloTipDoc = "";
          this.TabBusTipDocs[0] = "";
          this.TabBusTipDocs[1] = "";
          this.TabBusTipDocs[2] = "";
          //console.error(" El listado 4 ");
        }
        else if (op == 3) {
          this.comboEditarTipDoc = JSON.parse(data);
          this.MiTipDocE = null;
          this.TituloTipDocEdit = "";
          // this.ActualizarATipDoc.removeControl("textnuevotipdoc");
          // this.ActualizarATipDoc.removeControl("textnuevoinicialestipdoc");
          //console.error(" El listado 5 ");
        }
      },
        error => { console.error(error + " ") });
    }
    else {
      this.TipDocs = null;
      this.TituloTipDocs = "";
      this.TablaTipDocs[0] = "";
      this.TablaTipDocs[1] = "";
      this.TablaTipDocs[2] = "";
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
  public buscarTipDoc() {
    var filtovalor = this.filtrarTipDoc.getRawValue()['combofiltro'];
    this.servi.getTipDoc('/' + filtovalor).subscribe((data: {}) => {
      this.MiTipDoc = data;
      this.TituloTipDoc = "TIPO DE DOCUMENTO SELECCIONADO";
      this.TabBusTipDocs[0] = "Indicador";
      this.TabBusTipDocs[1] = "Denominación";
      this.TabBusTipDocs[2] = "Iniciales";
    },
      error => { console.log(error) });
  }

  //--------------------------------------------------------------
  //Para insertar un nuevo Tipo de Documento
  public InsertarTipDoc() {
    var datosvalo2 = this.InsertarGTipDoc.getRawValue()['textTipDoc'];
    var datosvalo1 = this.InsertarGTipDoc.getRawValue()['textIniTipDoc'];
    var cadena = { "tipo_documento": datosvalo2, "iniciales_tip_doc": datosvalo1 };

    this.servi.insertTipDoc(cadena).then
      (res => {
        console.log(res)
      }
      ).catch(err => {
        console.log(err)
      });
    this.InsertarGTipDoc.reset();
  }

  //----------------------------------------------------------------------------
  // Consulta un tipo de documento por medio de su id para editarlo
  buscarEditarTipDoc() {
    if (this.BuscarEvalor != 0) {
      this.BuscarEvalor = this.ActualizarATipDoc.getRawValue()['BuscarIdTipDoc'];
      //console.error(" dos el filtro " + this.BuscarEvalor);
    }
    //console.error(" tres el filtro " + this.BuscarEvalor);

    this.servi.getTipDoc('/' + this.BuscarEvalor).subscribe((data: {}) => {

      this.MiTipDocE = data;
      this.TituloTipDocEdit = "TIPO DE DOCUMENTO A EDITAR";

    }, error => { console.log(error) });
  }

  //--------------------------------------------------------------
  // Actualiza el Tipo de Documento 
  public ActualizarTipDoc() {

    var nuevotipdoc = this.ActualizarATipDoc.getRawValue()['textnuevotipdoc'];
    var nuevoinitipdoc = this.ActualizarATipDoc.getRawValue()['textnuevoinicialestipdoc'];

    var cadena = { "id_tip_doc": this.BuscarEvalor, "tipo_documento": nuevotipdoc, "iniciales_tip_doc": nuevoinitipdoc };

    this.servi.updateTipDoc(cadena).then
      (
        res => {
          console.log("res  ", res)
        }
      ).catch(err => {
        console.log(err)
      });

    this.BuscarEvalor = 0;
    this.ActualizarATipDoc.reset();
  }

  ngOnInit(): void {
    this.ListaTiposDocum = this.formBuilder.group({

    });
    this.filtrarTipDoc = this.formBuilder.group({
      combofiltro: []

    });
    this.InsertarGTipDoc = this.formBuilder.group({
      textTipDoc: [],
      textIniTipDoc: []
    });
    this.formBuilder.group

    this.ActualizarATipDoc = this.formBuilder.group({
      BuscarIdTipDoc: [],
      textnuevotipdoc: [],
      textnuevoinicialestipdoc: []
    });
    this.formBuilder.group

  }

}
