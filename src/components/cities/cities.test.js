import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Cities from "./cities.jsx";
import NameSpace from "../../reduser/name-space";

const mockStore = configureStore([]);

const cities = [
  {
    name: `Amsterdam`,
    coordinates: [52.38333, 4.9],
  },
  {
    name: `Cologne`,
    coordinates: [50.930779, 6.938399],
  },
  {
    name: `Brussels`,
    coordinates: [50.851309, 4.351718],
  },
];

it(`Should Cities render correctly`, () => {
  const store = mockStore({
    [NameSpace.OFFERS]: {
      cities,
    },
    handleCityClick: () => {},
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Cities
            city={cities[0].name}
          />
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
