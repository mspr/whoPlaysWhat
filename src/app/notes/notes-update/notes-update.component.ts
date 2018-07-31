import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wpw-notes-update',
  templateUrl: './notes-update.component.html',
  styleUrls: ['./notes-update.component.scss']
})

export class NotesUpdateComponent implements OnInit
{
  public notes = new Array<string>("Need to practice 120 bpm", "Need to bring the acoustic for last session");

  constructor()
  {
  }

  ngOnInit()
  {
  }
}
