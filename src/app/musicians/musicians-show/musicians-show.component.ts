import { MusicianService } from './../../core/musician.service';
import { Component, OnInit } from '@angular/core';
import { Musician } from '../musician';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { BandService } from '../../core/band.service';

@Component({
  selector: 'wpw-musicians-show',
  templateUrl: './musicians-show.component.html',
  styleUrls: ['./musicians-show.component.scss']
})

export class MusiciansShowComponent implements OnInit
{
  public bandId : number;
  public musician = new Musician();

  constructor(private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private musicianService: MusicianService)
  {
  }

  ngOnInit()
  {
    this.bandId = this.activatedRoute.parent.snapshot.params["id"];

    this.activatedRoute.params.pipe(
      switchMap((params) => this.musicianService.getById(params.id))
    )
    .switchMap((musicianInfo) =>
    {
      this.musician = Musician.fromInfo(musicianInfo);
      return this.bandService.getById(this.bandId)
    })
    .subscribe((band) => {
      this.musician.color = band.musiciansColor.find(m => m.id == this.musician.id).color;
    });
  }
}
