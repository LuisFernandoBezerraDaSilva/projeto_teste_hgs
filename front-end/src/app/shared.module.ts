import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule
  ],
  exports: [
    HttpClientModule,
    CommonModule
  ]
})
export class SharedModule { }