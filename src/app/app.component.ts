import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { ImageLoteComponent } from './shared/component/image-lote/image-lote.component';
import { SharedModule } from './shared/shared.module';
import { FormControl, FormGroup } from '@angular/forms';
import { LoteService } from './services/lote.service';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";

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
    listData: new FormControl(''),
  });

  colDefs: ColDef[] = [
    {
      field: 'imageUri',
      cellRenderer: ImageLoteComponent,
      width: 250,
    },
    { field: 'Descripcion', flex: 1, wrapText: true, autoHeight: true },
  ];

  constructor(
    private spinner: NgxSpinnerService,
    private lote: LoteService
  ) {}

  submit() {
    this.spinner.show();
    console.log(this.formSubasta.value.listData);
    if (this.formSubasta.value.listData) {
      this.lote.searchLotes(this.formSubasta.value.listData).subscribe({
        next: (res: any) => {
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
                Descripcion: x.Description,
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
}
