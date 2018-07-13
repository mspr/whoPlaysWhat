import { Band } from './../../bands/band';
import { BandService } from './../../core/band.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../../core/song.service';

@Component({
  selector: 'wpw-songs-overview',
  templateUrl: './songs-overview.component.html',
  styleUrls: ['./songs-overview.component.scss']
})
export class SongsOverviewComponent implements OnInit {

  public songs : Song[];
  public band : Band;

  constructor(private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private songService: SongService) { }

  ngOnInit() {
    let bandId = this.activatedRoute.snapshot.params['id'];

    this.bandService.getById(bandId).switchMap((band) => {
      this.band = band;
      return this.songService.getAllByBand(this.band)
    })
    .subscribe((songs) => {
      this.songs = songs;
    });
 }

}
