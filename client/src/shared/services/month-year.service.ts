import dayjs from 'dayjs';
import { IMonthYear } from '../../modules/calendar/data/interfaces/month-year.interface';

// for incrementing MonthYear
export function getUpdatedMonthYear(
  monthYear: IMonthYear,
  monthIncrement: number,
): dayjs.Dayjs {
  // the clone is necessary to prevent mutation
  return monthYear.startDate.clone().add(monthIncrement, 'months');
}

// get calendar-relevant data for the month containing initialDate
export function getMonthYearDetails(initialDate: dayjs.Dayjs): IMonthYear {
  const month = initialDate.format('MM');
  const year = initialDate.format('YYYY');
  const startDate = dayjs(`${year}${month}01`);
  const firstDOW = Number(startDate.format('d'));
  const lastDate = Number(startDate.clone().endOf('month').format('DD'));
  const monthName = startDate.format('MMMM');
  return { startDate, firstDOW, lastDate, monthName, month, year };
}

export function getNewMonthYear(
  prevData: IMonthYear,
  monthIncrement: number,
): IMonthYear {
  // update the monthYear by the specified increment
  const newMonthYear = getUpdatedMonthYear(prevData, monthIncrement);

  // return object with the details for the new monthYear
  return getMonthYearDetails(newMonthYear);
}
