import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesUpdateComponent } from './notes-update/notes-update.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    NotesUpdateComponent
  ],
  declarations: [NotesUpdateComponent]
})
export class NotesModule { }
