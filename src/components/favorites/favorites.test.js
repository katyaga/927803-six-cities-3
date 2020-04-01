import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Favorites from "./favorites.jsx";
import NameSpace from "../../reduser/name-space";
import {Router} from "react-router-dom";
import history from "../../history";

const mockStore = configureStore([]);

const user = {
  avatarUrl: `img/1.png`,
  email: `Oliver.conner@gmail.com`,
  id: 10,
  isSuper: true,
  name: `Oliver.conner`,
};

const authorizationStatus = `AUTH`;

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
      name: `Amsterdam`,
    },
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
    isFavorites: true,
  },
];

it(`Should Favorites render correctly`, () => {
  const store = mockStore({
    [NameSpace.OFFERS]: {
      favoritesOffers: MockOffers,
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
          <Router
            history={history}
          >
            <Favorites
              offers={MockOffers}
            />
          </Router>
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
