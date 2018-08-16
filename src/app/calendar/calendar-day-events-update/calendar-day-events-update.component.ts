import { Band } from './../../bands/band';
import { CalendarEvent } from './../calendar-event';
import { Component, OnInit, Input } from '@angular/core';
import { CalendarEventType } from '../calendar-event-type.enum';
import { BandService } from '../../core/band.service';

@Component({
  selector: 'wpw-calendar-day-events-update',
  templateUrl: './calendar-day-events-update.component.html',
  styleUrls: ['./calendar-day-events-update.component.scss']
})

export class CalendarDayEventsUpdateComponent implements OnInit
{
  @Input()
  public band : Band;

  @Input()
  public selectedHour : Date;

  public frequencies = ["Once", "Once per month", "Once per week", "Every day"];
  public frequencyColors = ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"];
  public selectedFrequencyIdx : number = -1;
  public newEvent = new CalendarEvent("", "", CalendarEventType.Rehearsal, 0, 0);

  constructor(private bandService: BandService)
  {
  }

  ngOnInit()
  {
  }

  updateFrequencyColors(idx: number)
  {
    if (idx == -1)
    {
      this.frequencyColors = ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"];
    }
    else if (idx == 0)
    {
      this.frequencyColors = ["rgba(205, 234, 125, 0.5)", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"];
    }
    else if (idx == 1)
    {
      this.frequencyColors = ["rgba(255, 234, 125, 0.5)", "rgba(255, 234, 125, 0.5)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"];
    }
    else if (idx == 2)
    {
      this.frequencyColors = ["rgba(242, 172, 46, 0.5)", "rgba(242, 172, 46, 0.5)", "rgba(242, 172, 46, 0.5)", "rgba(0,0,0,0)"];
    }
    else if (idx == 3)
    {
      this.frequencyColors = ["rgba(255, 84, 46, 0.5)", "rgba(255, 84, 46, 0.5)", "rgba(255, 84, 46, 0.5)", "rgba(255, 84, 46, 0.5)"];
    }
  }

  resetFrequencyColors()
  {
    this.updateFrequencyColors(this.selectedFrequencyIdx);
  }

  updateFrequency(idx: number)
  {
    this.selectedFrequencyIdx = idx;
  }

  createEvent()
  {
    let frequency = this.frequencies[this.selectedFrequencyIdx];

    this.newEvent.start = this.selectedHour.getTime();
    this.newEvent.end = new Date(this.selectedHour.getFullYear(), this.selectedHour.getMonth(), this.selectedHour.getDate(), this.selectedHour.getHours() + 1).getTime();

    this.band.events.push(this.newEvent);
    this.bandService.update(this.band).subscribe((band) => {
    });
  }
}
