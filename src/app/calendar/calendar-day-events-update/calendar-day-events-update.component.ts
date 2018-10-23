import { CalendarService } from './../../core/calendar.service';
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
  public frequencyColors = ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"];
  public newEvent = new CalendarEvent();

  @Output()
  public startModeUpdated = new EventEmitter();
  @Output()
  public endModeUpdated = new EventEmitter();

  constructor(private bandService: BandService,
    private calendarService: CalendarService)
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
    this.newEvent.start = this.startTime;
    this.newEvent.end = this.endTime;

    this.calendarService.add(this.newEvent, this.band).subscribe(() => {
      this.newEvent = new CalendarEvent();
      this.calendarService.added.emit(this.newEvent);
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
    this.newEvent.type = CalendarEventTypeHelper.getTypeFromTitle(title);
    this.newEvent.picture = CalendarEventTypeHelper.getImageFromType(this.newEvent.type);
  }
}
