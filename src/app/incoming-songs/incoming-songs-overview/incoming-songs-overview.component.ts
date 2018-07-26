import { BandService } from './../../core/band.service';
import { Band } from './../../bands/band';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wpw-incoming-songs-overview',
  templateUrl: './incoming-songs-overview.component.html',
  styleUrls: ['./incoming-songs-overview.component.scss']
})

export class IncomingSongsOverviewComponent implements OnInit
{
  @Input()
  public band : Band;

  constructor() { }

  ngOnInit() {
  }
}
