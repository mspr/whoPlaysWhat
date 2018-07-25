export class DateHelper {

  private static _date = new Date();
  private static _monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  private static _monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  private static _dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  private static _dayShortNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  static getMonthNames() {
    return DateHelper._monthNames;
  }

  static getMonthShortNames() {
    return DateHelper._monthShortNames;
  }

  static getDayNames() {
    return DateHelper._dayNames;
  }

  static getDayShortNames() {
    return DateHelper._dayShortNames;
  }

  static getCurrentMonth() {
    return DateHelper._monthNames[DateHelper._date.getMonth()];
  }
}
