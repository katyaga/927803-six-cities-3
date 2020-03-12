// import {createSelector} from "reselect";
import NameSpace from "../name-space.js";

export const getCities = (state) => {
  return state[NameSpace.OFFERS].cities;
};

export const getCity = (state) => {
  return state[NameSpace.OFFERS].city;
};

export const getCityOffers = (state) => {
  return state[NameSpace.OFFERS].cityOffers;
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
