import { TodoService } from './../core/todo.service';
import { IncomingSongsModule } from './../incoming-songs/incoming-songs.module';
import { BandsShowComponent } from './bands-show/bands-show.component';
import { BandsListComponent } from './bands-list/bands-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BandsRoutingModule } from './bands-routing.module';
import { BandsAddComponent } from './bands-add/bands-add.component';
import { BandService } from '../core/band.service';
import { BandsLayoutComponent } from './bands-layout/bands-layout.component';
import { SongsModule } from '../songs/songs.module';
import { MusiciansModule } from '../musicians/musicians.module';
import { CalendarModule } from '../calendar/calendar.module';
import { NotesModule } from '../notes/notes.module';

@NgModule({
  imports: [
    CommonModule,
    BandsRoutingModule,
    FormsModule,
    SongsModule,
    MusiciansModule,
    IncomingSongsModule,
    CalendarModule,
    NotesModule
  ],
  declarations: [
    BandsShowComponent,
    BandsListComponent,
    BandsAddComponent,
    BandsLayoutComponent
  ],
  providers: [
    BandService,
    TodoService
  ]
})
export class BandsModule { }
