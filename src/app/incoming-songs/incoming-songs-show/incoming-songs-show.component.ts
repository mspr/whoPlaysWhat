import { IncomingSongsHelper } from './../incoming-songs-helper';
import { BandService } from './../../core/band.service';
import { IncomingSongService } from './../../core/incoming-song.service';
import { Musician } from './../../musicians/musician';
import { Band } from './../../bands/band';
import { Component, OnInit } from '@angular/core';
import { IncomingSong } from '../incoming-song';
import { MusicianService } from '../../core/musician.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wpw-incoming-songs-show',
  templateUrl: './incoming-songs-show.component.html',
  styleUrls: ['./incoming-songs-show.component.scss']
})

export class IncomingSongsShowComponent implements OnInit
{
  public band : Band;
  public musicians : Musician[];
  public incomingSongs = new Array<IncomingSong>();
  private scoreMax = 5;
  public incomingSongsHelper : IncomingSongsHelper;

  constructor(private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private musicianService: MusicianService,
    private incomingSongService: IncomingSongService)
  {
  }

  ngOnInit()
  {
    let bandId = this.activatedRoute.snapshot.parent.params["id"];
    this.bandService.getById(bandId)
    .switchMap((band) => {
      this.band = band;
      band.incomingSongs.forEach(song => this.incomingSongs.push(IncomingSong.fromInfo(song)));
      this.incomingSongsHelper = new IncomingSongsHelper(this.incomingSongs);
      return this.musicianService.getAllByBand(this.band);
    })
    .subscribe((musicians) => {
      this.musicians = musicians;
    });
  }
}
