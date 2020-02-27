import React from "react";
import renderer from "react-test-renderer";
import Map from "./map";

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

it(`Should Map render correctly`, () => {
  const tree = renderer
    .create(<Map
      offers={MockOffers}
      activeOffer={activeOffer}
    />, {
      createNodeMock: () => {
        return document.createElement(`div`);
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
