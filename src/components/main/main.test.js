import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main.jsx";

const mockStore = configureStore([]);

const MockData = {
  OFFERS_COUNT: 150,
};

const MockOffers = [
  {
    id: 1,
    coordinates: [52.3809553943508, 4.85309666406198],
    isPremium: true,
    images: [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`
    ],
    price: 10,
    title: `apartment1`,
    type: `House`,
    rating: 2,
    isFavorites: true,
  },
  {
    id: 2,
    coordinates: [52.3809553943508, 4.85309666406198],
    isPremium: true,
    images: [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`
    ],
    price: 20,
    title: `apartment2`,
    type: `Apartment`,
    rating: 3,
    isFavorites: true,
  },
  {
    id: 3,
    coordinates: [52.3809553943508, 4.85309666406198],
    isPremium: true,
    images: [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`
    ],
    price: 30,
    title: `apartment3`,
    type: `Private Room`,
    rating: 4,
    isFavorites: true,
  },
];

const city = `Brussels`;

it(`Should Main render correctly`, () => {
  const store = mockStore({
    cities: [
      {
        name: `Amsterdam`,
        coordinates: [52.38333, 4.9],
      },
      {
        name: `Cologne`,
        coordinates: [50.930779, 6.938399],
      },
      {
        name: `Brussels`,
        coordinates: [50.851309, 4.351718],
      },
    ]
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Main
            city={city}
            offersCount={MockData.OFFERS_COUNT}
            offers={MockOffers}
            onTitleClick={() => {}}
          />
        </Provider>, {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
