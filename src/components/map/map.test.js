import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Map from "./map";

const mockStore = configureStore([]);

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
    coordinates: [52.3709553943508, 4.85309666406198],
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
];

const activeOffer = {
  id: 3,
  coordinates: [52.4, 4.8],
  isPremium: true,
  images: [
    `img/apartment-01.jpg`,
    `img/apartment-02.jpg`,
    `img/apartment-03.jpg`
  ],
  price: 30,
  title: `apartment3`,
  type: `House`,
  rating: 4,
  isFavorites: true,
};

const city = `Brussels`;

it(`Should Map render correctly`, () => {
  const store = mockStore({
    hoveredCardId: 2
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <Map
            city={city}
            offers={MockOffers}
            activeOffer={activeOffer}
            hoveredCardId={1}
          />
        </Provider>, {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
