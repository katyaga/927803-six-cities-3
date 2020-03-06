import React from "react";
import renderer from "react-test-renderer";
import City from "./city.jsx";

const MockData = {
  city: `Paris`,
  activeCity: `Brussels`,
};

it(`Should Review render correctly`, () => {
  const tree = renderer
    .create(<City
      key={2}
      activeCity={MockData.activeCity}
      city={MockData.city}
      handleCityClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
