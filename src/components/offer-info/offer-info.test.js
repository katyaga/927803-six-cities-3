import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import configureStore from "redux-mock-store";
import OfferInfo from "./offer-info.jsx";
import NameSpace from "../../reduser/name-space";
import history from "../../history.js";

const mockStore = configureStore([]);

const MockOffers = [
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
    type: `room`,
    description: `Description2`,
    bedroomsCount: 2,
    guestsCount: 5,
    facilities: [
      `Wifi`,
      `Heating`,
      `Kitchen`
    ],
    rating: 3,
    host: {
      avatar: `img/avatar-max.jpg`,
      name: `Den`,
      isSuper: true,
    },
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
    type: `hotel`,
    description: `Description3`,
    bedroomsCount: 1,
    guestsCount: 2,
    facilities: [
      `Wifi`,
      `Heating`,
      `Kitchen`
    ],
    rating: 4,
    host: {
      avatar: `img/avatar-max.jpg`,
      name: `Anna`,
      isSuper: true,
    },
    isFavorites: false,
  },
];

const cities = [
  {
    name: `Amsterdam`,
    location: {
      coordinates: [52.38333, 4.9],
      zoom: 8,
    }
  },
  {
    name: `Cologne`,
    location: {
      coordinates: [50.930779, 6.938399],
      zoom: 8,
    }
  },
  {
    name: `Brussels`,
    location: {
      coordinates: [50.851309, 4.351718],
      zoom: 8,
    }
  },
];

const user = {
  avatarUrl: `img/1.png`,
  email: `Oliver.conner@gmail.com`,
  id: 10,
  isSuper: true,
  name: `Oliver.conner`,
};

const authorizationStatus = `AUTH`;

it(`Should OfferInfo render correctly`, () => {
  const store = mockStore({
    [NameSpace.OFFERS]: {
      offers: MockOffers,
      cities,
      selectedTitleId: 2,
      sortType: `PRICE_UP`,
      nearbyOffers: [2, 3],
      comments: [
        {
          id: 1,
          coordinates: [52.3, 4.8],
          authorAvatar: `img/avatar-angelina.jpg`,
          authorName: `Angelina`,
          rating: 5,
          date: new Date(`2019-12-23 12:00:11`),
          text: `text1`,
        },
        {
          id: 2,
          coordinates: [52.3, 4.8],
          authorAvatar: `img/avatar-max.jpg`,
          authorName: `Tom`,
          rating: 5,
          date: new Date(`2020-02-23 12:00:11`),
          text: `text2`,
        },
        {
          id: 3,
          coordinates: [52.3, 4.8],
          authorAvatar: `img/avatar-max.jpg`,
          authorName: `Bob`,
          rating: 4,
          date: new Date(`2020-01-23 12:00:11`),
          text: `text3`,
        },
      ],
    },
    [NameSpace.USER]: {
      authorizationStatus,
      user,
    },
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <Router
            history={history}
          >
            <OfferInfo
              offers={MockOffers}
            />
          </Router>
        </Provider>, {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
