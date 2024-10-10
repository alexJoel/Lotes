import { Component } from '@angular/core';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [],
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss'
})
export class DescriptionComponent {
  params: any;

  agInit(params: any){
    this.params = params;
  }

  extractText(parrafo: string, inicio:string, fin: string): any {
    const patron = new RegExp(`${inicio}(.*?)${fin}`);
    const resultado = parrafo.match(patron);
    return resultado ? resultado[1].trim() : null;
  }
}
