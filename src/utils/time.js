const DAYS_IN_YEAR = 365;

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 3600; // 60 minutes * 60 seconds
const SECONDS_IN_DAY = 86400; // 24 hours * 3600 seconds
const SECONDS_IN_WEEK = SECONDS_IN_DAY * 7;
const SECONDS_IN_MONTH = SECONDS_IN_DAY * (DAYS_IN_YEAR / 12); // Approximate month duration
const SECONDS_IN_YEAR = SECONDS_IN_DAY * DAYS_IN_YEAR;
const MILLISECONDS_IN_DAY = SECONDS_IN_DAY * MILLISECONDS_IN_SECOND;

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

function getWeekNumber(inputDate) {
  const date = new Date(inputDate);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 4 - (date.getDay() || 7));
  const yearStart = new Date(date.getFullYear(), 0, 1);
  return Math.ceil(((date - yearStart) / MILLISECONDS_IN_DAY + 1) / 7);
}

export const calculateDateFromRatio = (timelineSettings, ratio) => {
  const timestamp =
    timelineSettings.start +
    Math.floor(ratio * (timelineSettings.end - timelineSettings.start));
  const date = new Date(timestamp);
  return {
    year: date.getFullYear(),
    monthNumber: date.getMonth() + 1,
    month: MONTH_NAMES[date.getMonth()],
    week: getWeekNumber(date),
    dayNumber: date.getDate(),
    dayOfWeek: DAY_NAMES[date.getDay()],
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    timestamp,
  };
};

export const calculateOneDayRatio = (timelineSettings) =>
  1 / getTotalDays(timelineSettings);

export const getTotalDays = (timelineSettings) => {
  return (timelineSettings.end - timelineSettings.start) / MILLISECONDS_IN_DAY;
};

export const calculateOneSecondRatio = (timelineSettings) => {
  const totalDurationInSeconds =
    (timelineSettings.end - timelineSettings.start) / MILLISECONDS_IN_SECOND;
  return totalDurationInSeconds > 0 ? 1 / totalDurationInSeconds : 0;
};

export const calculateRatioFromGranularity = (
  granularity,
  timelineSettings
) => {
  const oneSecondRatio = calculateOneSecondRatio(timelineSettings);

  switch (granularity) {
    case "second":
      return oneSecondRatio;
    case "minute":
      return oneSecondRatio * SECONDS_IN_MINUTE;
    case "hour":
      return oneSecondRatio * SECONDS_IN_HOUR;
    case "day":
      return oneSecondRatio * SECONDS_IN_DAY;
    case "week":
      return oneSecondRatio * SECONDS_IN_WEEK;
    case "month":
      return oneSecondRatio * SECONDS_IN_MONTH;
    case "year":
      return oneSecondRatio * SECONDS_IN_YEAR;
    default:
      throw new Error("Invalid granularity");
  }
};
