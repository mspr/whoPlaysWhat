import { DateHelper } from './../../core/date-helper';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'wpw-calendar-show',
  templateUrl: './calendar-show.component.html',
  styleUrls: ['./calendar-show.component.scss']
})
export class CalendarShowComponent implements OnInit {

  public dayShortNames = DateHelper.getDayShortNames();
  public daysPerWeek = DateHelper.getCurrentMonthDays();
  public currentMonth = DateHelper.getCurrentMonth();
  public currentYear = DateHelper.getCurrentYear();

  constructor() {}

  ngOnInit() {
  }

  isCurrentDay(day) {
    console.log(day);
    return DateHelper.isCurrentDay(day);
  }
}
