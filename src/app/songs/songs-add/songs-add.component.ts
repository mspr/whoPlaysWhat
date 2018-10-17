import { Band } from './../../bands/band';
import { SongTonalityHelper } from './../song-tonality-helper';
import { Musician } from './../../musicians/musician';
import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../../core/song.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BandService } from '../../core/band.service';

@Component({
  selector: 'wpw-songs-add',
  templateUrl: './songs-add.component.html',
  styleUrls: ['./songs-add.component.scss']
})

export class SongsAddComponent implements OnInit
{
  public band : Band;
  public song = new Song();

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private songService: SongService)
  {
  }

  ngOnInit()
  {
  }

  updateSongLevel(songLevel)
  {
    this.song.level = songLevel;
  }

  getTonalityNames()
  {
    return SongTonalityHelper.getSongTonalityNames();
  }

  add()
  {
    let bandId = this.activatedRoute.parent.snapshot.params['id'];

    this.songService.add(this.song).switchMap((song) =>
    {
      this.song = Song.fromInfo(song);
      return this.bandService.getById(bandId).switchMap((band) =>
      {
        this.band = band;
        this.band.songs.push(this.song);
        return this.bandService.update(this.band);
      });
    }).subscribe(() =>
    {
      this.songService.added.emit(this.song);
      this.router.navigate([`bands/${this.band.id}`, 'songs', this.song.id]);
    });
  }
}
