import { BandService } from './../../core/band.service';
import { MusicianService } from './../../core/musician.service';
import { ActivatedRoute } from '@angular/router';
import { IncomingSong } from './../incoming-song';
import { Component, OnInit } from '@angular/core';
import { Musician } from '../../musicians/musician';
import { Band } from '../../bands/band';

@Component({
  selector: 'wpw-incoming-songs-update',
  templateUrl: './incoming-songs-update.component.html',
  styleUrls: ['./incoming-songs-update.component.scss']
})
export class IncomingSongsUpdateComponent implements OnInit
{
  public band : Band;
  public musicians : Musician[];
  public incomingSongs : IncomingSong[];

  constructor(private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private musicianService: MusicianService) { }

  ngOnInit()
  {
    let bandId = this.activatedRoute.snapshot.parent.params["id"];
    this.bandService.getById(bandId).switchMap((band) => {
      this.band = band;
      return this.musicianService.getAllByBand(this.band);
    })
    .subscribe((musicians) => {
      this.musicians = musicians;
    });
  }
}
