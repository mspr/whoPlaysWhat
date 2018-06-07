import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomingSongsListComponent } from './incoming-songs-list/incoming-songs-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    IncomingSongsListComponent
  ],
  declarations: [
    IncomingSongsListComponent
  ]
})
export class IncomingSongsModule { }
