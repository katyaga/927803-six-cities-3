import React from "react";
import renderer from "react-test-renderer";
// import {Provider} from "react-redux";
// import configureStore from "redux-mock-store";
import OfferCard from "./offer-card";

// const mockStore = configureStore([]);

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
  type: `Private Room`,
  rating: 4,
  isFavorites: true,
};

it(`Should OfferCard render correctly`, () => {
  // const store = mockStore({
  //   selectedTitleId: null,
  // });

  const tree = renderer
    .create(
        <OfferCard
          offer={MockOffer}
          onHover={() => {}}
          onCardTitleClick={() => {}}
          isNearPlace={false}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
