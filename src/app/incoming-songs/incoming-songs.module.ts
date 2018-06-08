import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomingSongsListComponent } from './incoming-songs-list/incoming-songs-list.component';
import { IncomingSongsUpdateComponent } from './incoming-songs-update/incoming-songs-update.component';
import { IncomingSongsRoutingModule } from './incoming-songs-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IncomingSongsRoutingModule
  ],
  exports: [
    IncomingSongsListComponent
  ],
  declarations: [
    IncomingSongsListComponent,
    IncomingSongsUpdateComponent
  ]
})
export class IncomingSongsModule { }
