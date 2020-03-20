import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import ReviewsForm from "./reviews-form.jsx";


const mockStore = configureStore([]);

const Mocks = {
  rating: 4,
  comment: `Good place`,
  isBlockButton: true,
  isBlockForm: false,
  selectedTitleId: 7,
};

it(`Should ReviewsForm render correctly`, () => {
  const store = mockStore({
    onFormSubmit: () => {},
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <ReviewsForm
            rating={Mocks.rating}
            comment={Mocks.comment}
            isBlockButton={Mocks.isBlockButton}
            isBlockForm={Mocks.isBlockForm}
            // onFormSubmit={() => {}}
            handleFormButton={() => {}}
            setHocState={() => {}}
            selectedTitleId={Mocks.selectedTitleId}
          />
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

