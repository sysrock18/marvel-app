import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComicsComponent } from './comics.component';
import { SharedModule } from '../shared';

const comicsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'comics',
    component: ComicsComponent
  }
]);

@NgModule({
  imports: [
    comicsRouting,
    SharedModule,
    NgbModule
  ],
  declarations: [
    ComicsComponent
  ],
  providers: [
  ]
})

export class ComicsModule {}