import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap} from 'rxjs/operators';

const httpOptions =
{
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ServiciocontrolinventarioService {

  private Url: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  
  private extractData(res: Response) 
  {
    //console.log("22    ");
    let body = JSON.parse('' + res);
    //console.log("23 A " + body);
    return body || {};
  }
  
  private handleError<T>(operation = 'operation', result?: T) 
  {
    //console.log(" ggggg ");
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T)
    };
  }

  //-------------------------------------------------------------
  // Métodos para listar
  getTipDocs(): Observable<any>{
    return this.http.get(this.Url + "/tipdoc" , httpOptions);
  }
  
  getArticulos(): Observable<any>{
    return this.http.get(this.Url + "/articulos" , httpOptions);
  }

  getDetalleCompras(): Observable<any>{
    return this.http.get(this.Url + "/detallecompras" , httpOptions);
  }

  getFacturaCompras(): Observable<any>{
    return this.http.get(this.Url + "/facturacompras" , httpOptions);
  }

  getInventarios(): Observable<any>{
    return this.http.get(this.Url + "/inventarios" , httpOptions);
  }

  getMarcas(): Observable<any>{
    return this.http.get(this.Url + "/marcas" , httpOptions);
  }

  getProveedores(): Observable<any>{
    return this.http.get(this.Url + "/proveedores" , httpOptions);
  }

  //-------------------------------------------------------------
  // Métodos para mostrar
  getTipDoc(id:any): Observable<any> {
    //console.log(this.Url + "/tipdoc" + id )
    return this.http.get(this.Url + "/tipdoc" + id , httpOptions);
  }

  getArticulo(id:any): Observable<any> {
    return this.http.get(this.Url + "/articulos" + id , httpOptions);
  }

  getDetalleCompra(id:any): Observable<any> {
    return this.http.get(this.Url + "/detallecompras" + id , httpOptions);
  }

  getFacturaCompra(id:any): Observable<any> {
    return this.http.get(this.Url + "/facturacompras" + id , httpOptions);
  }

  getInventario(id:any): Observable<any> {
    return this.http.get(this.Url + "/inventarios" + id , httpOptions);
  }

  getMarca(id:any): Observable<any> {
    return this.http.get(this.Url + "/marcas" + id , httpOptions);
  }

  getProveedor(id:any): Observable<any> {
    return this.http.get(this.Url + "/proveedores" + id , httpOptions);
  }

  //-------------------------------------------------------------
  // Métodos para insertar 
  async insertTipDoc(TipDocD: any): Promise<any> {
    //console.log(TipDocD, this.Url+"/tipdoc")
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/tipdoc", TipDocD, httpOptions).toPromise()
    });
  }

  async insertArticulo(ArticuloD: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/articulos", ArticuloD, httpOptions).toPromise()
    });
  }

  async insertDetalleCompra(DetalleCompraD: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/detallecompras", DetalleCompraD, httpOptions).toPromise()
    });
  }

  async insertFacturaCompra(FacturaCompraD: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/facturacompras", FacturaCompraD, httpOptions).toPromise()
    });
  }

  async insertInventario(InventarioD: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/inventarios", InventarioD, httpOptions).toPromise()
    });
  }

  async insertMarca(MarcaD: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/marcas", MarcaD, httpOptions).toPromise()
    });
  }

  async insertProveedor(ProveedorD: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/proveedores", ProveedorD, httpOptions).toPromise()
    });
  }

  //-------------------------------------------------------------
  // Métodos para modificar
  async updateTipDoc(cadena: any): Promise<any> {
    //console.log("33 " + cadena)
    //console.log("tales 60  " + cadena.id_tip_doc + " - " + cadena.tipo_documento+ " - " +  cadena.iniciales_tip_doc, this.Url + "/tipdoc")
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/tipdoc", cadena, httpOptions).toPromise()
    });
  }

  async updateArticulo(cadena: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/articulos", cadena, httpOptions).toPromise()
    });
  }

  async updateDetalleCompra(cadena: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/detallecompras", cadena, httpOptions).toPromise()
    });
  }

  async updateFacturaCompra(cadena: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/facturacompras", cadena, httpOptions).toPromise()
    });
  }

  async updateInventario(cadena: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/inventarios", cadena, httpOptions).toPromise()
    });
  }

  async updateMarca(cadena: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/marcas", cadena, httpOptions).toPromise()
    });
  }

  async updateProveedor(cadena: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/proveedores", cadena, httpOptions).toPromise()
    });
  }

  //-------------------------------------------------------------
  // Informes
  getInfoArticulo(articuloInfo:any, fechInInfo:any, fechFinInfo:any): Observable<any> { 
    return this.http.get(this.Url + "/articulos/" + articuloInfo + "/" + fechInInfo + "/" + fechFinInfo, httpOptions);
    //.pipe(map(this.extractData))
  }

  postInfoProveedor(parametros:any): Observable<any>{
    return this.http.post(this.Url + "/proveedores/Informe", parametros, httpOptions);
  }
}