import { BandService } from './../../core/band.service';
import { Band } from './../../bands/band';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wpw-notes-update',
  templateUrl: './notes-update.component.html',
  styleUrls: ['./notes-update.component.scss']
})

export class NotesUpdateComponent implements OnInit
{
  @Input()
  public band : Band;

  public newNote = "";

  constructor(private bandService: BandService)
  {
  }

  ngOnInit()
  {
  }

  addNote(note)
  {
    this.band.notes.push(this.newNote);
    this.newNote = "";
    this.bandService.update(this.band).subscribe();
  }
}
