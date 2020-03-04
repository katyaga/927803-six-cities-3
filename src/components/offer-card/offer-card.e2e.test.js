import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// import {Provider} from "react-redux";
// import configureStore from "redux-mock-store";
import OfferCard from "./offer-card";

Enzyme.configure({
  adapter: new Adapter(),
});

// const mockStore = configureStore([]);

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
  type: `Private Room`,
  rating: 4,
  isFavorites: true,
};

it(`Should onHover get active card`, () => {
  // const store = mockStore({
  //   selectedTitleId: null,
  // });

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
        isNearPlace={false}
      />
  );

  offerCard.simulate(`mouseenter`);

  expect(activeCard.id).toBe(10);
});

it(`Should click on title get current card info`, () => {
  // const store = mockStore({
  //   selectedTitleId: null,
  // });
  let clickTitleCardId;

  const onTitleClick = (card) => {
    clickTitleCardId = card.id;
  };

  const offerCard = shallow(
      <OfferCard
        offer={MockOffer}
        onHover={() => {}}
        onCardTitleClick={() => onTitleClick(MockOffer)}
        isNearPlace={false}
      />
  );

  const title = offerCard.find(`.place-card__name`);

  title.simulate(`click`);

  expect(clickTitleCardId).toBe(10);
});
