import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

Enzyme.configure({
  adapter: new Adapter(),
});

const MockData = {
  OFFERS_COUNT: 150,
  OFFERS_SHOWN_CARDS: 5,
  OFFERS_NAMES: [
    `Apartment 1`,
    `Apartment 2`,
    `Apartment 3`,
    `Apartment 4`
  ]
};

it(`Should welcome button be pressed`, () => {
  const onTitleClick = jest.fn();

  const mainScreen = shallow(
      <Main
        offersCount={MockData.OFFERS_COUNT}
        offersShownCards={MockData.OFFERS_SHOWN_CARDS}
        offersNames={MockData.OFFERS_NAMES}
        onTitleClick={onTitleClick}
      />
  );

  const titleLink = mainScreen.find(`.place-card__name a`);

  titleLink.forEach((title) => {
    title.props().onClick();
  });

  expect(onTitleClick.mock.calls.length).toBe(titleLink.length);
});
