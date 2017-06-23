import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Md5 } from 'ts-md5/dist/md5';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { ComicsModule } from './comics/comics.module';
import {
  FooterComponent,
  HeaderComponent,
  SharedModule,
  ApiService
} from './shared';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    ComicsModule,
    SharedModule,
    rootRouting,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    ApiService,
    Md5
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
