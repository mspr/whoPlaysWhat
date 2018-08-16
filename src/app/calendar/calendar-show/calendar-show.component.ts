import { DateHelper } from './../../core/date-helper';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CalendarEventService } from '../../core/calendar-event.service';

@Component({
  selector: 'wpw-calendar-show',
  templateUrl: './calendar-show.component.html',
  styleUrls: ['./calendar-show.component.scss']
})

export class CalendarShowComponent implements OnInit
{
  @Output()
  public daySelected = new EventEmitter<Date>();

  public dayShortNames = DateHelper.getDayShortNames();
  public daysPerWeek = DateHelper.getCurrentMonthDays();
  private _currentDay = new Date();
  public selectedDay = new Date();

  constructor(private calendarEventService: CalendarEventService)
  {
  }

  ngOnInit()
  {
  }

  isCurrentDay(day)
  {
    if (day == undefined)
      return false;

    var date = new Date(this.selectedDay.getFullYear(), this.selectedDay.getMonth(), day);
    var currentDate = new Date(this.selectedDay.getFullYear(), this.selectedDay.getMonth(), this.selectedDay.getDate(), 0);

    return currentDate.getTime() === date.getTime();
  }

  hasDayEvents(day: number)
  {
    if (day == undefined)
      return false;

    var date = new Date(this.selectedDay.getFullYear(), this.selectedDay.getMonth(), day);

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

  selectDate(day: number)
  {
    this.selectedDay = new Date(this.selectedDay.getFullYear(), this.selectedDay.getMonth(), day);
    this.daySelected.emit(this.selectedDay);
  }

  switchToLastMonth()
  {
    var lastMonth = new Date(this.selectedDay.getFullYear(), this.selectedDay.getMonth() - 1);
    this.daysPerWeek = DateHelper.getMonthDays(lastMonth);
    this.selectedDay = lastMonth;
  }

  switchToNextMonth()
  {
    var nextMonth = new Date(this.selectedDay.getFullYear(), this.selectedDay.getMonth() + 1);
    this.daysPerWeek = DateHelper.getMonthDays(nextMonth);
    this.selectedDay = nextMonth;
  }

  switchToCurrentMonth()
  {
    this.daysPerWeek = DateHelper.getMonthDays(this._currentDay);
    this.selectedDay = this._currentDay;
  }
}
