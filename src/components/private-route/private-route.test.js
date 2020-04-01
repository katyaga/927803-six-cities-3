import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import configureStore from "redux-mock-store";
import PrivateRoute from "./private-route";
import history from "../../history.js";
import NameSpace from "../../reduser/name-space";

const mockStore = configureStore([]);

const path = `/favorites`;

const authorizationStatus = `AUTH`;

it(`Should PrivateRoute render correctly`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus,
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Router
            history={history}
          >
            <PrivateRoute
              path={path}
              exact
              render={() => {}}/>
          </Router>
        </Provider>, {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});


