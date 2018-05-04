import { MusicianService } from './../../core/musician.service';
import { Component, OnInit } from '@angular/core';
import { Musician } from '../musician';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'wpw-musicians-add',
  templateUrl: './musicians-add.component.html',
  styleUrls: ['./musicians-add.component.scss']
})
export class MusiciansAddComponent implements OnInit {

  public musician = new Musician();

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private musicianService: MusicianService) { }

  ngOnInit() {
  }

  add() {

    let bandId = this.activatedRoute.parent.snapshot.params['id'];

    this.musicianService.add(bandId, this.musician).subscribe((musician) => {
      this.musicianService.added.emit(musician);
      this.router.navigate([`bands/${bandId}`, 'musicians', musician.id]);
    })
  }

}
