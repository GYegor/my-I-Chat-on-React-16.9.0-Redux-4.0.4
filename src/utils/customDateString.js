import { DateTime } from 'luxon';


const toTwoFigStr = (num) => {
  return num = num < 10 ? `0${num}` : `${num}`;
}

const customDateString = (millisecs) => {
  let { year, month, day, hour, minute } = DateTime.fromMillis(millisecs).c;
  const timeString = `${toTwoFigStr(day)}.${toTwoFigStr(month)}.${year} ${toTwoFigStr(hour)}:${toTwoFigStr(minute)}`;
  return timeString;
}

export default customDateString;
