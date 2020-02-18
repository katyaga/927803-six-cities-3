import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import OfferCard from "./offer-card";

Enzyme.configure({
  adapter: new Adapter(),
});

const MockOffer = {
  id: 1,
  isPremium: true,
  image: `img/apartment-01.jpg`,
  price: 10,
  title: `apartment1`,
  type: `ROOM`,
  rating: 4,
};

it(`Should onHover get active card`, () => {
  let activeCard;

  const onCardHover = (card) => {
    activeCard = Object.assign({}, card);
  };

  const offerCard = shallow(
      <OfferCard
        offer={MockOffer}
        onHover={onCardHover(MockOffer)}
        onCardTitleClick={() => {}}
      />
  );

  offerCard.simulate(`mouseenter`);

  expect(activeCard.id).toBe(1);
});
