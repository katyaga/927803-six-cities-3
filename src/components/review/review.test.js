import React from "react";
import renderer from "react-test-renderer";
import Review from "./review.jsx";

const MockComment = {
  id: 10,
  authorAvatar: `img/avatar-angelina.jpg`,
  authorName: `Sara`,
  rating: 4,
  date: new Date(`2019-12-23 12:00:11`),
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
