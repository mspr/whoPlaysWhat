import { MusiciansShowComponent } from './musicians-show/musicians-show.component';
import { FormsModule } from '@angular/forms';
import { MusicianService } from './../core/musician.service';
import { MusiciansListComponent } from './musicians-list/musicians-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MusiciansRoutingModule } from './musicians-routing.module';
import { MusiciansAddComponent } from './musicians-add/musicians-add.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MusiciansRoutingModule,
    ColorPickerModule,
    MultiselectDropdownModule
  ],
  exports: [
    MusiciansListComponent
  ],
  declarations: [
    MusiciansListComponent,
    MusiciansAddComponent,
    MusiciansShowComponent
  ],
  providers: [
    MusicianService
  ]
})
export class MusiciansModule { }
