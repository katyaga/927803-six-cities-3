import React from "react";
import renderer from "react-test-renderer";
import Reviews from "./reviews.jsx";

const MockComments = [
  {
    id: 10,
    authorAvatar: `img/avatar-angelina.jpg`,
    authorName: `Sara`,
    rating: 1,
    date: new Date(`2019-12-23 12:00:11`),
    text: `text1`,
  },
  {
    id: 20,
    authorAvatar: `img/avatar-max.jpg`,
    authorName: `Bob`,
    rating: 3,
    date: new Date(`2020-02-23 12:00:11`),
    text: `text2`,
  },
  {
    id: 30,
    authorAvatar: `img/avatar-max.jpg`,
    authorName: `Bob`,
    rating: 4,
    date: new Date(`2020-01-23 12:00:11`),
    text: `text3`,
  },
];

it(`Should Reviews render correctly`, () => {
  const tree = renderer
    .create(<Reviews
      comments={MockComments}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
