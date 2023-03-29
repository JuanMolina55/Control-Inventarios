import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciocontrolinventarioService } from '../serviciocontrolinventario.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  title = "INFORMES";
  InfoArticulo: any = [];
  InfoProveedor: any = [];
  TituloInfoArticulo = "";
  TituloInfoProveedor = "";
  TabBusArticulo: any = [];
  TabBusProveedor: any = [];

  InformeArticuloG = new FormGroup({
    textarticuloInfo: new FormControl(),
    textfechainicialInfo: new FormControl(),
    textfechafinalInfo: new FormControl()
  });

  InformeProveedorC = new FormGroup({
    textproveedorInfo: new FormControl(),
    textfechainicialInfo: new FormControl(),
    textfechafinalInfo: new FormControl()
  });

  constructor(
    private formBuilder: FormBuilder,
    private servi: ServiciocontrolinventarioService,
    Router: Router
  ) { }

  InformeArticulo() {
    var articuloInfo = this.InformeArticuloG.getRawValue()['textarticuloInfo'];
    var fechainicialInfo = this.InformeArticuloG.getRawValue()['textfechainicialInfo'];
    var vfechafinalInfo = this.InformeArticuloG.getRawValue()['textfechafinalInfo'];

    this.servi.getInfoArticulo(articuloInfo, fechainicialInfo, vfechafinalInfo).subscribe((data: {}) => {

      this.InfoArticulo = data;
      this.TituloInfoArticulo = "INFORME EXISTENCIAS POR ARTICULO Y PERIODO DE TIEMPO";
      this.TabBusArticulo[0] = "Indicador";
      this.TabBusArticulo[1] = "Nombre";
      this.TabBusArticulo[2] = "Marca";
      this.TabBusArticulo[3] = "Cantidad";
      this.TabBusArticulo[4] = "Ingreso";
      this.TabBusArticulo[5] = "Salida";

    }, error => { console.log(error) });
  }

  InformeProveedor() {
    var proveedorInfo = this.InformeProveedorC.getRawValue()['textproveedorInfo'];
    var fechainicialInfo = this.InformeProveedorC.getRawValue()['textfechainicialInfo'];
    var vfechafinalInfo = this.InformeProveedorC.getRawValue()['textfechafinalInfo'];

    var parametros = {"nombre_proveedor": proveedorInfo, "fechIn": fechainicialInfo, "fechFin": vfechafinalInfo}

    this.servi.postInfoProveedor(parametros).subscribe((data: {}) => {

      this.InfoProveedor = data;
      this.TituloInfoProveedor = "INFORME COMPRAS POR PROVEEDOR Y PERIODO DE TIEMPO";
      this.TabBusProveedor[0] = "Indicador";
      this.TabBusProveedor[1] = "Nombre";
      this.TabBusProveedor[2] = "Pago";
      this.TabBusProveedor[3] = "Estado";
      this.TabBusProveedor[4] = "Fecha";
      this.TabBusProveedor[5] = "Ingreso";
      this.TabBusProveedor[6] = "Salida";

    }, error => { console.log(error) });
  }

  ngOnInit(): void {
    this.InformeArticuloG = this.formBuilder.group({
      textarticuloInfo: [],
      textfechainicialInfo: [],
      textfechafinalInfo: []
    });
    this.formBuilder.group

    this.InformeProveedorC = this.formBuilder.group({
      textproveedorInfo: [],
      textfechainicialInfo: [],
      textfechafinalInfo: []
    });
    this.formBuilder.group
  }

}
