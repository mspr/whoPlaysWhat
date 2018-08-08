import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from '../calendar-event';

@Component({
  selector: 'wpw-calendar-day-events-show',
  templateUrl: './calendar-day-events-show.component.html',
  styleUrls: ['./calendar-day-events-show.component.scss']
})

export class CalendarDayEventsShowComponent implements OnInit
{
  @Input()
  public events : Array<CalendarEvent>;

  constructor()
  {
  }

  ngOnInit()
  {
  }
}
