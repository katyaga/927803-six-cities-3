import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main.jsx";
import NameSpace from "../../reduser/name-space";

const mockStore = configureStore([]);

const sortType = `PRICE_UP`;

const MockData = {
  OFFERS_COUNT: 150,
};

const MockOffers = [
  {
    id: 1,
    city: {
      location: {
        coordinates: [52.3, 4.8],
        zoom: 8,
      },
      name: `Amsterdam`,
    },
    coordinates: [52.3809553943508, 4.85309666406198],
    isPremium: true,
    images: [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`
    ],
    price: 10,
    title: `apartment1`,
    type: `house`,
    rating: 2,
    isFavorites: true,
  },
  {
    id: 2,
    city: {
      location: {
        coordinates: [52.3, 4.8],
        zoom: 8,
      },
      name: `Brussels`,
    },
    coordinates: [52.3809553943508, 4.85309666406198],
    isPremium: true,
    images: [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`
    ],
    price: 20,
    title: `apartment2`,
    type: `apartment`,
    rating: 3,
    isFavorites: true,
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
    coordinates: [52.3809553943508, 4.85309666406198],
    isPremium: true,
    images: [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`
    ],
    price: 30,
    title: `apartment3`,
    type: `room`,
    rating: 4,
    isFavorites: true,
  },
];

const city = `Brussels`;

const user = {
  avatarUrl: `img/1.png`,
  email: `Oliver.conner@gmail.com`,
  id: 10,
  isSuper: true,
  name: `Oliver.conner`,
};

const authorizationStatus = `AUTH`;

it(`Should Main render correctly`, () => {
  const store = mockStore({
    [NameSpace.OFFERS]: {
      city: `Cologne`,
      cities: [
        {
          name: `Amsterdam`,
          location: {
            coordinates: [52.38333, 4.9],
            zoom: 8
          },
        },
        {
          name: `Cologne`,
          location: {
            coordinates: [50.930779, 6.938399],
            ZOOM: 8,
          }
        },
        {
          name: `Brussels`,
          location: {
            coordinates: [50.851309, 4.351718],
            zoom: 8,
          },
        },
      ],
      sortType: `PRICE_UP`,
    },
    [NameSpace.USER]: {
      authorizationStatus,
      user,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Main
            city={city}
            offersCount={MockData.OFFERS_COUNT}
            offers={MockOffers}
            onTitleClick={() => {}}
            onCardHover={() => {}}
            onSortTypeClick={() => {}}
            sortType={sortType}
          />
        </Provider>, {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
