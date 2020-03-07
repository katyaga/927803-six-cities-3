import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import OfferList from "./offer-list";

const mockStore = configureStore([]);

const MockOffers = [
  {
    id: 1,
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
    nearbyOffers: [2, 3],
  },
  {
    id: 2,
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
    nearbyOffers: [1, 3],
  },
  {
    id: 3,
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
    nearbyOffers: [1, 2],
  },
];

it(`Should OfferList render correctly`, () => {
  const store = mockStore({
    sortType: `PRICE_UP`
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <OfferList
            offers={MockOffers}
            isNearPlaces={false}
          />
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
