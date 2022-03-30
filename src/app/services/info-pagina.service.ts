import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { InfoEquipo } from '../interfaces/info-equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  equipo: InfoEquipo[] = [];

  constructor( private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();

   }

   private cargarInfo() {
      //Leer el archivo JSON
      this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina) => {
        this.info = resp;
        this.cargada = true;
      });
   }

   private cargarEquipo() {
        //Leer el archivo JSON
        this.http.get('https://angular-html-85021-default-rtdb.europe-west1.firebasedatabase.app/equipo.json')
        .subscribe( resp  => {
          this.equipo = <InfoEquipo[]>(resp);
        });
   }
}
