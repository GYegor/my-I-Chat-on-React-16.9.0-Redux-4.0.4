import { DateTime } from 'luxon';

const toTwoFiguresNum = (num) => {
  const twoFiguresNum = num < 10 ? `0${num}` : `${num}`;
  return twoFiguresNum;
};

const customDateString = (millisecs) => {
  const {
    year,
    month,
    day,
    hour,
    minute,
  } = DateTime.fromMillis(millisecs).c;
  const timeString = `${toTwoFiguresNum(day)}.${toTwoFiguresNum(month)}.${year} ${toTwoFiguresNum(hour)}:${toTwoFiguresNum(minute)}`;
  return timeString;
};

export default customDateString;
