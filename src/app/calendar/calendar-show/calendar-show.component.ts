import { DateHelper } from './../../core/date-helper';
import { Component, OnInit } from '@angular/core';
import { CalendarEventService } from '../../core/calendar-event.service';

@Component({
  selector: 'wpw-calendar-show',
  templateUrl: './calendar-show.component.html',
  styleUrls: ['./calendar-show.component.scss']
})

export class CalendarShowComponent implements OnInit
{
  public dayShortNames = DateHelper.getDayShortNames();
  public daysPerWeek = DateHelper.getCurrentMonthDays();
  public currentMonth = DateHelper.getCurrentMonth();
  public currentYear = DateHelper.getCurrentYear();

  constructor(private calendarEventService: CalendarEventService)
  {
  }

  ngOnInit()
  {
  }

  isCurrentDay(day)
  {
    return DateHelper.isCurrentDay(day);
  }

  hasDayEvents(day: number)
  {
    if (day == undefined)
      return false;

    var currentDate = new Date();
    var date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    return this.calendarEventService.hasDayEvents(date);
  }

  events(day: number)
  {
    if (day == undefined)
      return;

    var currentDate = new Date();
    var date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    return this.calendarEventService.getEvents(date);
  }
}
