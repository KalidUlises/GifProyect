import { Gif } from './../Interfaces/gifs.interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse } from '../Interfaces/gifs.interfaces';



const GHIPY_API_KEY = "JcqJKTmnfqt8xL0SWjDry0QiVv7y6Xq9";
const GHIPY_URL =  "https://api.giphy.com/v1/gifs/search";

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList:Gif[] = [];


  //En esta variable es que se guarda de forma global el historial de busqueda.
  private _tagsHistory:string[] = [];

  constructor(private http:HttpClient) { }

  get tagsHistory(){
    // Los arrays pasan por una referencia, por lo que con el operador
    // spread evitan eso. Da mayor seguridad.
    return [...this._tagsHistory];
  }

  // * Este metodo unicamente se encarga de agregar la busqueda al sidebar
  addSearchTag(tag : string){
    if(tag.length ===0) return;
    tag = tag.toLowerCase();
    this.organizeHistory(tag);
    this._tagsHistory.unshift(tag);
    console.log(this._tagsHistory)

    this.gifsPeticionHttp(tag);
  }

  private organizeHistory(tag:string){
    // debugger;
    if(this.tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag.toLowerCase() !== tag );
    }
    this._tagsHistory = this._tagsHistory.splice(0,10);
  }

  async gifsPeticionHttp(tag: string):Promise<void>{
    // Esta es una forma muy simple y comun de hacer una petición, si no neceitas nada mas entonces lo dejas ocmo fetch
    // fetch("https://api.giphy.com/v1/gifs/search?api_key=JcqJKTmnfqt8xL0SWjDry0QiVv7y6Xq9&q=fiesta&limit=5")
    // .then(resp => resp.json())
    // .then(data => console.log(data));

    const params = new HttpParams()
    .set('api_key', GHIPY_API_KEY)
    .set('q', tag)
    .set('limit', 5);

    //Este objeto es un observable
    this.http.get<SearchResponse>(GHIPY_URL,{params: params})
    .subscribe(resp =>{
      this.gifList = resp.data,
      console.log(this.gifList)});
  }
}
