import { NavigationService } from './../../core/navigation.service';
import { MusicianService } from './../../core/musician.service';
import { BandService } from './../../core/band.service';
import { RolesHelper } from './../../core/roles-helper';
import { Component, OnInit } from '@angular/core';
import { Musician } from '../musician';
import { Band } from '../../bands/band';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wpw-musicians-overview',
  templateUrl: './musicians-overview.component.html',
  styleUrls: ['./musicians-overview.component.scss']
})
export class MusiciansOverviewComponent implements OnInit {

  public band : Band;
  public musicians : Musician[] = new Array<Musician>();

  constructor(private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private musicianService: MusicianService,
    private navigationService: NavigationService) { }

  ngOnInit() {
    let bandId = this.activatedRoute.snapshot.params['id'];

    this.bandService.getById(bandId).switchMap((band) => {
      this.band = band;
      return this.musicianService.getAllByBand(this.band)
    })
    .subscribe((musicians) => {
      this.musicians = musicians;
    });
  }

  getRolesIconsPaths(musician : Musician) {
    return RolesHelper.getRolesIconsPaths(musician);
  }

  storeUrlBeforeNavigation() {
    this.navigationService.storeParentRoute(this.activatedRoute, this.band.name);
  }
}
