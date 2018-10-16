import { SongTonalityHelper } from './../song-tonality-helper';
import { Musician } from './../../musicians/musician';
import { SongService } from './../../core/song.service';
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

    this.bandService.getById(bandId).subscribe((band) =>
    {
      this.band = band;
      this.song = band.songs.find(s => s.id == songId);
    });
  }

  updateSongLevel(songLevel)
  {
    this.song.level = songLevel;
  }

  getTonalityNames()
  {
    return SongTonalityHelper.getSongTonalityNames();
  }

  update()
  {
    this.songService.update(this.song).subscribe((song) =>
    {
      this.songService.updated.emit();
      this.router.navigate([`bands/${this.band.id}`, 'songs', this.song.id]);
    });
  }
}
