import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
  	HttpModule,
    RouterModule
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
  	HttpModule,
    RouterModule
  ]
})
export class SharedModule {}