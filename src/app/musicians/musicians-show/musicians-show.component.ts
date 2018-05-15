import { MusicianService } from './../../core/musician.service';
import { Component, OnInit } from '@angular/core';
import { Musician } from '../musician';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'wpw-musicians-show',
  templateUrl: './musicians-show.component.html',
  styleUrls: ['./musicians-show.component.scss']
})
export class MusiciansShowComponent implements OnInit {

  public musician = new Musician();

  constructor(private activatedRoute: ActivatedRoute,
    private musicianService: MusicianService) { }

  ngOnInit() {

    this.activatedRoute.params.pipe(
      switchMap((params) => this.musicianService.getById(params.id))
    ).subscribe((musician) => {
        this.musician = musician;
    });
  }

}
