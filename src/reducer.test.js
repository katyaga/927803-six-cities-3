import {reducer, ActionType} from "./reducer.js";
// import {cities as cityList} from "./mocks/cities";
// import {offers as mockOffers} from "./mocks/offers";

const mockOffers = [
  {
    id: 1,
    city: `Hamburg`
  },
  {
    id: 4,
    city: `Amsterdam`
  },
];

const mockCities = [
  {
    name: `Amsterdam`,
    coordinates: [52.38333, 4.9],
  },
  {
    name: `Brussels`,
    coordinates: [50.851309, 4.351718],
  },
];

const state = {
  cities: mockCities,
  offers: mockOffers,
  city: mockCities[0].name,
  cityOffers: [mockOffers[1]],
  selectedTitleId: null,
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(state, {})).toEqual({
    cities: mockCities,
    offers: mockOffers,
    city: `Amsterdam`,
    cityOffers: [
      {
        id: 4,
        city: `Amsterdam`
      },
    ],
    selectedTitleId: null,
  });
});

it(`Reducer should change city`, () => {
  expect(reducer({
    city: `Hamburg`,
  }, {
    type: ActionType.SET_CITY,
    payload: `Paris`,
  })).toEqual({
    city: `Paris`,
  });
});

it(`Reducer should set offers of city`, () => {
  expect(reducer({
    offers: mockOffers,
    city: `Hamburg`,
  }, {
    type: ActionType.SET_OFFERS,
  })).toEqual({
    offers: mockOffers,
    city: `Hamburg`,
    cityOffers: [
      {
        id: 1,
        city: `Hamburg`
      },
    ],
  });
});
