import { Musician } from './../../musicians/musician';
import { SongService } from './../../core/song.service';
import { Tonalities } from './../../core/tonalities.enum';
import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { BandService } from '../../core/band.service';
import { Band } from '../../bands/band';

@Component({
  selector: 'wpw-songs-update',
  templateUrl: './songs-update.component.html',
  styleUrls: ['./songs-update.component.scss']
})
export class SongsUpdateComponent implements OnInit {

  public band : Band;
  public song = new Song();
  public tonalities = Object.keys(Tonalities);

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private bandService: BandService,
    private songService: SongService) { }

  ngOnInit()
  {
    let bandId = this.activatedRoute.parent.snapshot.params["id"];
    let songId = this.activatedRoute.snapshot.params["id"];

    this.songService.getById(songId).switchMap((song) => {
      this.song = song;
      return this.bandService.getById(bandId);
    })
    .subscribe((band) => {
      this.band = band;
      let songBandInfo = band.songs.find(s => s.id == this.song.id);
      this.song.tempo = songBandInfo.tempo;
      this.song.tonality = songBandInfo.tonality;
      this.song.structure = songBandInfo.structure;
      this.song.musicians = songBandInfo.musicians;
    });
  }

  updateSongLevel(songLevel) {
    this.song.level = songLevel;
  }

  update()
  {
    this.songService.update(this.song).switchMap((song) => {
      let songBandInfo = this.band.songs.find(s => s.id == song.id);
      songBandInfo.tempo = song.tempo;
      songBandInfo.tonality = song.tonality;
      songBandInfo.structure = song.structure;
      songBandInfo.musicians = song.musicians;
      return this.bandService.update(this.band);
    })
    .subscribe(() => {
      this.router.navigate([`bands/${this.band.id}`, 'songs', this.song.id]);
    });
  }
}
