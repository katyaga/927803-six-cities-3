import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Router} from "react-router-dom";
import OfferList from "./offer-list";
import NameSpace from "../../reduser/name-space";
import history from "../../history.js";

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
    type: `house`,
    rating: 2,
    isFavorites: true,
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
    type: `room`,
    rating: 3,
    isFavorites: false,
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
    type: `hotel`,
    rating: 4,
    isFavorites: false,
  },
];

it(`Should OfferList render correctly`, () => {
  const store = mockStore({
    [NameSpace.OFFERS]: {
      sortType: `PRICE_UP`
    }
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <Router
            history={history}
          >
            <OfferList
              offers={MockOffers}
              isNearPlaces={false}
            />
          </Router>
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
