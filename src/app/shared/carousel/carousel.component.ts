import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  @Output()
  public removed = new EventEmitter<number>();

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

  remove()
  {
    this.removed.emit(this.items[this.currentItemIdx].id);
    this.currentItemIdx = 0;
  }
}
