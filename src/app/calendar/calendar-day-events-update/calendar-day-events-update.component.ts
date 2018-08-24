import { Band } from './../../bands/band';
import { CalendarEvent } from './../calendar-event';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CalendarEventType } from '../calendar-event-type.enum';
import { BandService } from '../../core/band.service';
import { CalendarEventFrequency } from '../calendar-event-frequency.enum';
import { CalendarEventFrequencyHelper } from '../calendar-event-frequency-helper';
import { CalendarEventTypeHelper } from '../calendar-event-type-helper';

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
  public startTime : Date;
  @Input()
  public endTime : Date;

  public frequencies = CalendarEventFrequencyHelper.getFrequencyNames();
  public frequencyColors = ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"];
  public newEvent = new CalendarEvent("", "", CalendarEventType.Rehearsal, 0, 0, CalendarEventFrequency.Once);

  @Output()
  public startModeUpdated = new EventEmitter();
  @Output()
  public endModeUpdated = new EventEmitter();

  public eventTypeImage = CalendarEventTypeHelper.getDefaultImage();

  constructor(private bandService: BandService)
  {
  }

  ngOnInit()
  {
  }

  updateFrequencyColors(idx: number)
  {
    this.frequencyColors = CalendarEventFrequencyHelper.getFrequencyColor(idx);
  }

  resetFrequencyColors()
  {
    this.updateFrequencyColors(this.newEvent.frequency);
  }

  updateFrequency(idx: number)
  {
    this.newEvent.frequency = idx;
  }

  createEvent()
  {
    this.newEvent.start = this.startTime.getTime();
    this.newEvent.end = this.endTime.getTime();

    this.band.events.push(this.newEvent);
    this.bandService.update(this.band).subscribe((band) => {
      this.newEvent = new CalendarEvent("", "", CalendarEventType.Rehearsal, 0, 0, CalendarEventFrequency.Once);
    });
  }

  activateStartMode()
  {
    this.startModeUpdated.emit();
  }

  activateEndMode()
  {
    this.endModeUpdated.emit();
  }

  searchTypeInTitle(event)
  {
    var title = event.srcElement.value;
    this.eventTypeImage = CalendarEventTypeHelper.getImageFromTitle(title);
  }
}
