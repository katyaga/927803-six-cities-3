import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const MockData = {
  OFFERS_COUNT: 150,
};

const MockOffers = [
  {
    id: 1,
    coordinates: [52.3709553943508, 4.85309666406198],
    isPremium: true,
    images: [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`
    ],
    price: 10,
    title: `apartment1`,
    type: `House`,
    description: `Description1`,
    bedroomsCount: 2,
    guestsCount: 5,
    facilities: [
      `Wifi`,
      `Heating`,
      `Kitchen`
    ],
    host: {
      avatar: `img/avatar-max.jpg`,
      name: `Max`,
      isSuper: false,
    },
    isFavorites: true,
    rating: 2,
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
    description: `Description2`,
    bedroomsCount: 1,
    guestsCount: 2,
    facilities: [
      `Wifi`,
      `Heating`,
      `Kitchen`
    ],
    host: {
      avatar: `img/avatar-max.jpg`,
      name: `Bob`,
      isSuper: true,
    },
    isFavorites: false,
    rating: 3,
  },
  {
    id: 3,
    coordinates: [52.3709553943508, 4.85309666406198],
    isPremium: true,
    images: [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`
    ],
    price: 30,
    title: `apartment3`,
    type: `Hotel`,
    description: `Description3`,
    bedroomsCount: 3,
    guestsCount: 7,
    facilities: [
      `Wifi`,
      `Heating`,
      `Kitchen`
    ],
    host: {
      avatar: `img/avatar-max.jpg`,
      name: `Alex`,
      isSuper: true,
    },
    isFavorites: true,
    rating: 4,
  },
];

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      offersCount={MockData.OFFERS_COUNT}
      offers={MockOffers}
      onTitleClick={() => {}}
    />, {
      createNodeMock: () => {
        return document.createElement(`div`);
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
