import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Musician } from '../musician';
import { MusicianService } from '../../core/musician.service';

@Component({
  selector: 'wpw-musicians-list',
  templateUrl: './musicians-list.component.html',
  styleUrls: ['./musicians-list.component.scss']
})
export class MusiciansListComponent implements OnInit {

  public bandId : number;
  public musicians : Musician[];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private musicianService: MusicianService) { }

  ngOnInit() {

    this.bandId = this.activatedRoute.snapshot.params['id'];

    this.musicianService.getAll(this.bandId).subscribe((musicians) => {
      this.musicians = musicians;
    });
  }

  onRemove(id) {
    this.musicianService.remove(id).subscribe(() => {
      this.router.navigate([`bands/${this.bandId}`, 'musicians']);
    });
  }

}
