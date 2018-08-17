import { CalendarEventType } from './calendar-event-type.enum';
import { CalendarEventFrequency } from './calendar-event-frequency.enum';

export class CalendarEvent
{
  public id? : number;
  public title = '';
  public description = '';
  public type : CalendarEventType;
  public start : number;
  public end : number;
  public picture : string;
  public frequency : CalendarEventFrequency;

  constructor(title : string, description : string, type : CalendarEventType, start : number, end : number, frequency : CalendarEventFrequency)
  {
    this.title = title;
    this.description = description;
    this.type = type;
    this.start = start;
    this.end = end;
    this.frequency = frequency;
  }

  static fromInfo(info)
  {
    return new CalendarEvent(info.title, info.description, info.type, info.start, info.end, info.frequency);
  }

  public isTakingPlaceOnDay(day : Date)
  {
    var dayStart = day.getTime();
    var dayEnd = dayStart + 86400000;
    let eventBeginsOnDay = this.start >= dayStart && this.start <= dayEnd;
    let eventEndsOnDay = this.end >= dayStart && this.end <= dayEnd;
    let eventBeginsBeforeAndEndsAfterDay = this.start < dayStart && this.end > dayEnd;

    return eventBeginsOnDay || eventEndsOnDay || eventBeginsBeforeAndEndsAfterDay;
  }

  public isTakingPlaceAt(hour : Date)
  {
    var hourInMs = hour.getTime();
    return this.start <= hourInMs && this.end > hourInMs;
  }
}
