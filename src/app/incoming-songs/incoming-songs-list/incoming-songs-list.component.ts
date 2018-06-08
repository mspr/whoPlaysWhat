import { BandService } from './../../core/band.service';
import { Band } from './../../bands/band';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wpw-incoming-songs-list',
  templateUrl: './incoming-songs-list.component.html',
  styleUrls: ['./incoming-songs-list.component.scss']
})
export class IncomingSongsListComponent implements OnInit
{
  @Input()
  public band : Band;

  constructor() { }

  ngOnInit() {
  }
}
