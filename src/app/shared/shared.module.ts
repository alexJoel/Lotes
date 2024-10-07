import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageLoteComponent } from './component/image-lote/image-lote.component';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ImageLoteComponent,
    MatExpansionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule
  ],
  exports: [
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [
    
  ]
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
