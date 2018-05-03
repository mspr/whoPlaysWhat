import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Musician } from '../musician';
import { MusicianService } from '../../core/musician.service';

@Component({
  selector: 'wpw-musicians-list',
  templateUrl: './musicians-list.component.html',
  styleUrls: ['./musicians-list.component.scss']
})
export class MusiciansListComponent implements OnInit {

  public musicians : Musician[];

  constructor(private activatedRoute: ActivatedRoute,
    private musicianService: MusicianService) { }

  ngOnInit() {

    let bandId = this.activatedRoute.snapshot.params['id'];

    this.musicianService.getAll(bandId).subscribe((musicians) => {
      this.musicians = musicians;
    });
  }

  onRemove() {

  }

}
