import { Band } from './../bands/band';
import { Injectable, EventEmitter } from '@angular/core';
import { BandService } from './band.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CalendarEvent } from '../calendar/calendar-event';

@Injectable()
export class CalendarService
{
  public added = new EventEmitter<CalendarEvent>();

  constructor(private httpClient: HttpClient,
    private bandService : BandService)
  {
  }

  add(event : CalendarEvent, band : Band)
  {
    return this.httpClient.post<Band>(environment.api + '/calendarEvents', {event: event, bandId: band.id});
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
