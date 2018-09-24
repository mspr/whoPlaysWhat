import { BandService } from './../../core/band.service';
import { Band } from './../band';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'wpw-bands-list',
  templateUrl: './bands-list.component.html',
  styleUrls: ['./bands-list.component.scss']
})
export class BandsListComponent implements OnInit
{
  public bands;

  constructor(private bandService: BandService) { }

  ngOnInit()
  {
    this.bandService.getAll().subscribe((res) => {
      console.log(res);
      this.bands = res.bands;
      this.bands.forEach(band => {
        let reader = new FileReader();
        let buff = band.pictureBuffer;
        var blob = new Blob( [ buff ], { type: "image/jpg" } );
        let bufftype = buff.type;
        reader.onloadend = () => {
          console.log(reader.result);
        };
        reader.readAsDataURL(blob);
        console.log(reader.result);
        let err = reader.error;
      });
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
