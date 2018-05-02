import { BandService } from './../../core/band.service';
import { Band } from './../band';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'wpw-bands-add',
  templateUrl: './bands-add.component.html',
  styleUrls: ['./bands-add.component.scss']
})
export class BandsAddComponent implements OnInit {

  public band = new Band();

  constructor(private bandService : BandService,
    private router: Router) { }

  ngOnInit() {
  }

  add() {
    this.bandService.add(this.band).subscribe((band) => {
      this.bandService.added.emit(band);
      this.router.navigate(['bands', band.id]);
    })
  }

}
