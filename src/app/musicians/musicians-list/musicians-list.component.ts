import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Musician } from '../musician';
import { MusicianService } from '../../core/musician.service';
import { BandService } from '../../core/band.service';

@Component({
  selector: 'wpw-musicians-list',
  templateUrl: './musicians-list.component.html',
  styleUrls: ['./musicians-list.component.scss']
})
export class MusiciansListComponent implements OnInit {

  public bandId : number;
  public musicians : Musician[] = new Array<Musician>();

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private bandService: BandService,
    private musicianService: MusicianService) { }

  ngOnInit() {

    this.bandId = this.activatedRoute.snapshot.params['id'];

    this.retrieveMusicians();

    this.musicianService.added.subscribe(() => {
      this.retrieveMusicians();
    });

    this.musicianService.removed.subscribe(() => {
      this.retrieveMusicians();
    });
  }

  onRemove(id) {
    this.musicianService.remove(id).subscribe(() => {
      this.musicianService.removed.emit();
      this.router.navigate([`bands/${this.bandId}`, 'musicians']);
    });
  }

  private retrieveMusicians() {
    this.bandService.getById(this.bandId).subscribe((band) => {
      band.musicianIds.forEach(musicianId => {
        this.musicianService.getById(musicianId).subscribe((musician) => {
          this.musicians.push(musician);
        });
      });
    });
  }
}
