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
  public song = new Song();
  public tonalities = Object.keys(Tonalities);
  public tonality : Tonalities;
  public tempo : number = 90;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private songService: SongService)
  {
  }

  ngOnInit()
  {
  }

  add()
  {
    let bandId = this.activatedRoute.parent.snapshot.params['id'];
    this.song.bands = [{ id: bandId, tonality: this.tonality, tempo: this.tempo }];

    this.songService.add(this.song).switchMap((song) =>
    {
      return this.bandService.getById(bandId).switchMap((band) => {
        band.songIds.push(song.id);
        return this.bandService.update(band).map(band => song);
      });
    }).subscribe((song) => {
        this.songService.added.emit(song);
        this.router.navigate([`bands/${bandId}`, 'songs', song.id]);
    });
  }
}
