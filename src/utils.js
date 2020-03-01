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

export const generateRandomDate = (targetDate, minDays, maxDays) => {
  let targetDateCopy = new Date(targetDate.valueOf());
  const diffValue = getRandomRange(minDays, maxDays);

  targetDateCopy.setDate(targetDateCopy.getDate() - diffValue);
  targetDateCopy.setHours(getRandomRange(0, 23));
  targetDateCopy.setMinutes(getRandomRange(0, 59));
  return targetDateCopy;
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getCityOffers = (city, offers) => {
  if (offers.length > 0) {
    return offers.filter((offer) => offer.city.toLowerCase() === city.toLowerCase());
  }
  return [];
};

// export const getCityList = (offers) => {
//   const cities = new Set(offers.map((offer) => offer.city));
//   return Array.from(cities).sort();
// };
