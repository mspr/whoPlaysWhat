import { Component, OnInit, Input } from '@angular/core';
import { Musician } from '../musician';
import { MusicianService } from '../../core/musician.service';

@Component({
  selector: 'wpw-musicians-list',
  templateUrl: './musicians-list.component.html',
  styleUrls: ['./musicians-list.component.scss']
})
export class MusiciansListComponent implements OnInit {

  public musicians : Musician[];

  @Input()
  public bandId : number;

  constructor(private musicianService: MusicianService) { }

  ngOnInit() {
    this.musicianService.getAll(this.bandId).subscribe((musicians) => {
      this.musicians = musicians;
    });
  }

  onRemove() {

  }

}
