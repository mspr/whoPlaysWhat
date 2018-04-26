import { BandService } from './../../core/band.service';
import { Band } from './../band';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'wpw-band',
  templateUrl: './bands-show.component.html',
  styleUrls: ['./bands-show.component.scss']
})
export class BandsShowComponent implements OnInit {

  public band : Band;

  constructor(private activatedRoute: ActivatedRoute,
    private bandService: BandService) { }

  ngOnInit() {

    this.activatedRoute.params.pipe(
      switchMap((params) => this.bandService.getById(params.id))
    ).subscribe((band) => {
        this.band = band;
    });
  }

}
