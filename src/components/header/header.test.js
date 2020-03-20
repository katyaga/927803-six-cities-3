import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Router} from "react-router-dom";
import NameSpace from "../../reduser/name-space";
import {Provider} from "react-redux";
import Header from "./header";
import history from "../../history.js";

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
          <Router
            history={history}
          >
            <Header />
          </Router>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
