import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

Enzyme.configure({
  adapter: new Adapter(),
});

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

it(`Should welcome button be pressed`, () => {
  const onTitleClick = jest.fn();

  const mainScreen = shallow(
      <Main
        offersCount={MockData.OFFERS_COUNT}
        offers={MockOffers}
        onTitleClick={onTitleClick}
      />
  );

  const titleLink = mainScreen.find(`.place-card__name a`);

  titleLink.forEach((title) => {
    title.props().onClick();
  });

  expect(onTitleClick.mock.calls.length).toBe(titleLink.length);
});
