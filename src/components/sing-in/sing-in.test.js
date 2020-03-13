import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import SingIn from "./sing-in.jsx";
import NameSpace from "../../reduser/name-space";
// import NameSpace from "../../reduser/name-space";

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
          <SingIn
            onSubmit={() => {}}
            city={city}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
