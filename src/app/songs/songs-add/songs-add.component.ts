import { Musician } from './../../musicians/musician';
import { Tonalities } from './../../core/tonalities.enum';
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
  public bandId : number;
  public song = new Song();
  public tonalities = Object.keys(Tonalities);

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private songService: SongService)
  {
  }

  ngOnInit()
  {
    this.bandId = this.activatedRoute.parent.snapshot.params['id'];
  }

  updateSongLevel(songLevel)
  {
    this.song.level = songLevel;
  }

  add()
  {
    this.songService.add(this.song).switchMap((song) =>
    {
      return this.bandService.getById_deprecated(this.bandId).switchMap((band) => {
        band.songs.push( { id: song.id, tempo: song.tempo, tonality: song.tonality, structure: song.structure, musicians: song.musicians } );

        return this.bandService.update(band).map(band => song);
      });
    }).subscribe((song) => {
        this.songService.added.emit(song);
        this.router.navigate([`bands/${this.bandId}`, 'songs', song.id]);
    });
  }
}
