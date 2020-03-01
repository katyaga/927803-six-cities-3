import {extend, getCityOffers} from "./utils.js";
import {offers as mockOffers} from "./mocks/offers";
import {cities as cityList} from "./mocks/cities";

const initialState = {
  cities: cityList,
  offers: mockOffers,
  city: cityList[0].name,
  cityOffers: getCityOffers(cityList[0].name, mockOffers),
  selectedTitleId: null,
};

const ActionCreator = {
  setCity: (city) => ({
    type: ActionType.SET_CITY,
    payload: city
  }),
  setOffers: () => ({
    type: ActionType.SET_OFFERS,
  }),
  setSelectedTitleId: (card) => ({
    type: ActionType.SET_SELECTED_TITLE_ID,
    payload: card
  }),
};


const ActionType = {
  SET_CITY: `SET_CITY`,
  SET_OFFERS: `SET_OFFERS`,
  SET_SELECTED_TITLE_ID: `SET_SELECTED_TITLE_ID`,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CITY:
      return extend(state, {
        city: action.payload,
      });

    case ActionType.SET_OFFERS:
      return extend(state, {
        cityOffers: getCityOffers(state.city, state.offers),
      });

    case ActionType.SET_SELECTED_TITLE_ID:
      return extend(state, {
        selectedTitleId: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
