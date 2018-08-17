import { Band } from './../../bands/band';
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
  public selectedDay : Date;

  @Input()
  public band : Band;

  public morning = Array.from({length: 12}, (v, k) => k);
  public afternoon = Array.from({length: 12}, (v, k) => k + 12);
  public selectedHour : Date;
  public events = new Array<CalendarEvent>();
  public eventsToDisplay = false;
  public eventsToCreate = false;

  constructor()
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
    if (this.selectedDay == undefined)
      return false;

    var date = new Date(this.selectedDay.getFullYear(), this.selectedDay.getMonth(), this.selectedDay.getDate(), hour);
    return this.band.hasEventsAt(date);
  }

  getEvents(hour: number)
  {
    var date = new Date(this.selectedDay.getFullYear(), this.selectedDay.getMonth(), this.selectedDay.getDate(), hour);
    return this.band.getEventsAt(date);
  }

  displayOrCreateEvents(hour: number)
  {
    this.selectedHour = new Date(this.selectedDay.getFullYear(), this.selectedDay.getMonth(), this.selectedDay.getDate(), hour);

    if (this.hasEvents(hour))
    {
      this.events = this.band.getEventsAt(this.selectedHour);
      this.eventsToDisplay = true;
      this.eventsToCreate = false;
    }
    else
    {
      this.eventsToCreate = true;
      this.eventsToDisplay = false;
    }
  }
}
