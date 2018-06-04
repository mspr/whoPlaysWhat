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
  public song : Song = new Song();
  public musicians : Musician[] = new Array<Musician>();

  constructor(private activatedRoute: ActivatedRoute,
    private musicianService: MusicianService,
    private bandService: BandService,
    private songService: SongService) {}

  ngOnInit()
  {
    this.activatedRoute.params.pipe(
      switchMap((params) => this.songService.getById(params.id))
    ).switchMap((song) => {
      this.song = song;
      let bandId = this.activatedRoute.parent.snapshot.params['id'];
      return this.bandService.getById(bandId);
    }).switchMap((band) => {
      this.band = band;
      let bandSongInfo = band.songs.find(s => s.id == this.song.id);
      this.song.tempo = bandSongInfo.tempo;
      this.song.tonality = bandSongInfo.tonality;
      this.song.structure = bandSongInfo.structure;
      this.song.musicians = bandSongInfo.musicians;
      return this.musicianService.getAllByBand(band);
    }).subscribe((musicians) => {
      this.musicians = musicians;
    });
  }

  ngOnDestroy()
  {
  }
}
