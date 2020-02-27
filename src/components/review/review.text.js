import React from "react";
import renderer from "react-test-renderer";
import Review from "./review.jsx";
import {generateRandomDate} from "../../utils";

const MockComment = {
  id: 10,
  authorAvatar: `img/avatar-angelina.jpg`,
  authorName: `Sara`,
  rating: 4,
  date: generateRandomDate(new Date(), 10, 30),
  text: `text1`,
};

it(`Should Review render correctly`, () => {
  const tree = renderer
    .create(<Review
      comment={MockComment}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
