import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const MockData = {
  OFFERS_COUNT: 150,
};

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

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      offersCount={MockData.OFFERS_COUNT}
      offers={MockOffers}
      onTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
