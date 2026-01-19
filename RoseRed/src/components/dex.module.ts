import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DexComponent } from './dex/dex.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TypeCellComponent } from './dex/type-cell/type-cell.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonComponent } from './pokemon/pokemon.component';
import { MoveListComponent } from './move-list/move-list.component';



@NgModule({
  declarations: [
    DexComponent,
    TypeCellComponent,
    PokemonComponent,
    MoveListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  exports: [
    DexComponent
  ]
})
export class DexModule { }
