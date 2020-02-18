import React from "react";
import renderer from "react-test-renderer";
import OfferList from "./offer-list";

const MockOffers = [
  {
    id: 1,
    isPremium: true,
    image: `img/apartment-01.jpg`,
    price: 10,
    title: `apartment1`,
    type: `HOUSE`,
    rating: 2,
  },
  {
    id: 2,
    isPremium: true,
    image: `img/apartment-02.jpg`,
    price: 20,
    title: `apartment2`,
    type: `ROOM`,
    rating: 3,
  },
  {
    id: 3,
    isPremium: true,
    image: `img/apartment-03.jpg`,
    price: 30,
    title: `apartment3`,
    type: `HOTEL`,
    rating: 4,
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
