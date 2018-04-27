import { BandsShowComponent } from './bands-show/bands-show.component';
import { BandsListComponent } from './bands-list/bands-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BandsRoutingModule } from './bands-routing.module';
import { BandsAddComponent } from './bands-add/bands-add.component';
import { BandService } from '../core/band.service';
import { BandsLayoutComponent } from './bands-layout/bands-layout.component';

@NgModule({
  imports: [
    CommonModule,
    BandsRoutingModule,
    FormsModule
  ],
  declarations: [
    BandsShowComponent,
    BandsListComponent,
    BandsAddComponent,
    BandsLayoutComponent
  ],
  providers: [
    BandService
  ]
})
export class BandsModule { }
