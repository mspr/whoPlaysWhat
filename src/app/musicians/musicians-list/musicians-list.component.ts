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

    this.musicians = new Array<Musician>();
    this.bandId = this.activatedRoute.snapshot.params['id'];

    this.retrieveMusicians();

    this.musicianService.added.subscribe(() => {
      this.retrieveMusicians();
    });

    this.musicianService.removed.subscribe(() => {
      this.retrieveMusicians();
    });
  }

  private retrieveMusicians() {
    this.musicianService.getAll().subscribe((musicians) => {
      musicians.forEach(musician => {
        musician.bands.forEach(band => {
          if (band.id_band == this.bandId) {
            this.musicians.push(musician);
          };
        });
      });
    });
  }

  onRemove(id) {
    this.musicianService.remove(id).subscribe(() => {
      this.musicianService.removed.emit();
      this.router.navigate([`bands/${this.bandId}`, 'musicians']);
    });
  }

}
