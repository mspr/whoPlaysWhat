import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomingSongsOverviewComponent } from './incoming-songs-overview/incoming-songs-overview.component';
import { IncomingSongsUpdateComponent } from './incoming-songs-update/incoming-songs-update.component';
import { IncomingSongsRoutingModule } from './incoming-songs-routing.module';
import { IncomingSongService } from '../core/incoming-song.service';
import { IncomingSongsShowComponent } from './incoming-songs-show/incoming-songs-show.component';
import { FormsModule } from '@angular/forms';
import { SongsModule } from '../songs/songs.module';
import { IncomingSongsAddComponent } from './incoming-songs-add/incoming-songs-add.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IncomingSongsRoutingModule,
    FormsModule,
    SongsModule
  ],
  exports: [
    IncomingSongsOverviewComponent
  ],
  declarations: [
    IncomingSongsOverviewComponent,
    IncomingSongsUpdateComponent,
    IncomingSongsShowComponent,
    IncomingSongsAddComponent
  ],
  providers: [
    IncomingSongService
  ]
})
export class IncomingSongsModule { }
