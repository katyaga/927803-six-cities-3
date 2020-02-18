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

