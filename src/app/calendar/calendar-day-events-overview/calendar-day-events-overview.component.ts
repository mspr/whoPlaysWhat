import { Band } from './../../bands/band';
import { CalendarEvent } from './../calendar-event';
import { Component, OnInit, Input } from '@angular/core';
import { BandService } from '../../core/band.service';

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

  constructor(private bandService: BandService)
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
    }
    else
    {
      this.eventsToDisplay = false;
    }
  }

  allowDropEvent(event)
  {
    event.preventDefault();

    var srcHour = event.dataTransfer.getData("text");
    var targetHour = event.target.dataset.hour;
    var hourEvents = this.getEvents(srcHour);
    var hourDiff = targetHour - srcHour;
    console.log(hourDiff);

    hourEvents.forEach(hourEvent => {
      if (hourDiff > 0)
      {
        let startDate = new Date(hourEvent.end + 3600000);
        if (hourEvent.isTakingPlaceAt(startDate))
          event.stopPropagation();
      }
    });
  }

  onDropEvent(event)
  {
    event.preventDefault();
    var srcHour = event.dataTransfer.getData("text");
    var targetHour = event.target.dataset.hour;
    var hourEvents = this.getEvents(srcHour);
    var hourDiff = targetHour - srcHour;

    this.band.events.forEach(eventInfo => {
      let hourEvent = hourEvents.find(e => e.id === eventInfo.id);
      if (hourEvent != undefined)
      {
        if (hourDiff > 0)
          eventInfo.end += hourDiff * 3600000;
        else if (hourDiff < 0)
          eventInfo.start -= hourDiff * 3600000;
      }
    });

    this.bandService.update(this.band).subscribe((band) => {
    });
  }

  dragEvent(event)
  {
    let data = event.target.dataset.hour;
    event.dataTransfer.setData("text", data);
  }
}
