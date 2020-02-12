import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

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

it(`Should WelcomeScreen render correctly`, () => {
  const tree = renderer
    .create(<Main
      offersCount={MockData.OFFERS_COUNT}
      offersShownCards={MockData.OFFERS_SHOWN_CARDS}
      offersNames={MockData.OFFERS_NAMES}
      onTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
