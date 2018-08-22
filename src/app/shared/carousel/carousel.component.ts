import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wpw-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent implements OnInit
{
  public items = [];
  public currentItemIdx = 0;

  constructor()
  {
  }

  ngOnInit()
  {
    this.items.push({title: "title1", description: "description1", image:"assets/images/the_beatles.jpg"});
    this.items.push({title: "title2", description: "description2", image:"assets/images/the_creedence.jpg"});
    this.items.push({title: "title3", description: "description3", image:"assets/images/dire_straits.jpg"});
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
}
