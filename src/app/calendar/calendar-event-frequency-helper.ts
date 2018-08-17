import { CalendarEventFrequency } from './calendar-event-frequency.enum';

export class CalendarEventFrequencyHelper
{
  private static frequencies = Object.keys(CalendarEventFrequency);
  private static frequencyNames = CalendarEventFrequencyHelper.initializeFrequencyNames();
  private static frequencyColors = CalendarEventFrequencyHelper.initializeFrequencyColors();

  static initializeFrequencyNames()
  {
    let frequencyNames = new Map<CalendarEventFrequency, string>();
    frequencyNames.set(CalendarEventFrequency.Once, "Once");
    frequencyNames.set(CalendarEventFrequency.OncePerWeek, "Once per week");
    frequencyNames.set(CalendarEventFrequency.OncePerMonth, "Once per month");
    frequencyNames.set(CalendarEventFrequency.EveryDay, "Every day");
    return frequencyNames;
  }

  static initializeFrequencyColors()
  {
    let frequencyColors = new Map<CalendarEventFrequency, string[]>();
    frequencyColors.set(CalendarEventFrequency.Once, ["rgba(205, 234, 125, 0.5)", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"]);
    frequencyColors.set(CalendarEventFrequency.OncePerWeek, ["rgba(255, 234, 125, 0.5)", "rgba(255, 234, 125, 0.5)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"]);
    frequencyColors.set(CalendarEventFrequency.OncePerMonth, ["rgba(242, 172, 46, 0.5)", "rgba(242, 172, 46, 0.5)", "rgba(242, 172, 46, 0.5)", "rgba(0,0,0,0)"]);
    frequencyColors.set(CalendarEventFrequency.EveryDay, ["rgba(255, 84, 46, 0.5)", "rgba(255, 84, 46, 0.5)", "rgba(255, 84, 46, 0.5)", "rgba(255, 84, 46, 0.5)"]);
    return frequencyColors;
  }

  static getFrequencyNames()
  {
    return Array.from(this.frequencyNames.values());
  }

  static getFrequencyColors()
  {
    return Array.from(this.frequencyColors.values());
  }

  static getFrequencyColor(i : number)
  {
    return this.frequencyColors.get(i);
  }
}
