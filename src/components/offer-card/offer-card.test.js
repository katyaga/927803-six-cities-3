import React from "react";
import renderer from "react-test-renderer";
import OfferCard from "./offer-card";

const MockOffer = {
  id: 1,
  isPremium: true,
  image: `img/apartment-01.jpg`,
  price: 10,
  title: `apartment1`,
  type: `ROOM`,
  rating: 4,
};

it(`Should OfferCard render correctly`, () => {
  const tree = renderer
    .create(<OfferCard
      offer={MockOffer}
      onHover={() => {}}
      onCardTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
