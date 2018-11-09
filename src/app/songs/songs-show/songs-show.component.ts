import { BandService } from './../../core/band.service';
import { Musician } from './../../musicians/musician';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../../core/song.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MusicianService } from '../../core/musician.service';
import { Band } from '../../bands/band';

@Component({
  selector: 'wpw-song',
  templateUrl: './songs-show.component.html',
  styleUrls: ['./songs-show.component.scss']
})

export class SongsShowComponent implements OnInit, OnDestroy
{
  public band : Band;
  public song = new Song();
  public musicians = new Array<Musician>();

  constructor(private activatedRoute: ActivatedRoute,
    private musicianService: MusicianService,
    private bandService: BandService,
    private songService: SongService)
  {
  }

  ngOnInit()
  {
    let bandId = this.activatedRoute.parent.snapshot.params['id'];
    let songId;

    this.activatedRoute.params.switchMap((params) =>
    {
      songId = params.id;
      return this.bandService.getById(bandId)
    })
    .subscribe((band) =>
    {
      this.band = band;
      this.song = Song.fromJSON(this.band.songs.find(s => s.id === songId));
      this.musicians = this.band.musicians;
    });
  }

  ngOnDestroy()
  {
  }
}
