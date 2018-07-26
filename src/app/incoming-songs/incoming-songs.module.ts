import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomingSongsOverviewComponent } from './incoming-songs-overview/incoming-songs-overview.component';
import { IncomingSongsUpdateComponent } from './incoming-songs-update/incoming-songs-update.component';
import { IncomingSongsRoutingModule } from './incoming-songs-routing.module';
import { IncomingSongService } from '../core/incoming-song.service';
import { IncomingSongsShowComponent } from './incoming-songs-show/incoming-songs-show.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IncomingSongsRoutingModule,
    FormsModule
  ],
  exports: [
    IncomingSongsOverviewComponent
  ],
  declarations: [
    IncomingSongsOverviewComponent,
    IncomingSongsUpdateComponent,
    IncomingSongsShowComponent
  ],
  providers: [
    IncomingSongService
  ]
})
export class IncomingSongsModule { }
