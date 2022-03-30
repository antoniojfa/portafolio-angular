import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoI } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: ProductoI[] = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos(){
    this.http.get('https://angular-html-85021-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
        .subscribe(resp => {
        this.productos = <ProductoI[]>(resp);
        this.cargando = false;
    });
  }
}
