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
import { SongsStructureComponent } from './songs-structure/songs-structure.component';
import { SongsLevelComponent } from './songs-level/songs-level.component';

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
    SongsUpdateComponent,
    SongsStructureComponent,
    SongsLevelComponent
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
