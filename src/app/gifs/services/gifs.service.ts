import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory:string[] = [];

  constructor() { }

  get tagsHistory(){
    // Los arrays pasan por una referencia, por lo que con el operador
    // spread evitan eso. Da mayor seguridad.
    return [...this._tagsHistory];
  }

  addSearchTag(tag : string){
    this._tagsHistory.unshift(tag);
    console.log(this._tagsHistory)
  }

}
