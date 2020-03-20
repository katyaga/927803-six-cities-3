import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import SingIn from "./sing-in.jsx";
import NameSpace from "../../reduser/name-space";
import history from "../../history.js";

const mockStore = configureStore([]);

const city = `Amsterdam`;

const user = {
  avatarUrl: `img/1.png`,
  email: `Oliver.conner@gmail.com`,
  id: 10,
  isSuper: true,
  name: `Oliver.conner`,
};

const authorizationStatus = `AUTH`;

it(`Should SingIn render correctly`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus,
      user,
    },
  }
  );
  const tree = renderer
    .create(
        <Provider store={store}>
          <Router
            history={history}
          >
            <SingIn
              onSubmit={() => {}}
              city={city}
            />
          </Router>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
