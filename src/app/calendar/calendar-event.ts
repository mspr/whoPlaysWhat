import { CalendarEventType } from './calendar-event-type.enum';

export class CalendarEvent
{
  public title = '';
  public type : CalendarEventType;
  public start : Date;
  public end : Date;

  constructor(title : string, type : CalendarEventType, start : Date, end : Date)
  {
    this.title = title;
    this.type = type;
    this.start = start;
    this.end = end;
  }

  public isTakingPlace(day : Date) {
    var startTime = this.start.getTime();
    var endTime = this.end.getTime();
    var time = day.getTime();
    return time >= startTime && time <= endTime;
  }
}
