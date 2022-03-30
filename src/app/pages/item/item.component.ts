import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcionI } from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  productoDescripcion: ProductoDescripcionI = {};
  productoID: string = "";

  constructor( private route: ActivatedRoute,
               public productoService: ProductosService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe( parametros => {

        this.productoService.getProducto(parametros['id'])
          .subscribe( (producto: ProductoDescripcionI) => {
            this.productoID = parametros['id'];
            this.productoDescripcion = producto;

          });
      });
  }

}
