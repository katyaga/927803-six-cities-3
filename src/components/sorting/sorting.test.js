import React from "react";
import renderer from "react-test-renderer";
import Sorting from "./sorting";

const sortType = `PRICE_UP`;

it(`Should Sorting render correctly`, () => {
  const tree = renderer
    .create(
        <Sorting
          sortType={sortType}
          onSortTypeClick={() => {}}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

