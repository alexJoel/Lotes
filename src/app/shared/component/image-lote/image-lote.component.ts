import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { MtxTooltipModule } from '@ng-matero/extensions/tooltip';

@Component({
  selector: 'app-image-lote',
  standalone: true,
  imports: [AgGridAngular, MtxTooltipModule],
  templateUrl: './image-lote.component.html',
  styleUrl: './image-lote.component.scss'
})
export class ImageLoteComponent {
  params: any;

  agInit(params: any){
    this.params = params; 
  } 
}
