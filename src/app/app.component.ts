import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { ImageLoteComponent } from './shared/component/image-lote/image-lote.component';
import { SharedModule } from './shared/shared.module';
import { FormControl, FormGroup } from '@angular/forms';
import { LoteService } from './services/lote.service';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { DescriptionComponent } from './shared/component/description/description.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AgGridAngular, SharedModule, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  readonly panelOpenState = signal(false);
  public lotesObj: any = {};
  public listLotes: any = [];

  public formSubasta = new FormGroup({
    key: new FormControl(''),
  });

  colDefs: ColDef[] = [
    // Descripción: MOCHILA Características: COLOR NEGRO Cantidad: 1 Unidad de Medida: Número de Unidades Industria: No determinado Fecha Vencimiento: N/A Modelo: Estado: NUEVA Peso Kg.: 1.5 Observaciones: CON LOGO
    {
      field: 'imageUri',
      cellRenderer: ImageLoteComponent,
      width: 250,
    },
    {
      headerName: 'Descripcion',
      field: 'desc', flex: 1, wrapText: true, autoHeight: true, 
      cellRenderer: DescriptionComponent,
    },
    // { headerName: 'Características', field: 'characteristics', flex: 1, wrapText: true, autoHeight: true },
    // { headerName: 'Cant',field: 'cant', flex: 1, autoHeight: false },
    // { headerName: 'Industria',field: 'industry', flex: 1, wrapText: true, autoHeight: true },
    // { headerName: 'Fecha Vencimiento',field: 'expirationDate', flex: 1, wrapText: true, autoHeight: true },
    // { headerName: 'Modelo',field: 'model', flex: 1, wrapText: true, autoHeight: true },
    // { headerName: 'Estado',field: 'status', flex: 1, wrapText: true, autoHeight: true },
    // { headerName: 'Peso kg',field: 'peso', flex: 1, wrapText: true, autoHeight: true },
    // { headerName: 'Observaciones',field: 'obs', flex: 1, wrapText: true, autoHeight: true },
  ];

  constructor(
    private spinner: NgxSpinnerService,
    private lote: LoteService
  ) {}

  submit() {
    this.spinner.show();
    console.log(this.formSubasta.value.key);
    if (this.formSubasta.value.key && this.formSubasta.value.key.trim() !== '') {
      this.lote.searchLotes(this.formSubasta.value.key).subscribe({
        next: (res: any) => {
        // const res = this.lote.data();
          console.log(res);
          if (res) {
            res.forEach((x: any) => {
              if (!this.lotesObj.hasOwnProperty(x.LotNumber)) {
                this.lotesObj[x.LotNumber] = {
                  lotes: [],
                };
              }

              this.lotesObj[x.LotNumber].lotes.push({
                imageUri: x.ImageUri,
                desc: x.Description// this.extractText(x.Description, 'Descripción:','Características'),
                // characteristics: this.extractText(x.Description, 'Características:','Cantidad'),
                // cant: this.extractText(x.Description, 'Cantidad:','Unidad de Medida'),
                // unity: this.extractText(x.Description, 'Unidad de Medida:','Industria'),
                // industry: this.extractText(x.Description, 'Industria:','Fecha Vencimiento'),
                // expirationDate: this.extractText(x.Description, 'Fecha Vencimiento:','Modelo'),
                // model: this.extractText(x.Description, 'Modelo:','Estado'),
                // status: this.extractText(x.Description, 'Estado:','Peso Kg'),
                // peso: this.extractText(x.Description, 'Peso Kg.:','Observaciones'),
                // obs: x.Description.split('Observaciones:')[0],
              });
            });

            console.log(this.lotesObj);

            Object.keys(this.lotesObj);

            for (const item of Object.keys(this.lotesObj)) {
              this.listLotes.push({
                LoteId: item,
                Lotes: this.lotesObj[item].lotes,
              });
            }
            console.log(this.listLotes);
          }
          this.spinner.hide();
        },
        error: err => {
          console.log(err);
          this.spinner.hide();
        }
      });
    }
  }

  extractText(parrafo: string, inicio:string, fin: string): any {
    const patron = new RegExp(`${inicio}(.*?)${fin}`);
    const resultado = parrafo.match(patron);
    return resultado ? resultado[1].trim() : null;
  }
}
