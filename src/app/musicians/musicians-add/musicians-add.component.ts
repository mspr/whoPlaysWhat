import { Band } from './../../bands/band';
import { BandService } from './../../core/band.service';
import { MusicianService } from './../../core/musician.service';
import { Component, OnInit } from '@angular/core';
import { Musician } from '../musician';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { forkJoin } from 'rxjs/observable/forkJoin';
import 'rxjs/add/operator/map'

@Component({
  selector: 'wpw-musicians-add',
  templateUrl: './musicians-add.component.html',
  styleUrls: ['./musicians-add.component.scss']
})
export class MusiciansAddComponent implements OnInit
{
  public musician = new Musician();
  public color;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private musicianService: MusicianService) { }

  ngOnInit() {
  }

  add()
  {
    let bandId = this.activatedRoute.parent.snapshot.params['id'];
    this.musician.bands = [ { id_band: bandId, color: this.color } ];

    this.musicianService.add(this.musician).switchMap((musician) => {
      return this.bandService.getById(bandId).switchMap((band) => {
        band.musicianIds.push(musician.id);
        return this.bandService.update(band).map(band => musician);
      });
    }).subscribe((musician) => {
        this.musicianService.added.emit(musician);
        this.router.navigate([`bands/${bandId}`, 'musicians', musician.id]);
    });
  }
}
