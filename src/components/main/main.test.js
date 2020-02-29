import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

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
  const tree = renderer
    .create(<Main
      city={city}
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
