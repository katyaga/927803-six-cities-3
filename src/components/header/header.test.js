import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import NameSpace from "../../reduser/name-space";
import {Provider} from "react-redux";
import Header from "./header";

const mockStore = configureStore([]);

const user = {
  avatarUrl: `img/1.png`,
  email: `Oliver.conner@gmail.com`,
  id: 10,
  isSuper: true,
  name: `Oliver.conner`,
};

it(`Should Header render correctly`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      user,
      authorizationStatus: `AUTH`,
    }
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <Header />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
