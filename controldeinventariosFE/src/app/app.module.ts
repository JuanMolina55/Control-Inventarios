import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

 // Librería para poder consumir el servicio
import { HttpModule, } from '@angular/http';
import { HttpClientModule, } from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
//import { FormGroup, FormBuilder } from '@angular/forms';

import { ServiciocontrolinventarioService } from './serviciocontrolinventario.service';
import { AppComponent } from './appcomponent/app.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { MenuinicioComponent } from './menuinicio/menuinicio.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { FacturacompraComponent } from './facturacompra/facturacompra.component';
import { TipdocComponent } from './tipdoc/tipdoc.component';
import { DetallecompraComponent } from './detallecompra/detallecompra.component';
import { InventarioComponent } from './inventario/inventario.component';
import { MarcaComponent } from './marca/marca.component';
import { InformesComponent } from './informes/informes.component';

const appRoutes: Routes = 
[
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'Inicio'
  },
  {
    path: 'Inicio',
    component:MenuinicioComponent,
  },
  {
    path: 'Tipos-Documentos',
    component:TipdocComponent,
  },
  {
    path: 'Articulos',
    component:ArticuloComponent,
  },
  {
    path: 'Proveedores',
    component:ProveedorComponent,
  },
  {
    path: 'Factura-Compras',
    component:FacturacompraComponent,
  },
  {
    path: 'Detalle-Compras',
    component:DetallecompraComponent,
  },
  {
    path: 'Inventarios',
    component:InventarioComponent,
  },
  {
    path: 'Marcas',
    component:MarcaComponent,
  },
  {
    path: 'Informes',
    component:InformesComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ArticuloComponent,
    MenuinicioComponent,
    ProveedorComponent,
    FacturacompraComponent,
    TipdocComponent,
    TipdocComponent,
    DetallecompraComponent,
    InventarioComponent,
    MarcaComponent,
    InformesComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
      RouterModule.forRoot(appRoutes), // se agregan estos 
      BrowserModule,
      HttpClientModule,  // <- Agregar la clase
      
  ],
  providers: [ServiciocontrolinventarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
