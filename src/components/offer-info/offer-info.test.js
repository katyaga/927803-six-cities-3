import React from "react";
import renderer from "react-test-renderer";
import OfferInfo from "./offer-info";

const MockOffer = {
  id: 1,
  isPremium: true,
  images: [
    `img/apartment-01.jpg`,
    `img/apartment-02.jpg`,
    `img/apartment-03.jpg`
  ],
  price: 10,
  title: `apartment1`,
  type: `Apartment`,
  description: `Description`,
  bedroomsCount: 10,
  guestsCount: 3,
  facilities: [
    `Wifi`,
    `Heating`,
    `Kitchen`
  ],
  rating: 1,
  host: {
    avatar: `img/avatar-max.jpg`,
    name: `Max`,
    isSuper: true,
  },
  isFavorites: true,
};

it(`Should OfferInfo render correctly`, () => {
  const tree = renderer
    .create(<OfferInfo
      offer={MockOffer}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
