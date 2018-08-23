import { Band } from './../../bands/band';
import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from '../calendar-event';
import { CalendarService } from '../../core/calendar.service';

@Component({
  selector: 'wpw-calendar-day-events-show',
  templateUrl: './calendar-day-events-show.component.html',
  styleUrls: ['./calendar-day-events-show.component.scss']
})

export class CalendarDayEventsShowComponent implements OnInit
{
  @Input()
  public band : Band;

  @Input()
  public selectedHour : Date;

  constructor(private calendarService : CalendarService)
  {
  }

  ngOnInit()
  {
  }

  removeEvent(eventId : number)
  {
    this.calendarService.removeEvent(this.band, eventId).subscribe((band) => {
    });
  }

  getEvents()
  {
    var eventItems = [];

    if (this.band === undefined)
      return;

    var events = this.band.getEventsAt(this.selectedHour);
    events.forEach(event => eventItems.push({title: event.title, description: event.description, image: event.picture}));

    return eventItems;
  }
}
