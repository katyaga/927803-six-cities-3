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
  const tree = renderer
    .create(<OfferList
      offers={MockOffers}
      onCardTitleClick={() => {}}
      onCardHover={() => {}}
      isNearPlaces={false}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
