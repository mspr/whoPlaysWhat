import { BandService } from './../../core/band.service';
import { Band } from './../band';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'wpw-bands-add',
  templateUrl: './bands-add.component.html',
  styleUrls: ['./bands-add.component.scss']
})

export class BandsAddComponent implements OnInit
{
  public band = new Band();
  private picture;

  constructor(private bandService : BandService,
    private router: Router)
  {
  }

  ngOnInit()
  {
  }

  add()
  {
    var formData = new FormData();
    formData.append("picture", this.picture, this.picture.name)

    this.bandService.upload(formData).switchMap((picture) => {
      this.band.picture = picture.toString();
      return this.bandService.add(this.band);
    })
    .subscribe((band) => {
      this.bandService.added.emit(band);
      this.router.navigate(['bands', band.id]);
    })
  }

  updateImage(event)
  {
    var pictures = event.srcElement.files;
    if (pictures.length === 0)
      return;

    this.picture = pictures[0];
    if (pictures.length === 1)
      this.band.picture = "./assets/images/bands/" + this.picture.name;
  }
}
