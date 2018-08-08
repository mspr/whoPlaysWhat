import { CalendarEventService } from './../../core/calendar-event.service';
import { CalendarEvent } from './../calendar-event';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wpw-calendar-day-events-overview',
  templateUrl: './calendar-day-events-overview.component.html',
  styleUrls: ['./calendar-day-events-overview.component.scss']
})

export class CalendarDayEventsOverviewComponent implements OnInit
{
  @Input()
  public selectedDate : Date;

  public morning = Array.from({length: 12}, (v, k) => k);
  public afternoon = Array.from({length: 12}, (v, k) => k + 12);
  public events = new Array<CalendarEvent>();
  public eventsToDisplay = false;

  constructor(private calendarEventService: CalendarEventService)
  {
  }

  ngOnInit()
  {
  }

  ngAfterContentChecked()
  {
  }

  hasEvents(hour: number)
  {
    if (this.selectedDate == undefined)
      return false;

    var date = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate(), hour);
    return this.calendarEventService.hasDayEvents(date);
  }

  getEvents(hour: number)
  {
    var date = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate(), hour);
    return this.calendarEventService.getEvents(date);
  }

  displayEvents(hour: number)
  {
    var date = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate(), hour);
    this.events = this.calendarEventService.getEvents(date);
    this.eventsToDisplay = true;
  }
}
