import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsShowComponent } from './songs-show/songs-show.component';
import { SongsAddComponent } from './songs-add/songs-add.component';
import { SongsListComponent } from './songs-list/songs-list.component';
import { SongsRoutingModule } from './songs-routing.module';
import { FormsModule } from '@angular/forms';
import { SongService } from '../core/song.service';
import { SongsUpdateComponent } from './songs-update/songs-update.component';
import { BandService } from '../core/band.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SongsRoutingModule
  ],
  declarations: [
    SongsShowComponent,
    SongsAddComponent,
    SongsListComponent,
    SongsUpdateComponent
  ],
  exports: [
    SongsListComponent
  ],
  providers: [
    BandService,
    SongService
  ]
})
export class SongsModule { }
