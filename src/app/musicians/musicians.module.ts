import { FormsModule } from '@angular/forms';
import { MusicianService } from './../core/musician.service';
import { MusiciansListComponent } from './musicians-list/musicians-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    MusiciansListComponent
  ],
  declarations: [
    MusiciansListComponent
  ],
  providers: [
    MusicianService
  ]
})
export class MusiciansModule { }
