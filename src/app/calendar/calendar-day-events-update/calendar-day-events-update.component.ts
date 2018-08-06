import { CalendarEvent } from './../calendar-event';
import { CalendarEventService } from './../../core/calendar-event.service';
import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { DateHelper } from '../../core/date-helper';

@Component({
  selector: 'wpw-calendar-day-events-update',
  templateUrl: './calendar-day-events-update.component.html',
  styleUrls: ['./calendar-day-events-update.component.scss']
})

export class CalendarDayEventsUpdateComponent implements OnInit, AfterContentChecked
{
  @Input()
  public selectedDate : Date;

  public morning = Array.from(Array(12).keys());
  public afternoon = Array.from(Array(12).keys());
  public events = new Array<CalendarEvent>();

  constructor(private calendarEventService: CalendarEventService)
  {
  }

  ngOnInit()
  {
    if (this.selectedDate != undefined)
      this.events = this.calendarEventService.getEvents(this.selectedDate);
  }

  ngAfterContentChecked() {
    if (this.selectedDate != undefined)
      this.events = this.calendarEventService.getEvents(this.selectedDate);
  }
}
