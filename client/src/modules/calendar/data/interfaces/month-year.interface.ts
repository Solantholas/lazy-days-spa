import dayjs from "dayjs";

export interface IMonthYear {
  startDate: dayjs.Dayjs; // first day of the month
  firstDOW: number; // day of week; 0 === Sunday
  lastDate: number; // last date of the month
  monthName: string; // name of the month
  month: string; // two digit month number
  year: string; // four digit year
}