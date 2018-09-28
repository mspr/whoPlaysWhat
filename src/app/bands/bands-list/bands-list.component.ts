import { BandService } from './../../core/band.service';
import { Band } from './../band';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'wpw-bands-list',
  templateUrl: './bands-list.component.html',
  styleUrls: ['./bands-list.component.scss']
})
export class BandsListComponent implements OnInit
{
  public bands = new Array<Band>();
  public test = 'uploads\\the_beatles-1538149622492.jpg';

  constructor(private bandService: BandService) { }

  ngOnInit()
  {
    this.bandService.getAll().subscribe((res) => {
      this.bands = res.bands;
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
}
