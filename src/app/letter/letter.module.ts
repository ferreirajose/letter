import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LetterRoutingModule } from './letter-routing.module';
import { LetterComponent } from './letter.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    LetterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    LetterRoutingModule
  ]
})
export class LetterModule { }
