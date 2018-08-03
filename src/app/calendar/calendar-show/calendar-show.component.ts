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
  public daySelected = new EventEmitter<number>();

  public dayShortNames = DateHelper.getDayShortNames();
  public daysPerWeek = DateHelper.getCurrentMonthDays();
  private _currentDate = new Date();
  public selectedDate = new Date();

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

    var date = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), day);
    var currentDate = new Date(this._currentDate.getFullYear(), this._currentDate.getMonth(), this._currentDate.getDate(), 0);

    return currentDate.getTime() === date.getTime();
  }

  hasDayEvents(day: number)
  {
    if (day == undefined)
      return false;

    var date = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), day);

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

  selectDay(day: number)
  {
    this.daySelected.emit(day);
  }

  switchToLastMonth()
  {
    var lastMonth = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() - 1);
    this.daysPerWeek = DateHelper.getMonthDays(lastMonth);
    this.selectedDate = lastMonth;
  }

  switchToNextMonth()
  {
    var nextMonth = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1);
    this.daysPerWeek = DateHelper.getMonthDays(nextMonth);
    this.selectedDate = nextMonth;
  }

  switchToCurrentMonth()
  {
    this.daysPerWeek = DateHelper.getMonthDays(this._currentDate);
    this.selectedDate = this._currentDate;
  }
}
