import { Musician } from './../../musicians/musician';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../../core/song.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MusicianService } from '../../core/musician.service';

@Component({
  selector: 'wpw-song',
  templateUrl: './songs-show.component.html',
  styleUrls: ['./songs-show.component.scss']
})
export class SongsShowComponent implements OnInit, OnDestroy
{
  public bandId : number;
  public song : Song;
  public musicians : Musician[] = new Array<Musician>();
  public musiciansColor = {};

  constructor(private activatedRoute: ActivatedRoute,
    private musicianService: MusicianService,
    private songService: SongService) {}

  ngOnInit()
  {
    this.bandId = this.activatedRoute.parent.snapshot.params['id'];

    this.activatedRoute.params.pipe(
      switchMap((params) => this.songService.getById(params.id))
    ).switchMap((song) => {
      this.song = song;
      return this.musicianService.getAllByBand(this.bandId);
    }).subscribe((musicians) => {
      this.musicians = musicians;
      this.musicians.forEach(musician => {
        this.musiciansColor[musician.id] = musician.bands.find(element => element.id_band == this.bandId).color;
      });
    });
  }

  ngOnDestroy()
  {
  }

  doesMusicianPlayThisPart(part, musicianId) {
    let partsPlayedByTheMusician = this.song.musicians.find(elt=> elt.id == musicianId);
    return partsPlayedByTheMusician.plays.find(elt => elt === part);
  }

  getInfoByBand() {
    return (this.song != null) ? this.song.bands.find(band => band.id == this.bandId) : null;
  }
}
