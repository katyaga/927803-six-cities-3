import moment from 'moment';

export const formatMonthYear = (date) => {
  return moment(date).format(`MMMM DD, YYYY`);
};

export const formatDate = (date) => {
  return moment(date).format(`YYYY-MM-DD`);
};

export const getRandomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomElement = (arr) => {
  const rand = getRandomRange(0, arr.length - 1);
  return arr[rand];
};

export const getRandomBoolean = () => {
  return Math.random() >= 0.5;
};

export const generateRandomDate = (targetDate, minDays, maxDays) => {
  let targetDateCopy = new Date(targetDate.valueOf());
  const diffValue = getRandomRange(minDays, maxDays);

  targetDateCopy.setDate(targetDateCopy.getDate() - diffValue);
  targetDateCopy.setHours(getRandomRange(0, 23));
  targetDateCopy.setMinutes(getRandomRange(0, 59));
  return targetDateCopy;
};
