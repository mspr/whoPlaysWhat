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

export class SongsUpdateComponent implements OnInit
{
  public band : Band;
  public song = new Song();
  public tonalities = Object.keys(Tonalities);

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private bandService: BandService,
    private songService: SongService)
  {
  }

  ngOnInit()
  {
    let bandId = this.activatedRoute.parent.snapshot.params["id"];
    let songId = this.activatedRoute.snapshot.params["id"];

    this.bandService.getById(bandId).subscribe((band) => {
      this.band = band;
      let songInfo = band.songs.find(s => s.id == songId);
      this.song.tempo = songInfo.tempo;
      this.song.tonality = songInfo.tonality;
      this.song.structure = songInfo.structure;
      this.song.musicians = songInfo.musicians;
      this.song.title = songInfo.title;
    });
  }

  updateSongLevel(songLevel)
  {
    this.song.level = songLevel;
  }

  update()
  {
    this.songService.update(this.song).switchMap((song) => {
      let songInfo = this.band.songs.find(s => s.id == song.id);
      songInfo.tempo = song.tempo;
      songInfo.tonality = song.tonality;
      songInfo.structure = song.structure;
      songInfo.musicians = song.musicians;
      return this.bandService.update(this.band);
    })
    .subscribe(() => {
      this.songService.updated.emit();
      this.router.navigate([`bands/${this.band.id}`, 'songs', this.song.id]);
    });
  }
}
