import { BandService } from './../../core/band.service';
import { Band } from './../band';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'wpw-bands',
  templateUrl: './bands-list.component.html',
  styleUrls: ['./bands-list.component.scss']
})
export class BandsListComponent implements OnInit {

  public bands : Band[] = [];

  constructor(private bandService: BandService,
    private router: Router) { }

  ngOnInit() {
    this.bandService.getAll().subscribe((bands) => {
      this.bands = bands;
    });

    this.bandService.removed.subscribe(() => {
      this.bandService.getAll().subscribe((bands) => {
        this.bands = bands;
      });
    });

    this.bandService.added.subscribe(() => {
      this.bandService.getAll().subscribe((bands) => {
        this.bands = bands;
      });
    });
  }

  onRemove(id) {
    this.bandService.remove(id).subscribe(() => {
      this.bandService.removed.emit();
      this.router.navigate(['bands']);
    });
  }

  displaySongs(band) {
    this.router.navigate([`/bands/${band.id}/songs`]);
  }

}
