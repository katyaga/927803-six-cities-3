import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import OfferCard from "./offer-card";
import history from "../../history.js";
import {OffersType} from "../../const";

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
  type: `room`,
  rating: 4,
  isFavorites: true,
};

it(`Should OfferCard render correctly`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <OfferCard
            offer={MockOffer}
            onHover={() => {}}
            onCardTitleClick={() => {}}
            offersType={OffersType.NEAR_PLACES}
          />
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
