import { IncomingSong } from './../incoming-song';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wpw-incoming-songs-update',
  templateUrl: './incoming-songs-update.component.html',
  styleUrls: ['./incoming-songs-update.component.scss']
})
export class IncomingSongsUpdateComponent implements OnInit
{
  public incomingSongs : IncomingSong[];

  constructor() { }

  ngOnInit() {
  }

}
