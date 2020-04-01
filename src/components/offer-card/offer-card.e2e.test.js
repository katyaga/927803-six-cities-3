import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import OfferCard from "./offer-card";
import {OffersType} from "../../const";

Enzyme.configure({
  adapter: new Adapter(),
});

const MockOffer = {
  id: 10,
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

it(`Should onHover get active card`, () => {
  let activeCard;

  const onCardHover = (card) => {
    activeCard = Object.assign({}, card);
  };

  const offerCard = shallow(
      <OfferCard
        offer={MockOffer}
        onHover={() => {
          onCardHover(MockOffer);
        }}
        onCardTitleClick={() => {}}
        onFavoritesClick={() => {}}
        offersType={OffersType.NEAR_PLACES}
      />
  );

  offerCard.simulate(`mouseenter`);

  expect(activeCard.id).toBe(10);
});

it(`Should click on title get current card info`, () => {
  let clickTitleCardId;

  const onTitleClick = (card) => {
    clickTitleCardId = card.id;
  };

  const offerCard = shallow(
      <OfferCard
        offer={MockOffer}
        onHover={() => {}}
        onCardTitleClick={() => onTitleClick(MockOffer)}
        onFavoritesClick={() => {}}
        offersType={OffersType.DEFAULT}
      />
  );

  const title = offerCard.find(`.place-card__name`);

  title.simulate(`click`);

  expect(clickTitleCardId).toBe(10);
});
