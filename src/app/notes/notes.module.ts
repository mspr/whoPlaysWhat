import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesUpdateComponent } from './notes-update/notes-update.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NotesUpdateComponent
  ],
  declarations: [NotesUpdateComponent]
})
export class NotesModule { }
