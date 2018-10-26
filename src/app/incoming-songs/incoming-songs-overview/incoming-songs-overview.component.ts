import { IncomingSongService } from './../../core/incoming-song.service';
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

  constructor(private incomingSongService: IncomingSongService)
  {
  }

  ngOnInit()
  {
  }

  getTopThreeSongs()
  {
    if (this.band == undefined)
      return [];

    return this.incomingSongService.getTopSongs(this.band, 3);
  }

  hasIncomingSongs()
  {
    if (this.band == undefined)
      return false;

    return this.band.incomingSongs.length > 0;
  }
}
