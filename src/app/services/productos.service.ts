import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoI } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: ProductoI[] = [];
  productosFiltrados: ProductoI[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise((resolve, reject) => {
      this.http.get('https://angular-html-85021-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
        .subscribe(resp => {
          this.productos = <ProductoI[]>(resp);
          this.cargando = false;
          resolve('');
        });
    });


  }

  getProducto(id: string) {
    return this.http.get(`https://angular-html-85021-default-rtdb.europe-west1.firebasedatabase.app/productos/${id}.json`)
  }

  buscarProducto(termino: string) {
    //Comprobamos si hay productos cargados
    if ( this.productos.length === 0 ) {
      //Cargamos los productos
      this.cargarProductos().then( ()=> {
        //Se ejecuta después de tener los productos
        //Aplicar el filtro
        this.filtrarProductos( termino );
      });
    }else{
        //Aplicar el filtro
        this.filtrarProductos( termino );
    }
  }

  private filtrarProductos( termino: string ){
    this.productosFiltrados = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {
      const catLower = prod.categoria.toLocaleLowerCase();
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (catLower.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0){
        this.productosFiltrados.push( prod );
      }
    });
  }
}
