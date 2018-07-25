import { DateHelper } from './../../core/date-helper';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'wpw-calendar-show',
  templateUrl: './calendar-show.component.html',
  styleUrls: ['./calendar-show.component.scss']
})
export class CalendarShowComponent implements OnInit {

  public dayShortNames = DateHelper.getDayShortNames();

  constructor() { }

  ngOnInit() {
  }
}
