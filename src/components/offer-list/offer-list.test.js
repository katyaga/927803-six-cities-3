import React from "react";
import renderer from "react-test-renderer";
import OfferList from "./offer-list";

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
  },
];

it(`Should OfferList render correctly`, () => {
  const tree = renderer
    .create(<OfferList
      offers={MockOffers}
      onCardTitleClick={() => {}}
      onHover={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
