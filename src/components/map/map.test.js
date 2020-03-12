import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Map from "./map";
import NameSpace from "../../reduser/name-space";

const mockStore = configureStore([]);

const MockOffers = [
  {
    id: 1,
    city: {
      name: `Amsterdam`,
      location: {
        coordinates: [52.38333, 4.9],
        zoom: 8,
      }
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
    type: `House`,
    rating: 2,
    isFavorites: true,
  },
  {
    id: 2,
    city: {
      name: `Cologne`,
      location: {
        coordinates: [50.930779, 6.938399],
        zoom: 8,
      }
    },
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
  city: {
    name: `Brussels`,
    location: {
      coordinates: [50.930779, 6.938399],
      zoom: 8,
    }
  },
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

it(`Should Map render correctly`, () => {
  const store = mockStore({
    [NameSpace.OFFERS]: {
      cities,
      hoveredCardId: 2,
    }
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
