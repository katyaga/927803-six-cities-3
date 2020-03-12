import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app.jsx";
import NameSpace from "../../reduser/name-space";

const mockStore = configureStore([]);

const sortType = `PRICE_UP`;
const city = `Brussels`;

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
    type: `hotel`,
    rating: 4,
    isFavorites: false,
  },
];

it(`Render App`, () => {
  const store = mockStore({
    [NameSpace.OFFERS]: {
      city: `Cologne`,
      cityOffers: MockOffers,
      cities: [
        {
          name: `Amsterdam`,
          location: {
            coordinates: [52.38333, 4.9],
            zoom: 8,
          },
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
          },
        },
      ],
      sortType: `PRICE_UP`,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            city={city}
            cityOffers={MockOffers}
            onTitleClick={() => {}}
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
