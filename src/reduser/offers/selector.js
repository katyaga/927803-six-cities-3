import NameSpace from "../name-space.js";
import {getCityOffersList} from "../../utils";

export const getCities = (state) => {
  return state[NameSpace.OFFERS].cities;
};

export const getCity = (state) => {
  return state[NameSpace.OFFERS].city;
};

export const getCityOffers = (state) => {
  return getCityOffersList(state[NameSpace.OFFERS].city, state[NameSpace.OFFERS].offers);
};

export const getFavoritesOffers = (state) => {
  return state[NameSpace.OFFERS].favoritesOffers;
};

export const getSelectedTitleId = (state) => {
  return state[NameSpace.OFFERS].selectedTitleId;
};

export const getSortType = (state) => {
  return state[NameSpace.OFFERS].sortType;
};

export const getHoveredCardId = (state) => {
  return state[NameSpace.OFFERS].hoveredCardId;
};

export const getNearbyOffers = (state) => {
  return state[NameSpace.OFFERS].nearbyOffers;
};

export const getComments = (state) => {
  return state[NameSpace.OFFERS].comments;
};
