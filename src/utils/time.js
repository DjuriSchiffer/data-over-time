const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
const DAYS_IN_YEAR = 365;

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getWeekNumber(date) {
  // Copy date so don't modify original
  date = new Date(date);
  date.setHours(0, 0, 0, 0);
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  date.setDate(date.getDate() + 4 - (date.getDay() || 7));
  // Get first day of year
  const yearStart = new Date(date.getFullYear(), 0, 1);
  // Calculate full weeks to nearest Thursday
  const weekNumber = Math.ceil(
    ((date - yearStart) / MILLISECONDS_IN_DAY + 1) / 7
  );
  return weekNumber;
}

export const calculateYearFromRatio = (timelineSettings, ratio) =>
  timelineSettings.start +
  Math.floor(ratio * (timelineSettings.end - timelineSettings.start));

export const calculateDateFromRatio = (timelineSettings, ratio) => {
  const timestamp = calculateYearFromRatio(timelineSettings, ratio);
  const date = new Date(timestamp);

  const dayNumber = date.getDay();
  const dayOfWeek = DAY_NAMES[dayNumber];

  return {
    year: date.getFullYear(),
    monthNumber: date.getMonth() + 1,
    month: MONTH_NAMES[date.getMonth()],
    week: getWeekNumber(date),
    dayNumber,
    dayOfWeek,
    timestamp,
  };
};

export const getYearFromDateStr = (dateStr) => new Date(dateStr).getFullYear();

export const calculateOneDayRatio = (timelineSettings) =>
  1 /
  ((getYearFromDateStr(timelineSettings.end) -
    getYearFromDateStr(timelineSettings.start)) *
    DAYS_IN_YEAR +
    1);

export const calculateRatioFromGranularity = (
  granularity,
  timelineSettings
) => {
  const oneDayRatio = calculateOneDayRatio(timelineSettings);

  switch (granularity) {
    case "day":
      return oneDayRatio;
    case "week":
      return oneDayRatio * 7;
    case "month":
      return oneDayRatio * 30;
    case "year":
      return oneDayRatio * DAYS_IN_YEAR;
    default:
      throw new Error("Invalid granularity");
  }
};

export const getTotalDays = (timelineSettings) =>
  Math.floor(
    (timelineSettings.end - timelineSettings.start) / MILLISECONDS_IN_DAY
  );
