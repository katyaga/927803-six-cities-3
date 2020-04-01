import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation} from "./offers.js";
import {adapterOffers} from "../../utils";

const api = createAPI(() => {});

const offers = [
  {
    id: 2,
    city: {
      location: {
        coordinates: [52.3, 4.8],
        zoom: 8,
      },
      name: `Amsterdam`,
    },
    coordinates: [52.3, 4.8],
    isPremium: true,
    images: [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`
    ],
    price: 20,
    title: `apartment2`,
    type: `Private Room`,
    rating: 3,
    isFavorites: false,
  },
  {
    id: 3,
    city: {
      location: {
        coordinates: [52.3, 4.8],
        zoom: 8,
      },
      name: `Cologne`,
    },
    coordinates: [52.3, 4.8],
    isPremium: true,
    images: [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`
    ],
    price: 30,
    title: `apartment3`,
    type: `Hotel`,
    rating: 4,
    isFavorites: false,
  },
];

const offersFromServer = [
  {
    "bedrooms": 3,
    "city": {
      "location": {
        "latitude": 52.370216,
        "longitude": 4.895168,
        "zoom": 10
      },
      "name": `Amsterdam`
    },
    "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
    "host": {
      "avatar_url": `img/1.png`,
      "id": 3,
      "is_pro": true,
      "name": `Angelina`
    },
    "id": 1,
    "images": [`img/1.png`, `img/2.png`],
    "is_favorite": false,
    "is_premium": false,
    "location": {
      "latitude": 52.35514938496378,
      "longitude": 4.673877537499948,
      "zoom": 8
    },
    "max_adults": 4,
    "preview_image": `img/1.png`,
    "price": 120,
    "rating": 4.8,
    "title": `Beautiful & luxurious studio at great location`,
    "type": `apartment`
  }];

const adaptedOffersFromServer = adapterOffers(offersFromServer);

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    cities: [],
    offers: [],
    city: ``,
    favoritesOffers: [],
    selectedTitleId: null,
    comments: [],
    nearbyOffers: [],
    hoveredCardId: null,
    sortType: `DEFAULT`,
  });
});

it(`Reducer should update offers by load offers`, () => {
  expect(reducer({
    offers: [],
  }, {
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  })).toEqual({
    offers,
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, offersFromServer);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: adaptedOffersFromServer,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_CITIES,
          payload: [{
            "location": {
              "coordinates": [52.370216, 4.895168],
              "zoom": 10
            },
            "name": `Amsterdam`
          }],
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_CITY,
          payload: `Amsterdam`,
        });
      });
  });
});
