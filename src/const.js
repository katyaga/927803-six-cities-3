export const RealtyType = {
  APARTMENT: `Apartment`,
  ROOM: `Private Room`,
  HOUSE: `House`,
  HOTEL: `Hotel`
};

export const REALTY_TYPES = Object.keys(RealtyType).map((key) => key.toLowerCase());

export const SortType = {
  DEFAULT: `Popular`,
  PRICE_UP: `Price: low to high`,
  PRICE_DOWN: `Price: high to low`,
  RATING: `Top rated first`,
};

export const RATING_TITLES = [`perfect`, `good`, `not bad`, `badly`, `terribly`];

