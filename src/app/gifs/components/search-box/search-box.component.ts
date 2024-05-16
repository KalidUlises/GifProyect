import { GifsService } from './../../services/gifs.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  constructor(private gifService: GifsService){}

  // Hace referencia a un elemento del HTML, para poder hacer referencia se tiene
  // que crear una variable que es del tipo ElementRef, osea un objeto del html.
  // Pero este elemento del html tiene que ser especificado
  @ViewChild('TextTagInput')
  public taginput!: ElementRef<HTMLInputElement>;
  // puede ser nulo, que no exista, asi que se le asegura con un nonNull operator.

  //esta es la forma en la que podemos ver el contenido de un input.
  // searchTag(newTagInput: String):void{
  //   console.log(newTagInput)
  // }

searchTag(){
  const newTag = this.taginput.nativeElement.value;
  // console.log(newTag);
  if(newTag=="") return;
  this.gifService.addSearchTag(newTag);
  this.taginput.nativeElement.value="";
}


}
