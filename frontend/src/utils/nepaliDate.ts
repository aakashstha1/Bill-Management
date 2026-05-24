import rawCalendarData from "../data/nepaliCalendar.json";

export type BsDate = {
  year: number;
  month: number;
  day: number;
};

export type NepaliMonth = {
  index: number;
  apiValue: string;
  english: string;
};

export const NEPALI_MONTHS: NepaliMonth[] = [
  { index: 1, apiValue: "baisakh", english: "Baisakh" },
  { index: 2, apiValue: "jestha", english: "Jestha" },
  { index: 3, apiValue: "ashadh", english: "Ashadh" },
  { index: 4, apiValue: "shrawan", english: "Shrawan" },
  { index: 5, apiValue: "bhadra", english: "Bhadra" },
  { index: 6, apiValue: "ashwin", english: "Ashwin" },
  { index: 7, apiValue: "kartik", english: "Kartik" },
  { index: 8, apiValue: "mangsir", english: "Mangsir" },
  { index: 9, apiValue: "poush", english: "Poush" },
  { index: 10, apiValue: "magh", english: "Magh" },
  { index: 11, apiValue: "falgun", english: "Falgun" },
  { index: 12, apiValue: "chaitra", english: "Chaitra" },
];

const calendar = Object.fromEntries(
  Object.entries(rawCalendarData).filter(
    ([key, value]) => /^\d{4}$/.test(key) && Array.isArray(value),
  ),
) as Record<string, number[]>;

const REFERENCE_AD = { year: 1943, month: 4, day: 14 };
const REFERENCE_BS: BsDate = { year: 2000, month: 1, day: 1 };

const isLeapYear = (year: number) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const getAdDaysInMonth = (year: number, month: number) => {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && isLeapYear(year)) return 29;
  return days[month - 1];
};

const adToDayNumber = (year: number, month: number, day: number) => {
  let total = 0;
  for (let y = 1; y < year; y++) {
    total += isLeapYear(y) ? 366 : 365;
  }
  for (let m = 1; m < month; m++) {
    total += getAdDaysInMonth(year, m);
  }
  return total + day;
};

const daysBetweenAd = (
  from: { year: number; month: number; day: number },
  to: { year: number; month: number; day: number },
) => adToDayNumber(to.year, to.month, to.day) - adToDayNumber(from.year, from.month, from.day);

export const getBsDaysInMonth = (year: number, month: number) => {
  const yearData = calendar[String(year)];
  if (!yearData) {
    throw new Error(`Nepali calendar data missing for BS year ${year}`);
  }
  return yearData[month - 1];
};

export const adToBs = (date: Date = new Date()): BsDate => {
  const adYear = date.getFullYear();
  const adMonth = date.getMonth() + 1;
  const adDay = date.getDate();

  let diff = daysBetweenAd(REFERENCE_AD, {
    year: adYear,
    month: adMonth,
    day: adDay,
  });

  let { year: bsYear, month: bsMonth, day: bsDay } = REFERENCE_BS;

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

export const getTodayBs = () => adToBs(new Date());

export const getCurrentBsYear = () => getTodayBs().year;

export const getNepaliMonthByApiValue = (apiValue: string) =>
  NEPALI_MONTHS.find((m) => m.apiValue === apiValue.toLowerCase());

export const getNepaliMonthByIndex = (index: number) =>
  NEPALI_MONTHS.find((m) => m.index === index);

export const formatBsDate = (
  bs: BsDate,
  options?: { includeWeekday?: boolean },
) => {
  const month = getNepaliMonthByIndex(bs.month);
  const monthLabel = month?.english ?? "";
  const base = `${bs.day} ${monthLabel} ${bs.year}`;

  if (!options?.includeWeekday) return base;

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekday = weekdays[new Date().getDay()];
  return `${weekday}, ${base}`;
};

export const formatBsPeriodLabel = (year: number, month: string) => {
  if (month === "all") {
    return `BS ${year} (All months)`;
  }

  const monthMeta = getNepaliMonthByApiValue(month);
  if (!monthMeta) return `BS ${year}`;

  return `${monthMeta.english} ${year}`;
};

export const getNepaliMonthSelectOptions = () => [
  { label: "All months", value: "all" },
  ...NEPALI_MONTHS.map((m) => ({
    label: m.english,
    value: m.apiValue,
  })),
];

export const getNepaliYearSelectOptions = (count = 6) => {
  const current = getCurrentBsYear();
  return Array.from({ length: count }, (_, i) => {
    const year = current - i;
    return {
      label: `BS ${year}`,
      value: String(year),
    };
  });
};

export const getNepaliMonthEnglishLabel = (apiValue: string) =>
  getNepaliMonthByApiValue(apiValue)?.english ?? apiValue;
