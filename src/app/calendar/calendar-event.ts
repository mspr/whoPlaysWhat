import { CalendarEventType } from './calendar-event-type.enum';
import { CalendarEventFrequency } from './calendar-event-frequency.enum';
import { CalendarEventTypeHelper } from './calendar-event-type-helper';

export class CalendarEvent
{
  public id? : number;
  public title = '';
  public description = '';
  public type : CalendarEventType;
  public start : Date;
  public end : Date;
  public picture : string;
  public frequency : CalendarEventFrequency;

  constructor()
  {
    this.picture = CalendarEventTypeHelper.getDefaultImage();
    this.type = CalendarEventType.Rehearsal;
    this.frequency = CalendarEventFrequency.Once;
  }

  static fromInfo(info)
  {
    var event = new CalendarEvent();

    event.title = info.title;
    event.id = info.id;
    event.description = info.description;
    event.start = new Date(info.start);
    event.end = new Date(info.end);
    event.frequency = info.frequency;
    event.picture = info.picture;

    return event;
  }

  public isTakingPlaceOnDay(day : Date)
  {
    day = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0);
    var dayStart = day.getTime();
    var dayInMs = 86400000;
    var startTime = this.start.getTime();
    var endTime = this.end.getTime();
    var dayEnd = dayStart + dayInMs;
    let eventBeginsOnDay = startTime >= dayStart && startTime <= dayEnd;
    let eventEndsOnDay = endTime >= dayStart && endTime <= dayEnd;
    let eventBeginsBeforeAndEndsAfterDay = startTime < dayStart && endTime > dayEnd;

    if (this.frequency === CalendarEventFrequency.OncePerWeek)
    {
      var weekDay = day.getDay();
      var startDate = new Date(this.start);
      var startWeekDay = startDate.getDay();
      return (startWeekDay - weekDay) % 7 == 0;
    }
    else if (this.frequency === CalendarEventFrequency.EveryDay)
    {
      return true;
    }

    return eventBeginsOnDay || eventEndsOnDay || eventBeginsBeforeAndEndsAfterDay;
  }

  public isTakingPlaceAt(hour : Date)
  {
    var hourInMs = hour.getTime();

    if (!this.isTakingPlaceOnDay(hour))
      return false;

    var start = new Date(hour.getFullYear(), hour.getMonth(), hour.getDate(), this.start.getHours());
    var end = new Date(hour.getFullYear(), hour.getMonth(), hour.getDate(), this.end.getHours());

    return start.getTime() <= hourInMs && end.getTime() > hourInMs;
  }
}
