import calendarRaw from "./nepaliCalendar.json" with { type: "json" };

const calendarData = Object.fromEntries(
  Object.entries(calendarRaw).filter(
    ([key, value]) => /^\d{4}$/.test(key) && Array.isArray(value),
  ),
);

const REFERENCE_AD = { year: 1943, month: 4, day: 14 };
const REFERENCE_BS = { year: 2000, month: 1, day: 1 };

const isLeapYear = (year) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const getAdDaysInMonth = (year, month) => {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && isLeapYear(year)) return 29;
  return days[month - 1];
};

const adToDayNumber = (year, month, day) => {
  let total = 0;
  for (let y = 1; y < year; y++) {
    total += isLeapYear(y) ? 366 : 365;
  }
  for (let m = 1; m < month; m++) {
    total += getAdDaysInMonth(year, m);
  }
  return total + day;
};

const daysBetweenAd = (from, to) =>
  adToDayNumber(to.year, to.month, to.day) -
  adToDayNumber(from.year, from.month, from.day);

const getBsDaysInMonth = (year, month) => {
  const yearData = calendarData[String(year)];
  if (!yearData) {
    throw new Error(`Nepali calendar data missing for BS year ${year}`);
  }
  return yearData[month - 1];
};

export const adToBs = (date = new Date()) => {
  const adYear = date.getFullYear();
  const adMonth = date.getMonth() + 1;
  const adDay = date.getDate();

  let diff = daysBetweenAd(REFERENCE_AD, {
    year: adYear,
    month: adMonth,
    day: adDay,
  });

  let bsYear = REFERENCE_BS.year;
  let bsMonth = REFERENCE_BS.month;
  let bsDay = REFERENCE_BS.day;

  if (diff >= 0) {
    while (diff > 0) {
      const daysInMonth = getBsDaysInMonth(bsYear, bsMonth);
      const remaining = daysInMonth - bsDay + 1;

      if (diff < remaining) {
        bsDay += diff;
        diff = 0;
      } else {
        diff -= remaining;
        bsDay = 1;
        bsMonth += 1;
        if (bsMonth > 12) {
          bsMonth = 1;
          bsYear += 1;
        }
      }
    }
  } else {
    diff = Math.abs(diff);
    while (diff > 0) {
      bsDay -= 1;
      if (bsDay < 1) {
        bsMonth -= 1;
        if (bsMonth < 1) {
          bsMonth = 12;
          bsYear -= 1;
        }
        bsDay = getBsDaysInMonth(bsYear, bsMonth);
      }
      diff -= 1;
    }
  }

  return { year: bsYear, month: bsMonth, day: bsDay };
};

export const getCurrentBsYear = () => adToBs(new Date()).year;
