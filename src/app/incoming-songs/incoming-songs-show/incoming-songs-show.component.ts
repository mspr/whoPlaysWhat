import { Band } from './../../bands/band';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wpw-incoming-songs-show',
  templateUrl: './incoming-songs-show.component.html',
  styleUrls: ['./incoming-songs-show.component.scss']
})
export class IncomingSongsShowComponent implements OnInit {

  public band : Band;

  constructor() { }

  ngOnInit() {
  }

}
