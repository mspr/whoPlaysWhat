import { Band } from './../../bands/band';
import { BandService } from './../../core/band.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../../core/song.service';
import { NavigationService } from '../../core/navigation.service';

@Component({
  selector: 'wpw-songs-overview',
  templateUrl: './songs-overview.component.html',
  styleUrls: ['./songs-overview.component.scss']
})

export class SongsOverviewComponent implements OnInit
{
  public songs : Song[];
  public band : Band;

  constructor(private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private songService: SongService,
    private navigationService: NavigationService)
  {
  }

  ngOnInit()
  {
    let bandId = this.activatedRoute.snapshot.params['id'];

    this.bandService.getById(bandId).subscribe((band) => {
      this.band = Band.fromInfo(band);
      this.songs = band.songs;
    })
 }

  storeUrlBeforeNavigation()
  {
    this.navigationService.storeParentRoute(this.activatedRoute, this.band.name);
  }

  getSongProgressionStyle(song : Song)
  {
    return { 'background': '-webkit-linear-gradient(left, rgb(168, 190, 168) ' + song.progression + '%, white ' + song.progression + '%)' };
  }
}
