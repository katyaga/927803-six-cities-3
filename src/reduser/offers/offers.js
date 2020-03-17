import {extend, getCityOffers, adapter, getCityList} from "../../utils.js";
import {adapterComments} from "../../utils";

const initialState = {
  cities: [],
  offers: [],
  city: ``,
  cityOffers: [],
  selectedTitleId: null,
  comments: [],
  nearbyOffers: [],
  hoveredCardId: null,
  sortType: `DEFAULT`,
};

const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },
  loadCityOffers: (offers) => {
    return {
      type: ActionType.LOAD_CITY_OFFERS,
      payload: offers,
    };
  },
  setCities: (cities) => {
    return {
      type: ActionType.SET_CITIES,
      payload: cities,
    };
  },
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
  setHoveredCardId: (card) => ({
    type: ActionType.SET_HOVERED_CARD_ID,
    payload: card
  }),
  setSortType: (type) => ({
    type: ActionType.SET_SORT_TYPE,
    payload: type
  }),
  setComments: (comments) => {
    return {
      type: ActionType.SET_COMMENTS,
      payload: comments,
    };
  },
  setNearbyOffers: (offers) => {
    return {
      type: ActionType.SET_NEARBY_OFFERS,
      payload: offers,
    };
  },
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  SET_CITIES: `SET_CITIES`,
  SET_CITY: `SET_CITY`,
  SET_OFFERS: `SET_OFFERS`,
  LOAD_CITY_OFFERS: `LOAD_CITY_OFFERS`,
  SET_SELECTED_TITLE_ID: `SET_SELECTED_TITLE_ID`,
  SET_HOVERED_CARD_ID: `SET_HOVERED_CARD_ID`,
  SET_SORT_TYPE: `SET_SORT_TYPE`,
  SET_COMMENTS: `SET_COMMENTS`,
  SET_NEARBY_OFFERS: `SET_NEARBY_OFFERS`,
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const offers = adapter(response.data);
        dispatch(ActionCreator.loadOffers(offers));
        dispatch(ActionCreator.setCities(getCityList(offers)));
        dispatch(ActionCreator.setCity(offers[0].city.name));
        dispatch(ActionCreator.loadCityOffers(getCityOffers(offers[0].city.name, offers)));
      });
  },
  setComments: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreator.setComments(adapterComments(response.data)));
      });
  },
  sendComment: (id, commentData) => (dispatch, getState, api) => {
    return api.post(`/comments/${id}`, {
      comment: commentData.comment,
      rating: commentData.rating,
    }).then((response) => {
      dispatch(ActionCreator.setComments(adapterComments(response.data)));
    })
    .catch();
  },
  setNearbyOffers: (id) => (dispatch, getState, api) => {
    return api.get(`/hotels/${id}/nearby`)
      .then((response) => {
        dispatch(ActionCreator.setNearbyOffers(response.data.map((offer) => offer.id)));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offers: action.payload,
      });

    case ActionType.LOAD_CITY_OFFERS:
      return extend(state, {
        cityOffers: action.payload,
      });

    case ActionType.SET_CITY:
      return extend(state, {
        city: action.payload,
      });

    case ActionType.SET_CITIES:
      return extend(state, {
        cities: action.payload,
      });

    case ActionType.SET_OFFERS:
      return extend(state, {
        cityOffers: getCityOffers(state.city, state.offers),
      });

    case ActionType.SET_SELECTED_TITLE_ID:
      return extend(state, {
        selectedTitleId: action.payload,
      });

    case ActionType.SET_HOVERED_CARD_ID:
      return extend(state, {
        hoveredCardId: action.payload,
      });

    case ActionType.SET_SORT_TYPE:
      return extend(state, {
        sortType: action.payload,
      });

    case ActionType.SET_COMMENTS:
      return extend(state, {
        comments: action.payload,
      });

    case ActionType.SET_NEARBY_OFFERS:
      return extend(state, {
        nearbyOffers: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
