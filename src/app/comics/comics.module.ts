import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComicsComponent } from './comics.component';
import { SharedModule } from '../shared';

const comicsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: ComicsComponent
  }
]);

@NgModule({
  imports: [
    comicsRouting,
    SharedModule
  ],
  declarations: [
    ComicsComponent
  ],
  providers: [
  ]
})
export class ComicsModule {}