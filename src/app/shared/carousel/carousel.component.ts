import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wpw-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent implements OnInit
{
  @Input()
  public items = [];
  public currentItemIdx = 0;

  constructor()
  {
  }

  ngOnInit()
  {
  }

  previous()
  {
    if (this.currentItemIdx > 0)
      this.currentItemIdx--;
    else
      this.currentItemIdx = this.items.length - 1;
  }

  next()
  {
    if (this.currentItemIdx < this.items.length - 1)
      this.currentItemIdx++;
    else
      this.currentItemIdx = 0;
  }

  getImageOrDefault()
  {
    var image = this.items[this.currentItemIdx].image;
    if (image === undefined)
      image = "assets/images/events/unknown.png";

    return image;
  }
}
