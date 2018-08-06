import { CalendarEventType } from './../calendar/calendar-event-type.enum';
import { Injectable } from '@angular/core';
import { CalendarEvent } from '../calendar/calendar-event';

@Injectable()
export class CalendarEventService
{
  private _fakeEvent;

  constructor()
  {
    var currentDate = new Date();
    var startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0);
    var endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12);
    this._fakeEvent = new CalendarEvent("Yeahhh Holidays", CalendarEventType.Holidays, startDate, endDate);
  }

  getEvents(day: Date)
  {
    var events = new Array<CalendarEvent>();

    if (this._fakeEvent.isTakingPlace(day))
      events.push(this._fakeEvent);

    return events;
  }

  hasDayEvents(day: Date)
  {
    return this.getEvents(day).length > 0;
  }
}
