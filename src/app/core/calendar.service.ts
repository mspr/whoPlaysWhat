import { Band } from './../bands/band';
import { Injectable } from '@angular/core';
import { BandService } from './band.service';

@Injectable()
export class CalendarService
{
  constructor(private bandService : BandService)
  {
  }

  removeEvent(band : Band, id : number)
  {
    let eventIdx = band.events.findIndex(e => e.id === id);
    if (eventIdx != -1)
    {
      band.events.splice(eventIdx, 1);
      return this.bandService.update(band);
    }
  }
}
